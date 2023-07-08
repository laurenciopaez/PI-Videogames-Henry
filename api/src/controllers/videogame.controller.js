const { Pool } = require("pg"); //Pool : conjunto de conecciones
/* Un "pool de conexiones" es una técnica común utilizada en entornos de bases de datos para optimizar el rendimiento y minimizar la sobrecarga de establecer y cerrar conexiones con frecuencia. En lugar de abrir y cerrar una nueva conexión cada vez que un cliente necesita acceder a la base de datos, se crean y mantienen varias conexiones en un "pool" para que puedan ser reutilizadas por múltiples clientes. */
require("dotenv").config();
const axios = require("axios");

const pool = new Pool({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "videogames",
});

const urlVideogames = "https://api.rawg.io/api/games";

//getVideogames tiene que obtener un arreglo de objetos con su informacion
const getVideogames = async (req, res) => {
  let arregloVideogames = [];
  let page = 1;
  const pageSize = 20;

  try {
    let response;
    do {
      response = await axios.get(
        `${urlVideogames}?key=${process.env.API_KEY}&page=${page}`
      );
      console.log(response.data.results);
      // Verificar si hay juegos en la respuesta
      if (response.data.results.length > 0 && arregloVideogames.length < 100) {
        for (let i = 0; i < Math.min(20, response.data.results.length); i++) {
          if (arregloVideogames.length < 100) {
            arregloVideogames.push(response.data.results[i].name);
          } else {
            break;
          }
        }
      }

      page++; // Avanzar a la siguiente página
    } while (
      response.data.results.length === 20 &&
      arregloVideogames.length < 100
    ); // Continuar el bucle mientras haya juegos en la respuesta

    console.log("arreglo:");
    console.log(arregloVideogames);

    res.send(arregloVideogames);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener los videojuegos");
  }
};

//obtiene el detalle de un juego especifico, tiene que funcionar para los videojuegos de la api como de la base de datos
const getVideogameById = async (req, res) => {
  //req.params.id EL PARAMETRO DEL ID QUE ENVIO POR SOLICITUD
  try {
    const response = await axios.get(
      `${urlVideogames}/${req.params.id}?key=${process.env.API_KEY}`
    );
    //falta conectar con el front
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener el videojuego por id");
  }
};

//debe obtener los primeros 15 videojuegos que se encuentren con la palabra recibida por query, no tiene que importar mayusculas ni minusculas, debe buscar api y base de datos
const getVideogameByName = async (req, res) => {
  const name = req.query.name; //Pide el parametro pasado desde la peticion http://localhost:3001/videogames/name?name=mario
  const games = [];
  try {
    const apiResponse = await axios.get(
      `${urlVideogames}?search=${name}&key=${process.env.API_KEY}`   //pide a la api la info
    );
    const results = apiResponse.data.results;

    results.forEach((game) => {    //aca guarda la informacion que necesitamos para la bd y mostrar
      const gameObj = {
        id: game.id,
        name: game.name,
        description: game.description_raw,
        image: game.background_image,
        released: game.released,
        rating: game.rating,
        platforms: game.platforms.map((platform) => platform.platform.name),
        genres: game.genres.map((genre) => genre.name),
      };

      games.push(gameObj);   //se pushea sobre el array de objetos
    });
    res.json(games);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener los videojuegos por nombre");
  }
};

//Todavia no funciona
const createVideogames = async (req, res) => {
  const { name, description, platform, image, landingDate, rating } = req.body;

  const response = await pool.query(
    "INSERT INTO Videogame (name, description, platform , image, landingDate, rating) VALUES ($1, $2, $3, $4, $5, $6)",
    [name, description, platform, image, landingDate, rating]
  );

  console.log(response);
  res.send("videogame created");
};

//obtiene un arreglo con todos los generos existentes de la api
const getGenres = async (req, res) => {};

module.exports = {
  getVideogames,
  createVideogames,
  getVideogameById,
  getVideogameByName,
  getGenres, //mandar para otro controler
};

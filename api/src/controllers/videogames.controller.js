const { Videogame, Genre } = require("../db.js"); //proviene de la base de datos
require("dotenv").config();
const axios = require("axios");
const { Op } = require("sequelize");

const urlVideogames = "https://api.rawg.io/api/games";

//Codigo para hacer peticiones a chat gpt
const urlOpenAi = "https://api.openai.com/v1/chat/completions";

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${process.env.OPEN_AI_API_KEY}`,
};

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
            const tags = response.data.results[i].tags.map((tag) => tag.name);
            const platforms = response.data.results[i].platforms.map(
              (plataform) => plataform.platform.name
            );
            const videogame = {
              name: response.data.results[i].name,
              description: tags,
              platform: platforms,
              image: response.data.results[i].background_image,
              landingDate: response.data.results[i].released,
              rating: response.data.results[i].rating,
            };
            arregloVideogames.push(videogame);
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
    const tags = response.data.tags.map((tag) => tag.name);
    const platforms = response.data.platforms.map(
      (plataform) => plataform.platform.name
    );
    const videogame = {
      name: response.data.name,
      description: tags,
      platform: platforms,
      image: response.data.background_image,
      landingDate: response.data.released,
      rating: response.data.rating,
    };
    console.log("id");
    res.send(videogame);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener el videojuego por id");
  }
};

//debe obtener los primeros 15 videojuegos que se encuentren con la palabra recibida por query, no tiene que importar mayusculas ni minusculas, debe buscar api y base de datos
const getVideogameByName = async (req, res) => {
  const name = req.query.name; //Pide el parametro pasado desde la peticion http://localhost:3001/videogames/name?name=mario

  try {
    const apiResponse = await axios.get(
      `${urlVideogames}?search=${name}&key=${process.env.API_KEY}` //pide a la api la info
    );
    const results = apiResponse.data.results;

    const dbResponse = await Videogame.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
      },
      limit: 5,
    });

    let transformedDbResults = [];
    if (dbResponse.length > 0) {
      transformedDbResults = dbResponse.map((result) => ({
        name: result.name,
        option: "FromBaseData: true",
      }));
    }

    const games = results.map((game) => ({
      id: game.id,
      name: game.name,
      description: game.description_raw,
      image: game.background_image,
      released: game.released,
      rating: game.rating,
      platforms: game.platforms.map((platform) => platform.platform.name),
      genres: game.genres.map((genre) => genre.name),
    }));

    // Combina los resultados de la API y la base de datos en una sola respuesta
    const response = [...transformedDbResults, ...games];
    console.log("name");
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener los videojuegos por nombre");
  }
};

const createVideogames = async (req, res) => {
  const { name, description, platform, image, landingDate, rating, genreName } =
    req.body;

  try {
    const genre = await Genre.findOne({ where: { name: genreName } });

    if (!genre) {
      //Si no existe el genero proporcionado
      return res
        .status(400)
        .json({ error: "El genero proporcionado no existe" });
    }

    const newVideogame = await Videogame.create({
      name,
      description,
      platform,
      image,
      landingDate,
      rating,
    });

    await newVideogame.addGenre(genre);

    res.status(200).json(newVideogame);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Inteto de usar open ai para completar las descripciones
const descriptionMaker = async (req, res) => {
  const { data } = req.body;

  const body = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: `Make a description of two paragraphs of a videogame using this tags: ${data} , you cannot use any name, has to be generic `,
      },
    ],
  };

  try {
    const response = await axios.post(urlOpenAi, body, { headers });

    const messages = response.data.choices[0].message.content;
    console.log(messages);
    res.json({ description: messages });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al generar la descripción");
  }
};

module.exports = {
  getVideogames,
  createVideogames,
  getVideogameById,
  getVideogameByName,
  descriptionMaker,
};

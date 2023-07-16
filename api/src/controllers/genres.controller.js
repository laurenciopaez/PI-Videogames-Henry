const { Genre } = require("../db.js"); //proviene de la base de datos
require("dotenv").config();
const axios = require("axios");

const urlVideogames = "https://api.rawg.io/api/games";

//obtiene un arreglo con todos los generos existentes de la api
const getGenres = async (req, res) => {
  let arrayGenres = new Set(); //set es una estructura de datos que no permite duplicados
  let page = 1;
  const pageSize = 20;

  try {
    while (arrayGenres.size < 18) {
      const response = await axios.get(
        `${urlVideogames}?key=${process.env.API_KEY}&page=${page}`
      );

      for (let i = 0; i < Math.min(20, response.data.results.length); i++) {
        const genres = response.data.results[i].genres;
        genres.forEach((genre) => arrayGenres.add(genre.name));
      }
      page++;
    }
    arrayGenres = Array.from(arrayGenres); // Convertir Set a un arreglo
    console.log("arrayGenres:");
    console.log(arrayGenres);
    // hasta aca tengo un array con todos los generos de la api
    arrayGenres.forEach(async (name) => {
      try {
        await Genre.create({ name });
      } catch (error) {
        console.error(`Error al guardar el nombre "${name}":`, error);
      }
    });

    res.send(arrayGenres);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener los géneros de los videojuegos");
  }
};

module.exports = {
  getGenres,
};

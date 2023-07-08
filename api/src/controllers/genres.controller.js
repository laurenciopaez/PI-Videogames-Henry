const { Genre } = require("../db.js"); //proviene de la base de datos
require('dotenv').config()
const axios = require('axios')

const urlVideogames = "https://api.rawg.io/api/games";


//obtiene un arreglo con todos los generos existentes de la api
const getGenres = async (req, res) => {};

module.exports = {
    getGenres
}
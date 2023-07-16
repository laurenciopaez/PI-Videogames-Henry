const { Router } = require("express");

const {
  getVideogames,
  createVideogames,
  getVideogameById,
  getVideogameByName,
  descriptionMaker,
} = require("../controllers/videogames.controller");

const videogamesRouter = Router();

videogamesRouter.get("/openAi", descriptionMaker);

videogamesRouter.get("/name", getVideogameByName);

videogamesRouter.get("/:id", getVideogameById);

videogamesRouter.get("/", getVideogames);

videogamesRouter.post("/", createVideogames);

module.exports = videogamesRouter;

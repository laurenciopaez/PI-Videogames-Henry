import {
  ADD,
  DELETE,
  GET_VIDEOGAMES_REQUEST,
  GET_VIDEOGAMES_ID_REQUEST,
  GET_VIDEOGAMES_SUCCESS,
  GET_VIDEOGAMES_FAILURE,
  GET_VIDEOGAMES_NAME_REQUEST,
  ORDER_BY_ALPHABET,
  ORDER_BY_RATING,
  ORDER_BY_DALPHABET,
  DESCRIPTION_MAKER,
} from "../../types/index";

import axios from "axios";
//favoritos reducer

export const eliminar = (id) => ({ type: DELETE, payload: id });

export const agregar = (id) => ({ type: ADD, payload: id });

// info server reducer

export const pedirVideojuegos = () => {
  return (dispatch) => {
    dispatch({ type: GET_VIDEOGAMES_REQUEST });
    axios
      .get("http://localhost:3001/videogames")
      .then((response) => {
        console.log("getvideogames response: ");
        console.log(response.data);
        dispatch({ type: GET_VIDEOGAMES_SUCCESS, payload: response.data });
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: GET_VIDEOGAMES_FAILURE, payload: error.message });
      });
  };
};

export const getVideogamesSuccess = (data) => ({
  type: GET_VIDEOGAMES_SUCCESS,
  payload: data,
});

export const getVideogamesFailure = (error) => ({
  type: GET_VIDEOGAMES_FAILURE,
  payload: error,
});

export const pedirVideojuegosId = (id) => {
  return (dispatch) => {
    dispatch({ type: GET_VIDEOGAMES_ID_REQUEST });
    axios
      .get(`http://localhost:3001/videogames/${id}`)
      .then((response) => {
        console.log(`getvideogames ID: ${id} response: `);
        console.log(response.data);
        dispatch({ type: GET_VIDEOGAMES_SUCCESS, payload: response.data });
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: GET_VIDEOGAMES_FAILURE, payload: error.message });
      });
  };
};

export const pedirVideojuegosName = (name) => {
  return (dispatch) => {
    dispatch({ type: GET_VIDEOGAMES_NAME_REQUEST });
    axios
      .get(`http://localhost:3001/videogames/name?name=${name}`)
      .then((response) => {
        console.log(`getvideogames NAME: ${name} response: `);
        console.log(response.data);
        dispatch({ type: GET_VIDEOGAMES_SUCCESS, payload: response.data });
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: GET_VIDEOGAMES_FAILURE, payload: error.message });
      });
  };
};

// ordenamiento

export const orderByRating = () => ({ type: ORDER_BY_RATING });

export const orderByAlphabet = () => ({ type: ORDER_BY_ALPHABET });

export const orderByAlphabetD = () => ({ type: ORDER_BY_DALPHABET });

//description maker

export const descriptionMaker = (data) => {
  return (dispatch) => {
    axios
      .get("http://localhost:3001/videogames/OpenAi", {
        params: data, // Pasar el objeto "data" como parámetros de consulta
      })
      .then((response) => {
        dispatch({
          type: DESCRIPTION_MAKER,
          payload: response.data.description,
        });
        console.log(response.data);
      })
      .catch((error) => {
        // Manejar errores de la solicitud
        console.error(error);
      });
  };
};

import {
  ADD,
  DELETE,
  GET_VIDEOGAMES_REQUEST,
  GET_VIDEOGAMES_SUCCESS,
  GET_VIDEOGAMES_FAILURE,
} from "../../types/index";

import axios from 'axios'
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

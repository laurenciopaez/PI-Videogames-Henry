import {
  GET_VIDEOGAMES_REQUEST,
  GET_VIDEOGAMES_ID_REQUEST,
  GET_VIDEOGAMES_SUCCESS,
  GET_VIDEOGAMES_FAILURE,
  GET_VIDEOGAMES_NAME_REQUEST,
  ORDER_BY_ALPHABET,
  ORDER_BY_RATING,
  ORDER_BY_DALPHABET,
  DESCRIPTION_MAKER,
  IMAGE_VERIFIER,
} from "../../types/index";

import axios from "axios";

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

export const crearVideojuego = (data) => {
  
    console.log('Peticion de creacion aceptada en middleware')
    axios
    .post('http://localhost:3001/videogames', data)
    .then( (response) => {
      console.log('Creacion exitosa')
    })
    .catch( (error) => {
      console.log(error)
    })
  }


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

//verifier

export const imageVerifier = (data) => {
  return (dispatch) => {
    console.log('despachado solicitud a servidor: '+data)
    axios //encodeURIComponent: codifica la url por las dudas
      .get(`http://localhost:3001/videogames/verifier?url=${encodeURIComponent(data)}`)
      .then((response) => {
        console.log(response)
        dispatch({
          type: IMAGE_VERIFIER,
          payload: response.data.isValid,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
};
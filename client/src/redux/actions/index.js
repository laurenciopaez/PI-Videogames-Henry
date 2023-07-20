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
  FILTER_BY_GENRE,
  DATABASE_FILTER
} from "../../types/index";

import axios from "axios";

// info server reducer

export const pedirVideojuegos = () => {
  return (dispatch) => {
    //marca el loading = true
    dispatch({ type: GET_VIDEOGAMES_REQUEST });
    //pide el juego a la ruta del servidor
    axios
      .get("http://localhost:3001/videogames")
      //si todo sale bien, marca loading false y carga la info en el estado para us consumo
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
//evento de exito en el pedido de informacion
export const getVideogamesSuccess = (data) => ({
  type: GET_VIDEOGAMES_SUCCESS,
  payload: data,
});

//evento de error, si bien hace lo mismo que los otros get, me gusta diferenciarlos en el codigo
//para darme cuenta que estoy haciendo 
export const getVideogamesFailure = (error) => ({
  type: GET_VIDEOGAMES_FAILURE,
  payload: error,
});

export const pedirVideojuegosId = (id) => {
  return (dispatch) => {
    //marca loading true
    dispatch({ type: GET_VIDEOGAMES_ID_REQUEST });
//pide al servidor a traves de la ruta indicada
    axios
      .get(`http://localhost:3001/videogames/${id}`)
      .then((response) => {
        //debugeo
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

//action que se encarga de pedir la info al servidor de los juegos que coincidan con el string indicado
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

//envia la informacion proveniente del form
export const crearVideojuego = (data) => {
    console.log('Peticion de creacion aceptada en middleware')
    axios
    .post('http://localhost:3001/videogames', data)
    .then( (response) => {
      alert('Creacion Exitosa')
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

// Filter

export const filterByGenre = (data) => ({type: FILTER_BY_GENRE, payload: data})

export const setDBType = () => ({type: DATABASE_FILTER})

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
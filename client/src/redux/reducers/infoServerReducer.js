import {
  GET_VIDEOGAMES_REQUEST,
  GET_VIDEOGAMES_FAILURE,
  GET_VIDEOGAMES_SUCCESS,
  GET_VIDEOGAMES_ID_REQUEST,
  GET_VIDEOGAMES_NAME_REQUEST,
  ORDER_BY_ALPHABET,
  ORDER_BY_RATING,
  ORDER_BY_DALPHABET,
  DESCRIPTION_MAKER,
} from "../../types";

const initialState = {
  videogames100: [],
  trueDescription: "",
  error: null,
  loading: false,
};

export default function infoServerReducer(state = initialState, action) {
  switch (action.type) {
    case GET_VIDEOGAMES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_VIDEOGAMES_ID_REQUEST:
      return {
        ...state,
        loading: true,
        error: action.payload,
      };
    case GET_VIDEOGAMES_NAME_REQUEST:
      return {
        ...state,
        loading: true,
        error: action.payload,
      };
    case ORDER_BY_ALPHABET: {
      state.videogames100.sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();

        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
      console.log("alphabet");
      return {
        ...state,
        videogames100: [...state.videogames100],
      };
    }
    case ORDER_BY_RATING: {
      state.videogames100.sort((a, b) => {
        const ratingA = a.rating;
        const ratingB = b.rating;

        if (ratingA < ratingB) {
          return -1;
        }
        if (ratingA > ratingB) {
          return 1;
        }
        return 0;
      });
      return {
        ...state,
        videogames100: [...state.videogames100],
      };
    }
    case ORDER_BY_DALPHABET: {
      state.videogames100.sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();

        if (nameA > nameB) {
          return -1;
        }
        if (nameA < nameB) {
          return 1;
        }
        return 0;
      });
      return {
        ...state,
        videogames100: [...state.videogames100],
      };
    }
    case GET_VIDEOGAMES_SUCCESS:
      return {
        ...state,
        videogames100: action.payload,
        loading: false,
        error: null,
      };
    case GET_VIDEOGAMES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DESCRIPTION_MAKER: {
      return {
        ...state,
        trueDescription: action.payload,
      };
    }
    default:
      return state;
  }
}

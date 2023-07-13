import {
  GET_VIDEOGAMES_REQUEST,
  GET_VIDEOGAMES_FAILURE,
  GET_VIDEOGAMES_SUCCESS,
} from "../../types";

const initialState = {
  videogames100: [],
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
    default:
      return state;
  }
}

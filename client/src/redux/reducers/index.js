import { combineReducers } from "redux";

import favoritosReducer from "./favoritosReducer";
import infoServerReducer from "./infoServerReducer";

const reducer = combineReducers({
  favorites: favoritosReducer, //reducer para los favoritos
  videogames: infoServerReducer, //reducer para los juegos
});

export default reducer;

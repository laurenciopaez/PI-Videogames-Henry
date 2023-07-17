import { combineReducers } from "redux";

import favoritosReducer from "./favoritosReducer";
import infoServerReducer from "./infoServerReducer";
import verifiersReducer from "./verifiersReducer";

const reducer = combineReducers({
  favorites: favoritosReducer, //reducer para los favoritos
  videogames: infoServerReducer, //reducer para los juegos
  verifier: verifiersReducer, //reducer para las verificaciones del form
});

export default reducer;

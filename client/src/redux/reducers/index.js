import { combineReducers } from "redux";

import infoServerReducer from "./infoServerReducer";
import verifiersReducer from "./verifiersReducer";

const reducer = combineReducers({
  videogames: infoServerReducer, //reducer para los juegos
  verifier: verifiersReducer, //reducer para las verificaciones del form
});

export default reducer;

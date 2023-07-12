import {combineReducers} from 'redux'

import favoritosReducer from './favoritosReducer';

const reducer = combineReducers({
    favorites: favoritosReducer, //reducer para los favoritos
})

export default reducer;
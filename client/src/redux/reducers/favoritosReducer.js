import {ADD, DELETE} from '../../types/index';

const initialState = {
    favorites: []
}

export default function favoritesReducer( state = initialState, action) {
    switch(action.type){
        case ADD:  break;
        case DELETE: break;
        default: 
            return state;
    }
}
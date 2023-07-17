import {
    IMAGE_VERIFIER,
} from '../../types';

const initialState = {
    imageError: false,
}

export default function verifiersReducer(state = initialState, action) {
    switch(action.type) {
        case IMAGE_VERIFIER: {
            return {
                ...state,
                imageError: action.payload,
            }
        };
        default: 
            return state;
    }
}
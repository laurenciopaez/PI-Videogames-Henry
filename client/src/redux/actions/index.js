import {
    ADD,
    DELETE,
} from '../../types/index';

export const eliminar = (id) => ({type: DELETE, payload: id})

export const agregar = (id) => ({type: ADD, payload: id})
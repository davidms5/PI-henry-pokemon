import axios from "axios";
import {
    FETCH_POKEMON, 
    FETCH_POKEMON_SUCCESS, 
    FETCH_POKEMON_FAILED,
    SET_NAME_FILTER,
    SET_SOURCE_FILTER,
    SET_TYPE_FILTER,
    SET_ALPHABETIC_ORDER,
    SET_ORDER_ATTACK, 
    FETCH_POKEMON_RESET,
    ADD_CREATED_POKEMON } from "./actionTypes"


export const fetchPokemon = () => async(dispatch) =>{
    try {
        dispatch({type: FETCH_POKEMON});
        const response = await axios.get("http://localhost:3001/pokemons");
        const pokemons = await response.data;
        
        dispatch({type: FETCH_POKEMON_SUCCESS, payload: pokemons})

    } catch (error) {
        dispatch({type: FETCH_POKEMON_FAILED, error})
       
    }
}

export const setNameFilter = (name) => ({
    type: SET_NAME_FILTER,
    payload: name,
  });

export const setSourceFilter = (filter) => ({
    type: SET_SOURCE_FILTER,
    payload: filter,
});

export const setTypeFilter = (type) =>({
    type: SET_TYPE_FILTER,
    payload: type,
})

export const setAlphabeticOrder = (order) =>({
    type: SET_ALPHABETIC_ORDER,
    payload: order
});

export const setOrderAttack = (attack) => ({
    type: SET_ORDER_ATTACK,
    payload: attack,
});

export const fetchReset = () => ({
    type: FETCH_POKEMON_RESET,
});

export const addCreatedPokemon = (pokemon) => ({
    type: ADD_CREATED_POKEMON,
    payload: pokemon,
});
import axios from "axios";
export const FETCH_POKEMON = "FETCH_POKEMON";
export const FETCH_POKEMON_SUCCESS = "FETCH_POKEMON_SUCCESS";
export const FETCH_POKEMON_FAILED = "FETCH_POKEMON_FAILED";
export const SET_NAME_FILTER = 'SET_NAME_FILTER';

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
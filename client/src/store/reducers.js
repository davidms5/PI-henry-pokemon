import { FETCH_POKEMON, FETCH_POKEMON_FAILED, FETCH_POKEMON_SUCCESS } from "./actions";


const initialState = {
    pokemonAPI: [],
    loadingPage: false,
   // pagination: 1,
    error: null

}

const pokemonReducer = (state = initialState, {type, payload, error}) =>{
    switch (type) {
        case FETCH_POKEMON:
            return {...state, loadingPage: true};

        case FETCH_POKEMON_SUCCESS:
            return {...state, loadingPage: false, pokemonAPI: payload};

        case FETCH_POKEMON_FAILED:
            return {...state, loadingPage: false, error: error.message};
    
        default:
            return state;
            
    }
}

export default pokemonReducer;
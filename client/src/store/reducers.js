import { FETCH_POKEMON, FETCH_POKEMON_FAILED, FETCH_POKEMON_SUCCESS, SET_NAME_FILTER } from "./actions";
import {persistReducer} from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";

const persistConfig = {
    key: 'root',
    storage: storageSession,
  };
  

const initialState = {
    pokemonAPI: [],
    loadingPage: false,
   // pagination: 1,
    error: null,
    nameFilter:"",

}

const pokemonReducer = (state = initialState, {type, payload, error}) =>{
    switch (type) {
        case FETCH_POKEMON:
            return {...state, loadingPage: true};

        case FETCH_POKEMON_SUCCESS:
            return {...state, loadingPage: false, pokemonAPI: payload};

        case FETCH_POKEMON_FAILED:
            return {...state, loadingPage: false, error: error.message};

        case SET_NAME_FILTER:
            return {...state, nameFilter: payload};

        default:
            return state;
            
    }
}

const persistedReducer = persistReducer(persistConfig, pokemonReducer);


export default persistedReducer;
const axios = require("axios");
const modeloPokemon = require("../../../objectModel/model");

const axiosInstance = axios.create({
    timeout: 3000,
  });
  
const handleRetryAfter = (error) => {
    if (error.response && error.response.headers['retry-after']) {
        const retryAfter = parseInt(error.response.headers['retry-after'], 10);
        return new Promise((resolve) => {
        setTimeout(() => resolve(true), retryAfter * 1000);
        });
    }
    return Promise.resolve(false);
};



const requestAPI = async(peticion) =>{

    try {
        const resultado = await axios.get(`https://pokeapi.co/api/v2/pokemon/${peticion}`);
        
           return resultado.data; 
        
        
    } catch (error) {
        
        console.log(`error fetching data for ${peticion}:`, error);
        return null;
    }
    
};

const requestAPIAll = async(retries = 3) => {

    if (retries <= 0) {
        console.log("Max retries reached");
        return [];
      }

      const pokemonPromise = [];
      

    try {
        
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon/?limit=386");

        const pokemons = await response.data.results;

        for(const pokemon of pokemons){
            pokemonPromise.push(axios.get(pokemon.url));
        };

        const respuestasPokemonUrl = await axios.all(pokemonPromise);

        const pokemonList = modeloPokemon(respuestasPokemonUrl);
//
        //    return pokemonList;
        // });
//
        //const pokemonDataArray = await Promise.all(pokemonPromises);

        return pokemonList;

    } catch (error) {
        console.log("error in requestAPIAll", error.message);
        const shouldRetry = await handleRetryAfter(error);
        if (shouldRetry) {
            return requestAPIAll(retries);
        } else {
            return requestAPIAll(retries - 1);
        }
    }
    

}

const requestAPITypes = async() => {

    const response = await axios.get("https://pokeapi.co/api/v2/type");
    const {results} = response.data;

    const listTypes = results
    .filter(type => type.name !== "fairy" && type.name !== "unknown" && type.name !== "shadow")
    .map(type => {
        return {NOMBRE:type.name}
    });

    return listTypes;
}

module.exports = {requestAPI, requestAPIAll, requestAPITypes};
const axios = require("axios");
const modeloPokemon = require("../../../objectModel/model");

const requestAPI = async(peticion) =>{

    try {
        const resultado = await axios.get(`https://pokeapi.co/api/v2/pokemon/${peticion}`);

        return resultado.data;
    } catch (error) {
        console.error(`error fetching data for ${peticion}:`, error);
        throw error;
    }
    
};

const requestAPIAll = async() => {

    const response = await axios.get("https://pokeapi.co/api/v2/pokemon/?limit=20000");

    const pokemons = response.data.results;

    const pokemonPromises = pokemons.map(async (pokemon) => {
        const pokemonResponse = await axios.get(pokemon.url);

        const {species, id, sprites, stats, weight, height, types} = pokemonResponse.data;
        const pokemonList = modeloPokemon(species, id, sprites, stats, weight, height, types);
        return pokemonList;
      });

      const pokemonDataArray = await Promise.all(pokemonPromises);
      return pokemonDataArray;

}

const requestAPITypes = async() => {

    const response = await axios.get("https://pokeapi.co/api/v2/type");
    const {results} = response.data;

    const listTypes = results.map(type => {
        return {NOMBRE:type.name}
    });

    return listTypes;
}

module.exports = {requestAPI, requestAPIAll, requestAPITypes};
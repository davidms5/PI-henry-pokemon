const modeloPokemon = (pokemons) =>{

    const pokemonFinal = []
    
    if(Array.isArray(pokemons)){
       for(const pokemonDetail of pokemons){
        const {species, id, sprites, stats, weight, height, types} = pokemonDetail.data;
        let tipos = []
        if(types.length > 1){
        tipos.push(types[0].type.name);
        tipos.push(types[1].type.name);
        } else {
        tipos.push(types[0].type.name); 
        }
        let pokemon = {
        id: id,
        nombre: species?.name,
        imagen: sprites?.other?.dream_world?.front_default,
        vida: stats[0]?.base_stat,
        ataque: stats[1]?.base_stat,
        defensa: stats[2]?.base_stat,
        velocidad: stats[5]?.base_stat,
        altura: height,
        peso: weight,
        Types: tipos
        }; 

        pokemonFinal.push(pokemon);
        }; 
    } else {
        const {species, id, sprites, stats, weight, height, types} = pokemons;
        let tipos = []
        if(types.length > 1){
        tipos.push(types[0].type.name);
        tipos.push(types[1].type.name);
        } else {
        tipos.push(types[0].type.name); 
        }
        let pokemon = {
        id: id,
        nombre: species?.name,
        imagen: sprites?.other?.dream_world?.front_default,
        vida: stats[0]?.base_stat,
        ataque: stats[1]?.base_stat,
        defensa: stats[2]?.base_stat,
        velocidad: stats[5]?.base_stat,
        altura: height,
        peso: weight,
        Types: tipos
        };

        return pokemon;
    }
    
    

    return pokemonFinal;
}

module.exports = modeloPokemon;
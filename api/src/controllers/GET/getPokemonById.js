const {Pokemon} = require("../../db");
const axios = require("axios");

const getPokemonById = async(req, res) =>{

    const {idPokemon} = req.params;
    const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

    const prueba = regexExp.test(idPokemon)
    try {
        if(!idPokemon) res.status(404).send("pokemon no encontrado")
        
        if(prueba){
            let response = await Pokemon.findOne({where:{id:idPokemon}});

            if(!response) res.status(404).send("el pokemon no existe");//hacer test de esta linea

            res.status(200).json(response);

        } else {

            let apiResponse = await axios(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`)

            let {species, id, sprites, stats, weight, height} = apiResponse.data;

            let pokemon = {
                id: id,
                nombre: species?.name,
                imagen: sprites?.front_default,
                vida: stats[0]?.base_stat,
                ataque: stats[1]?.base_stat,
                defensa: stats[2]?.base_stat,
                velocidad: stats[5]?.base_stat,
                altura: height,
                peso: weight,
            };

            res.status(200).json(pokemon);
        }
        


       
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
};

module.exports = getPokemonById;
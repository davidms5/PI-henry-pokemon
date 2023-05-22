const {Pokemon} = require("../../db");
const  {requestAPI}  = require("./apiResponse/apiResponse");
const modeloPokemon = require("../../objectModel/model");

const getPokemonById = async(req, res) =>{

    const {idPokemon} = req.params;
    const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

    const prueba = regexExp.test(idPokemon)
    try {
        if(!idPokemon) res.status(404).send("pokemon no encontrado")
        
        if(prueba){
            let response = await Pokemon.findOne({
                where:{id:idPokemon},
                include: {
                    model:Types,
                    attributes:[["NOMBRE", "tipo"]]
                }
            });

            if(!response) res.status(404).send("el pokemon no existe");//hacer test de esta linea

            res.status(200).json(response);

        } else {

            if (typeof idPokemon !== "number") res.status(404).json({error:"id not valid"})
            
            let apiResponse = await requestAPI(idPokemon); 

            let {species, id, sprites, stats, weight, height, types} = apiResponse;

            let pokemon = modeloPokemon(species, id, sprites, stats, weight, height, types)
            
            res.status(200).json(pokemon);
        }
        


       
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
};

module.exports = getPokemonById;
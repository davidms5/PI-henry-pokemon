const {Pokemon, Types} = require("../../db");
const  {requestAPI}  = require("./apiResponse/apiResponse");
const modeloPokemon = require("../../objectModel/model");

const getPokemonById = async(req, res) =>{

    const {idPokemon} = req.params;
    const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

    const prueba = regexExp.test(idPokemon)
    try {
        if(!idPokemon) return res.status(404).json({errorUser:"pokemon no encontrado"})
        
        if(prueba){
            let response = await Pokemon.findOne({
                where:{id:idPokemon},
                include: {
                    model:Types,
                    attributes:[["NOMBRE", "tipo"]],
                    through: { attributes: [] }
                }
            });

            if(!response) return res.status(404).json({errorUser:"pokemon no encontrado"});//hacer test de esta linea

            return res.status(200).json(response);

        } else {

            if (isNaN(parseFloat(idPokemon)) || isNaN(idPokemon - 0)) return res.status(404).json({error:"id no valido"})
            
            let apiResponse = await requestAPI(idPokemon); 

            let pokemon = modeloPokemon(apiResponse)
            
            return res.status(200).json(pokemon);
        }
        


       
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message: error.message, messageUser: "hubo un error en el server, intente de nuevo mas tarde"});
    }
};

module.exports = getPokemonById;
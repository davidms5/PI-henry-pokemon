const { Pokemon } = require('../../db.js');
const modeloPokemon = require('../../objectModel/model.js');
const {requestAPI, requestAPIAll} = require("./apiResponse/apiResponse.js");

const getAllPokemons = async(req, res) =>{

    const {name} = req.query;
    
    if(name){
        try {
           const namePokemon = await requestAPI(name);

           if(!namePokemon) {
                const responseDataBase = await Pokemon.findOne({
                where:{name:name},
                 include: {
                 model: Types,
                 attributes:[["NOMBRE", "tipo"]]
                     }
                 }); 
                
                if(!responseDataBase) {
                    return res.status(404).send("el pokemon no existe")
                } else {
                    return res.status(200).json(responseDataBase);
                };

                
            };

            const {species, id, sprites, stats, weight, height, types} = namePokemon;

            const datapokemon = modeloPokemon(species, id, sprites, stats, weight, height, types);

            return res.status(200).json(datapokemon)


        } catch (error) {
            console.log(error.message)
            return res.status(500).json({message: error.message})
        }
    } else {

        try{

        const responseDataBase = await Pokemon.findAll();
        const responseAPI = await requestAPIAll();
        return res.status(200).json([...responseAPI, ...responseDataBase]);

        } catch (error){
        return res.status(500).json({message: error.message})
        }

    }

    
}

module.exports = getAllPokemons;

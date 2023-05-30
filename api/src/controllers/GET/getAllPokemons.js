const { Pokemon, Types } = require('../../db.js');
const modeloPokemon = require('../../objectModel/model.js');
const {requestAPI, requestAPIAll} = require("./apiResponse/apiResponse.js");

const getAllPokemons = async(req, res) =>{

    const {name} = req.query;
    
    if(name){
        try {

            const responseDataBase = await Pokemon.findOne({
                where:{nombre:name},
                 include: {
                 model: Types,
                 through: { attributes: [] }
                    }
                 }); 


            if(!responseDataBase){
               const namePokemon = await requestAPI(name); 

               if(!namePokemon){
                return res.status(404).send("el pokemon no existe")
               }
               
               const datapokemon = modeloPokemon(namePokemon);
               return res.status(200).json(datapokemon)
            }

            const types = responseDataBase.Types.map((type) => type.NOMBRE);

            

            const correctTypesResponseDatabase = {...responseDataBase.toJSON(), Types: types};

            return res.status(200).json(correctTypesResponseDatabase);

            
          
        } catch (error) {
            console.log(error.message)
            return res.status(500).json({message: error.message})
        }
    } else {

        try{

        const responseDataBase = await Pokemon.findAll({include: {
            model: Types, 
            through: { attributes: [] }, 
          },});

          const mergedData = responseDataBase.map((pokemon) => {
            const types = pokemon.Types.map((type) => type.NOMBRE);
            return { ...pokemon.toJSON(), Types: types };
          });
        
        const responseAPI = await requestAPIAll();
        
        return res.status(200).json([...responseAPI, ...mergedData]);

        } catch (error){
        return res.status(500).json({message: error.message})
        }

    }

    
}

module.exports = getAllPokemons;

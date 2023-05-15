const { Pokemon } = require('../../db.js');

const getAllPokemons = async(req, res) =>{

    try{

        const response = await Pokemon.findAll();
        res.status(200).json(response)
    } catch (error){
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
}

module.exports = getAllPokemons;

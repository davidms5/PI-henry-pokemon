const {Types} = require("../../db");
const {requestAPITypes} = require("./apiResponse/apiresponse.js")
const getTypes = async(req, res) =>{

    try {
        
        const responseTypes = (await Types.findOne()) === null;
        if(responseTypes){
            const listTypes = await requestAPITypes();
            await Types.bulkCreate(listTypes);
            return res.status(201).json(listTypes);
        }

        const respuesta = await Types.findAll({attributes:["ID", "NOMBRE"]});
        return res.status(200).json(respuesta);
        
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

module.exports = getTypes;
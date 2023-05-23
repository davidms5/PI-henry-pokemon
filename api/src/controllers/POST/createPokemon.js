const {Pokemon, Types} = require("../../db.js");
require('dotenv').config();
const cloudinary = require('cloudinary').v2;

//configuracion de conexion con cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const CreatePokemon = async(req, res) =>{

  const {nombre, imagen, vida, ataque, defensa, velocidad, altura, peso, tipos} = req.body;
  //luego implementar subir fotos a cloudinary
  //tener una foto por defecto para la imagen del pokemon si no se pasa ninguna
  try {

    if(!nombre ||!vida||!ataque||!defensa||!velocidad||!altura||!peso ||!tipos){
      return res.status(400).json({message:"falta informacion para crear el pokemon ó el nombre de las variables recibidas es erroneo"});
     }

    let url = null;

    if(imagen){

      const uploadedImage = await cloudinary.uploader.upload(imagen);
      url = uploadedImage.url;

    }

     const newPokemon = await Pokemon.create({
      name: nombre,
      imagen: url,
      vida: vida,
      ataque: ataque,
      defensa: defensa,
      velocidad: velocidad,
      altura: altura,
      peso: peso,
     })

     const typeInstances = await Types.findAll({ where: { NOMBRE: tipos } });

     await newPokemon.setTypes(typeInstances);

     return res.status(201).json(newPokemon);

  } catch (error) {
    return res.status(500).json({message: error})
  }
  

}

module.exports = CreatePokemon;

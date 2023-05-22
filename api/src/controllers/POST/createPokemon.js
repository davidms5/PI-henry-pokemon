const {Pokemon} = require("../../db.js");

const CreatePokemon = async(req, res) =>{

  const {nombre, imagen, vida, ataque, defensa, velocidad, altura, pesotipos} = req.body;
  //puedo omitir la imagen? revisar los modelos de la base de datos
  //revisar si el.status de abajo es el correcto
  if(!nombre ||!vida||!ataque||!defensa||!velocidad||!altura||!peso){
      return res.status(404).send("falta informacion para crear el pokemon");
  }

}

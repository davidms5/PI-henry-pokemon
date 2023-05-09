const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id:{
      tyoe: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },

    name: {
      //incluir campo uuid para el id unico
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};

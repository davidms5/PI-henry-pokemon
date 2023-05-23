const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },



    name: {
      
      type: DataTypes.STRING,
      allowNull: false,
    },

    imagen: {
      type: DataTypes.STRING,
      //hacer un default value para poner una imagen por defecto ó poner una imagen en el front y llamarla si no hay link de foto
    },
    vida: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    ataque: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    defensa: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    velocidad: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    altura: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    peso: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    timestamps: false
  });
};

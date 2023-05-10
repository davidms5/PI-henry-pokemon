const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {

    sequelize.define("Types", {
        ID: {
            type: DataTypes.INTEGER,
            allowNull: false, 
            autoIncrement: true,
            primaryKey: true,
            //agregar la parte de primary key
        },

        NOMBRE: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })
}
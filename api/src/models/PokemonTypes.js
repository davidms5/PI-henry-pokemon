const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {

    sequelize.define("Types", {
        ID: {
            type: DataTypes.INTEGER,
            allowNull: false, 
            //agregar la parte de primary key
        }
    })
}
const {ROLES_TABLE} = require('../../config');
const {modelNames} = require('../../constants');

const {ROLE} = modelNames;

module.exports = (sequelize, DataTypes) => {
    const Roles = sequelize.define(ROLE, {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
        {
            tableName: ROLES_TABLE,
            timestamps: false
        });

    return Roles;
}
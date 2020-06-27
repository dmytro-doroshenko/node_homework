const {modelNames} = require('../constants');
const db = require('../database').getInstance();

const {ROLE} = modelNames;

module.exports = {
    getRoles: () => {
        const RoleModel = db.getModel(ROLE);

        return RoleModel.findAll({
            raw: true,
        });
    },

    insertRoles: (roles) => {
        const RoleModel = db.getModel(ROLE);

        return RoleModel.bulkCreate(roles)
    },
}
const db = require('../database').getInstance();
const {modelNames} = require('../constants');

const {USER} = modelNames;

module.exports = {
    getUsers: () => {
        const UserModel = db.getModel(USER);

        return UserModel.findAll({});
    },
    getUserByParams: (params) => {
        const UserModel = db.getModel(USER);

        return UserModel.findOne({
            where: params
        });
    },
    createUser: async (user) => {
        const UserModel = db.getModel(USER);

        return UserModel.create(user);
    },
    deleteUser: async (id) => {
        const UserModel = db.getModel(USER);

        return UserModel.destroy( {
            where: {id}
        });
    },
    updateUserById: async (id, newUserFields) => {
        const UserModel = db.getModel(USER);

        return UserModel.update(
            newUserFields,
            {where: {id}}
        )
    }

};
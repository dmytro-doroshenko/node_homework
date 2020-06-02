const db = require('../database').getInstance();
const {modelNames: {USER}} = require('../constants');

module.exports = {
    getUsers: async () => {
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
};
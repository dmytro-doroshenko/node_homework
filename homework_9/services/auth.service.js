const db = require('../database').getInstance();
const {modelNames} = require('../constants');

const {TOKEN, USER} = modelNames;

module.exports = {
    getAllTokens: () => {
        const TokenModel = db.getModel(TOKEN);

        return TokenModel.findAll({});
    },
    createTokensPair: (tokens) => {
        const TokenModel = db.getModel(TOKEN);

        return TokenModel.create(tokens);
    },
    getTokensByParams: (params) => {
        const TokenModel = db.getModel(TOKEN);
        const UserModel = db.getModel(USER);

        return TokenModel.findOne({
            where: params,
            attributes: [],
            include: [{
                model: UserModel,
                as: 'user',
                required: true,
                attributes: ['id', 'name', 'email']
            }],
            nest: true,
            raw: true
        });
    },
    deleteTokensByParams: (params) => {
        const TokenModel = db.getModel(TOKEN);

        return TokenModel.destroy({
            where: params,
        })
    },
};
const db = require('../database').getInstance();
const {modelNames} = require('../constants');

const {TOKEN} = modelNames;

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

        return TokenModel.findOne({
            where: params,
        })
    },
    deleteTokensByParams: (params) => {
        const TokenModel = db.getModel(TOKEN);

        return TokenModel.destroy({
            where: params,
        })
    },
};
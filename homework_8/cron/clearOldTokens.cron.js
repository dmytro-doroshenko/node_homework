const {JWT_REFRESH_SECRET} = require('../config');
const {tokensVerificator} = require('../helper');
const {authService} = require('../services');

const {getAllTokens, deleteTokensByParams} = authService;

module.exports = async () => {

    const tokens = await getAllTokens();

    for (const token of tokens) {
        const {refreshToken} = token.dataValues;

        const isTokenOld = await tokensVerificator(refreshToken, JWT_REFRESH_SECRET);

        if (isTokenOld) {
            await deleteTokensByParams({refreshToken});
        }
    }
};
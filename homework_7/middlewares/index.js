const checkAccessToken = require('./auth/checkAccessToken.middleware');
const checkIsLoginDataValidity = require('./auth/checkIsLoginDataValid.middleware')
const checkNewProductValidity = require('./product/checkIsNewProductValid.middleware');
const checkProductToUpdateValidity = require('./product/checkIsProductToUpdateValid.middleware');
const checkRefreshToken = require('./auth/checkRefreshToken.middleware');
const checkUserValidity = require('./user/checkIsUserValid.middleware');

module.exports = {
    checkAccessToken,
    checkIsLoginDataValidity,
    checkNewProductValidity,
    checkProductToUpdateValidity,
    checkRefreshToken,
    checkUserValidity,
};
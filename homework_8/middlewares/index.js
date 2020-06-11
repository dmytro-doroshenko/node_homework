const checkAccessToken = require('./auth/checkAccessToken.middleware');
const checkFileTypes = require('./files/checkFileTypes.middleware');
const checkIsLoginDataValidity = require('./auth/checkIsLoginDataValid.middleware')
const checkNewProductValidity = require('./product/checkIsNewProductValid.middleware');
const checkProductToUpdateValidity = require('./product/checkIsProductToUpdateValid.middleware');
const checkRefreshToken = require('./auth/checkRefreshToken.middleware');
const checkUserValidity = require('./user/checkIsUserValid.middleware');
const checkUserPhotoCount = require('./files/checkUserPhotoCount.middleware');

module.exports = {
    checkAccessToken,
    checkFileTypes,
    checkIsLoginDataValidity,
    checkNewProductValidity,
    checkProductToUpdateValidity,
    checkRefreshToken,
    checkUserValidity,
    checkUserPhotoCount,
};
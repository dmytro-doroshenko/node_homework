const checkAccessToken = require('./auth/checkAccessToken.middleware');
const checkAccessToPhoto = require('./photo/checkAccessToPhoto.middleware');
const checkAvatarPhotoCount = require('./files/checkAvatarPhotoCount.middleware');
const checkFileTypes = require('./files/checkFileTypes.middleware');
const checkIsLoginDataValidity = require('./auth/checkIsLoginDataValid.middleware')
const checkNewProductValidity = require('./product/checkIsNewProductValid.middleware');
const checkProductToUpdateValidity = require('./product/checkIsProductToUpdateValid.middleware');
const checkRefreshToken = require('./auth/checkRefreshToken.middleware');
const checkUserValidity = require('./user/checkIsUserValid.middleware');

module.exports = {
    checkAccessToken,
    checkAccessToPhoto,
    checkAvatarPhotoCount,
    checkFileTypes,
    checkIsLoginDataValidity,
    checkNewProductValidity,
    checkProductToUpdateValidity,
    checkRefreshToken,
    checkUserValidity,
};
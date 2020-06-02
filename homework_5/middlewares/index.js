const checkUserValidity = require('./user/checkIsUserValid.middleware');
const checkNewProductValidity = require('./product/checkIsNewProductValid');
const checkProductToUpdateValidity = require('./product/checkIsProductToUpdateValid');

module.exports = {
    checkUserValidity,
    checkNewProductValidity,
    checkProductToUpdateValidity
};
const checkEmptyFields = require('./checkEmptyFields.middleware');
const checkProductID = require('./checkProductID.middleware');
const checkPrice = require('./checkPrice.middleware');

module.exports = {
    checkEmptyFields,
    checkProductID,
    checkPrice,
};
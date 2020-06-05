const authValidationSchema = require('./auth/auth.validator');
const newUserValidationSchema = require('./user/newUser.validator');
const newProductValidationSchema = require('./product/newProduct.validator');
const productToUpdateValidationSchema = require('./product/productToUpdate.validator');

module.exports = {
    authValidationSchema,
    newUserValidationSchema,
    newProductValidationSchema,
    productToUpdateValidationSchema,
};
const newUserValidationSchema = require('./user/newUser.validator');
const newProductValidationSchema = require('./product/newProduct.validator');
const productToUpdateValidationSchema = require('./product/productToUpdate.validator');


module.exports = {
    newUserValidationSchema,
    newProductValidationSchema,
    productToUpdateValidationSchema,
};
const Joi = require('joi');

const {productToUpdateValidationSchema} = require('../../validators');
const ErrorsHandler = require('../../errors/ErrorsHandler');
const {httpStatusCodes} = require('../../constants');

const {BAD_REQUEST} = httpStatusCodes;

module.exports = (req, res, next) => {
    const product = req.body;

    const {error} = Joi.validate(product, productToUpdateValidationSchema);

    if (error) {
        return next(new ErrorsHandler(error.details[0].message, BAD_REQUEST));
    }

    next();
};
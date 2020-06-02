const Joi = require('joi');

const {newProductValidationSchema} = require('../../validators');
const ErrorsHandler = require('../../errors/ErrorsHandler');

module.exports = (req, res, next) => {
    const product = req.body;

    const {error} = Joi.validate(product, newProductValidationSchema);

    if (error) {
        return next(new ErrorsHandler(error.details[0].message, 400));
    }

    next();
};
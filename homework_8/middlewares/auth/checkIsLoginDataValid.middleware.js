const Joi = require('joi');

const {authValidationSchema} = require('../../validators');
const ErrorsHandler = require('../../errors/ErrorsHandler');
const {httpStatusCodes} = require('../../constants');

const {BAD_REQUEST} = httpStatusCodes;

module.exports = (req, res, next) => {
    const data = req.body;

    const {error} = Joi.validate(data, authValidationSchema);

    if (error) {
        return next(new ErrorsHandler(error.details[0].message, BAD_REQUEST));
    }

    next();
};
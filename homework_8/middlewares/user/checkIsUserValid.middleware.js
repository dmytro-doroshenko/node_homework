const Joi = require('joi');

const {httpStatusCodes} = require('../../constants');
const ErrorsHandler = require('../../errors/ErrorsHandler');
const {newUserValidationSchema} = require('../../validators');

const {BAD_REQUEST} = httpStatusCodes;

module.exports = (req, res, next) => {
    const user = req.body;

    const {error} = Joi.validate(user, newUserValidationSchema);

    if (error) {
        return next(new ErrorsHandler(error.details[0].message, BAD_REQUEST));
    }

    return next();
};
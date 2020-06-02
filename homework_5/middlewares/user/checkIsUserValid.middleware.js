const Joi = require('joi');

const {newUserValidationSchema} = require('../../validators');
const ErrorsHandler = require('../../errors/ErrorsHandler');

module.exports = (req, res, next) => {
    const user = req.body;

    const {error} = Joi.validate(user, newUserValidationSchema);

    if (error) {
        return next(new ErrorsHandler(error.details[0].message, 400));
    }

    next();
};
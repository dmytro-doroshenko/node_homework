const Joi = require('joi');
const {regExp} = require('../../constants');

module.exports = Joi.object().keys( {
    email: Joi.string().regex(regExp.EMAIL).required(),
    password: Joi.string().trim().min(6).required(),
})
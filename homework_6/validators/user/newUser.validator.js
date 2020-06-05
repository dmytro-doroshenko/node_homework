const Joi = require('joi');
const {regExp} = require('../../constants');

module.exports = Joi.object().keys({
    name: Joi.string().trim().min(2).max(45).required(),
    email: Joi.string().regex(regExp.EMAIL).required(),
    password: Joi.string().trim().min(6).required(),
});
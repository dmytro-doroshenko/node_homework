const Joi = require('joi');

module.exports = Joi.object().keys({
    name: Joi.string().trim().min(1).max(255).required(),
    category: Joi.string().trim().min(1).max(45).required(),
    price: Joi.number().min(0).max(10 ** 17).required(),
});
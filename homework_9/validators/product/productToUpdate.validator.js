const Joi = require('joi');

module.exports = Joi.object().keys({
    name: Joi.string().trim().min(1).max(255).optional(),
    category: Joi.string().trim().min(1).max(45).optional(),
    price: Joi.number().min(0).max(10 ** 17).optional(),
    discount: Joi.boolean().optional(),
    oldPrice: Joi.number().min(0.1).max(9999).when('discount', {is: true, then: Joi.required(), otherwise: Joi.forbidden()})
});
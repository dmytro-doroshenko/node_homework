const jwt = require('jsonwebtoken');

const ErrorsHandler = require('../errors/ErrorsHandler');
const {errors, httpStatusCodes} = require('../constants');

const {TOKEN_NOT_VALID} = errors;
const {UNAUTHORIZED} = httpStatusCodes;

module.exports = (token, secret_word) => {
    jwt.verify(token, secret_word, err => {
        if (err) {
            return new ErrorsHandler(TOKEN_NOT_VALID.message, UNAUTHORIZED, TOKEN_NOT_VALID.code);
        }
    });
};
const jwt = require('jsonwebtoken');

const {words} = require('../../constants');
const ErrorsHandler = require('../../errors/ErrorsHandler');
const  {authService} = require('../../services');
const {tokensVerificator} = require('../../helper');
const {errors, httpStatusCodes, requestHeaders} = require('../../constants');

const {TOKEN_NOT_VALID} = errors;
const {UNAUTHORIZED} = httpStatusCodes;
const {AUTHORIZATION} = requestHeaders;
const {JWT_REFRESH_SECRET} = words;

module.exports = async (req, res, next) => {
        const token = req.get(AUTHORIZATION);

        if (!token) {
            return next(new ErrorsHandler(TOKEN_NOT_VALID.message, UNAUTHORIZED, TOKEN_NOT_VALID.code));
        }

        await tokensVerificator(token, JWT_REFRESH_SECRET);

        const tokensFromDB = await authService.getTokensByParams({refreshToken: token});

        if (!tokensFromDB) {
            return next(new ErrorsHandler(TOKEN_NOT_VALID.message, UNAUTHORIZED, TOKEN_NOT_VALID.code));
        }

        req.userId = tokensFromDB.userId;

        next();
};
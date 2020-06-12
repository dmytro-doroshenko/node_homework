const {JWT_ACCESS_SECRET} = require('../../config');
const {errors, httpStatusCodes, requestHeaders} = require('../../constants');
const {tokensVerificator} = require('../../helper');
const ErrorsHandler = require('../../errors/ErrorsHandler');
const  {authService} = require('../../services');

const {TOKEN_NOT_VALID} = errors;
const {UNAUTHORIZED} = httpStatusCodes;
const {AUTHORIZATION} = requestHeaders;

module.exports = async (req, res, next) => {
        const token = req.get(AUTHORIZATION);

        if (!token) {
            return next(new ErrorsHandler(TOKEN_NOT_VALID.message, UNAUTHORIZED, TOKEN_NOT_VALID.code));
        }

        const tokenNotValid = await tokensVerificator(token, JWT_ACCESS_SECRET);

        const tokensFromDB = await authService.getTokensByParams({accessToken: token});

        if (tokenNotValid || !tokensFromDB) {
            return next(new ErrorsHandler(TOKEN_NOT_VALID.message, UNAUTHORIZED, TOKEN_NOT_VALID.code));
        }

        req.userId = tokensFromDB.userId;

        next();
};
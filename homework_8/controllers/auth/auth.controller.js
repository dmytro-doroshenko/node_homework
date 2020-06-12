const {authService, userService} = require('../../services');
const {checkHashPassword, tokensCreator} = require('../../helper');
const {errors, httpStatusCodes, requestHeaders} = require('../../constants');

const {USER_NOT_FOUND} = errors;
const {NOT_FOUND, OK} = httpStatusCodes;
const {AUTHORIZATION} = requestHeaders;

module.exports = {
    loginUser: async (req, res, next) => {
        try {
            const {email, password} = req.body;

            const user = await userService.getUserByParams({email});

            if (!user) {
                return next(new ErrorsHandler(USER_NOT_FOUND.message, NOT_FOUND, USER_NOT_FOUND.code));
            }

            await checkHashPassword(user.password, password);

            const tokens = tokensCreator();

            await  authService.createTokensPair({...tokens, userId: user.id});

            res.json(tokens);
        }
        catch (e) {
            next(e);
        }
    },

    logoutUser: async (req, res) => {
        const accessToken = req.get(AUTHORIZATION);

        await authService.deleteTokensByParams({accessToken});

        res.sendStatus(OK);
    },

    extendAuthorization: async (req, res, next) => {
        try {
            const refreshToken = req.get(AUTHORIZATION);

            await authService.deleteTokensByParams({refreshToken});

            const newTokens = tokensCreator();

            await authService.createTokensPair({...newTokens, userId: req.userId});

            res.json(newTokens);
        }
        catch (e) {
            next(e);
        }
    }
};
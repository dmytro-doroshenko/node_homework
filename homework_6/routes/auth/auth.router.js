const {Router} = require('express');

const {authController} = require('../../controllers');
const {checkAccessToken, checkIsLoginDataValidity, checkRefreshToken} = require('../../middlewares');

const {extendAuthorization, loginUser, logoutUser} = authController;

const authRouter = Router();

authRouter.post('/', checkIsLoginDataValidity, loginUser);
authRouter.post('/logout', checkAccessToken, logoutUser);
authRouter.post('/refresh', checkRefreshToken, extendAuthorization);

module.exports = authRouter;
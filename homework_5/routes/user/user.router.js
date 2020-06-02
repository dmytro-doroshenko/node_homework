const {Router} = require('express');

const {userController} = require('../../controllers');
const {checkUserValidity} = require('../../middlewares');

const {getAllUsers, createUser, loginUser} = userController;


const userRouter = Router();

userRouter.get('/', getAllUsers);

userRouter.post('/', checkUserValidity, createUser);

userRouter.post('/auth', loginUser);

module.exports = userRouter;
const {Router} = require('express');

const {checkUserValidity} = require('../../middlewares');
const {userController} = require('../../controllers');

const {getAllUsers, createUser} = userController;


const userRouter = Router();

userRouter.get('/', getAllUsers);
userRouter.post('/', checkUserValidity, createUser);

module.exports = userRouter;
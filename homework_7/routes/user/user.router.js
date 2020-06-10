const {Router} = require('express');

const {checkUserValidity, checkAccessToken} = require('../../middlewares');
const {userController} = require('../../controllers');

const {getAllUsers, createUser, deleteUser} = userController;


const userRouter = Router();

userRouter.get('/', getAllUsers);
userRouter.post('/', checkUserValidity, createUser);
userRouter.delete('/:id', checkAccessToken, deleteUser)

module.exports = userRouter;
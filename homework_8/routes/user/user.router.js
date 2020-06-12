const {Router} = require('express');

const {checkUserValidity, checkAccessToken, checkFileTypes, checkAvatarPhotoCount} = require('../../middlewares');
const {userController} = require('../../controllers');

const {getAllUsers, createUser, deleteUser} = userController;

const userRouter = Router();

userRouter.delete('/:id', checkAccessToken, deleteUser)
userRouter.get('/', getAllUsers);
userRouter.post('/', checkUserValidity, checkFileTypes, checkAvatarPhotoCount, createUser);

module.exports = userRouter;
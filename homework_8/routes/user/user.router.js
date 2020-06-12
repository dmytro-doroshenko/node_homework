const {Router} = require('express');

const {checkUserValidity, checkAccessToken, checkFileTypes, checkAvatarPhotoCount} = require('../../middlewares');
const {userController} = require('../../controllers');

const {getAllUsers, createUser, deleteUser, deleteUserPhoto} = userController;

const userRouter = Router();

userRouter.delete('/', checkAccessToken, deleteUser);
userRouter.delete('/photo', checkAccessToken, deleteUserPhoto);
userRouter.get('/', getAllUsers);
userRouter.post('/', checkUserValidity, checkFileTypes, checkAvatarPhotoCount, createUser);

module.exports = userRouter;
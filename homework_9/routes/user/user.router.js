const {Router} = require('express');

const {checkUserValidity, checkAccessToken, checkFileTypes, checkAvatarPhotoCount} = require('../../middlewares');
const {userController} = require('../../controllers');

const {createUser, deleteUser, deleteUserPhoto, getAllUsers, getUserProfile} = userController;

const userRouter = Router();

userRouter.delete('/', checkAccessToken, deleteUser);
userRouter.delete('/photo', checkAccessToken, deleteUserPhoto);
userRouter.get('/', getAllUsers);
userRouter.get('/profile', checkAccessToken, getUserProfile)
userRouter.post('/', checkUserValidity, checkFileTypes, checkAvatarPhotoCount, createUser);

module.exports = userRouter;
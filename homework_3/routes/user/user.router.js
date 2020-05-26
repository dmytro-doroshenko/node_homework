const {Router} = require('express');
const {userController} = require('../../controllers');
const checkUserValidity = require('../../middlewares/user/check-is-user-valid.middleware');

const userRouter = Router();

userRouter.post('/', checkUserValidity, userController.createUser);

userRouter.get('/', userController.getAllUsers);

userRouter.put('/', userController.updateUser);

userRouter.delete('/:name', userController.deleteUser);

module.exports = userRouter;
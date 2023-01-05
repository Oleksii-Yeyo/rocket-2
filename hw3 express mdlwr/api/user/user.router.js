const userRouter = require('express').Router();

const controller = require('./user.controller');
const mdlwr = require('./user.middleware');

userRouter.get('/', controller.getAllUsers);
userRouter.post('/', mdlwr.checkIsInputValid, mdlwr.checkIsEmailExist, controller.createUser);

// userRouter.use('/:userId', mdlwr.checkIsUserExists);
userRouter.get('/:userId', mdlwr.checkIsUserExists, controller.getUserById);
// eslint-disable-next-line max-len
userRouter.put('/:userId', mdlwr.checkIsInputValid, mdlwr.checkIsUserExists, mdlwr.checkIsEmailExistWhenUpdate, controller.updateUser);
userRouter.delete('/:userId', mdlwr.checkIsUserExists, controller.deleteUser);


module.exports = userRouter;

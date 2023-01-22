const userRouter = require('express').Router()

const userController = require('./user.controller');
const userMdlwr = require('./user.middleware');
const authMdlwr = require('../auth/auth.middleware');
const commonMdlwr = require('../../middlewares/common.middlewares');


userRouter.get('/', userController.getAllUsers);
userRouter.post('/', userMdlwr.newUserValidator, userMdlwr.checkUserDuplicates('email', 'body'), userController.createUser);

userRouter.get('/profile', authMdlwr.validateAccessToken, userController.getMyProfile);


userRouter.use('/:userId', commonMdlwr.objectIdValidator('userId'), userMdlwr.getUserDynamically('userId', 'params', '_id'));

userRouter.get('/:userId', userController.getUserById);
userRouter.put('/:userId',  userController.updateUser);
userRouter.delete('/:userId', userController.deleteUser);   // dynamic queries should be at the bottom

module.exports = userRouter;
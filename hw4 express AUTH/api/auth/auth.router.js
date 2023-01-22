const authRouter = require('express').Router();

const authController = require('./auth.controller');
const authMdlwr = require('./auth.middleware');
const userMdlwr = require('../user/user.middleware');

authRouter.post('/', userMdlwr.getUserDynamically('email', 'body'), authController.loginUser);
authRouter.post('/logout', authMdlwr.validateAccessToken, authController.logoutOneDevice);
authRouter.post('/logoutAll', authMdlwr.validateAccessToken, authController.logoutAllDevices);
authRouter.post('/refresh', authMdlwr.validateRefreshToken, authController.refreshToken);

module.exports = authRouter;
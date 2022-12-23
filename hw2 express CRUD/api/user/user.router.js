const  userRouter = require('express').Router();

const controller = require('./user.controller');


userRouter.get('/', controller.getAllUsers);
userRouter.post('/', controller.createUser);
    
    
userRouter.get('/:userID', controller.getUserById);
userRouter.put('/:userID', controller.updateUser);
userRouter.delete('/:userID', controller.deleteUser);

module.exports = userRouter;
// const users = require("../../dataBase/users");
const userService = require("./user.service");

module.exports = {
  getAllUsers: async (req, res, next) => {
    try {
      const users = await userService.getUsers();

      res.json(users);

    } catch (e) {
      next(e);
    }
    // res.json(users);
    // res.json([]);

  },

  createUser: async (req, res, next) => {
    try {
      const createdUser = await userService.createUser(req.body);

      res.status(201).json(createdUser);
    } catch (e) {
      next(e);
    }
  },

  getUserById: (req, res, next) => {
    try {
      // console.log(req.user);

      res.json(req.user);
    } catch (e) {
      next(e);
    }
  },

  updateUser: async (req, res, next) => {
    try {
      // res.json('HELLO TEST CHAT');
      await userService.updateUser(req.user._id, req.body);
      res.json(`User with ID: ${req.user._id} was updated.`);
    } catch (e) {
      next(e);
    }
  },

  deleteUser: async (req, res, next) => {
    try {
      await userService.deleteUser(req.user._id);
      res.status(204).end();
    } catch (e) {
      next(e);
    }
  }
};

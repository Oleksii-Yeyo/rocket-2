const userService = require("./user.service");
const { NotFound, Forbidden } = require("../../errors/ApiError");
const { isEmailValid } = require("./user.helpers");

module.exports = {
  checkIsUserExists: async (req, res, next) => {
    try {
      const user = await userService.getSingleUser(req.params.userId);

      if (!user) {
        throw new NotFound(`User with ID: ${req.params.userId} not found.`);
      }

      req.user = user;

      next();
    } catch (e) {
      next(e);
    }
  },

  checkIsEmailExist: async (req, res, next) => {
    try {
      const user = await userService.findUserByEmail(req.body.email);

      if (user[0] !== undefined) {
        // console.log(user)
        throw new Forbidden(`User with this email already exists: ${req.body.email}. Please, try a different email.`);
      }

      next();
    } catch (e) {
      next(e);
    }
  },

  checkIsEmailExistWhenUpdate: async (req, res, next) => {
    try {
      const user = await userService.findUserByEmail(req.body.email);
  
      if (user[0] !== undefined) {
        if (user[0].id !== req.user.id) {
          throw new Forbidden(`User with this email already exists: ${req.body.email}. Please, try a different email.`);
        }
      }

      next();
    } catch (e) {
      next(e);
    }
  },

  checkIsInputValid: (req, res, next) => {
    try {
      if (req.body.age <= 0) {
        throw new Forbidden('Incorrect age');
      }
      if (!req.body.email || !req.body.password) {
        throw new Forbidden('Email and password is required');
      }
      if (!isEmailValid(req.body.email)) {
        throw new Forbidden('Email is not valid');
      }
      if (req.body.password.length < 8) {
        throw new Forbidden('Password must be 8 characters or more');
      }
      if (req.body.phone.length < 10 || req.body.phone.length > 14) {
        throw new Forbidden('Phone number is not valid');
      }
      if (req.body.firstName.length > 20 || req.body.firstName.length < 2) {
        throw new Forbidden('First name is not valid');
      }
      if (req.body.lastName.length > 20 || req.body.lastName.length < 2) {
        throw new Forbidden('Last name number is not valid');
      }
  
      next();
    } catch (e) {
      next(e);
    }

  }
};



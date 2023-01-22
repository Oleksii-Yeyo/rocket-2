const usersService = require('./user.service');
const {NotFound, BadRequest} = require('../../errors/ApiError');
const {newUserSchema} = require('./user.validator');
const authService = require('../auth/auth.service');

module.exports = {
    getUserDynamically: (paramName, from, dbField = paramName) => async (req, res, next) => {
        try {
            const searchData = req[from][paramName];

            const user = await usersService.findUserByParams({[dbField]: searchData});

            if (!user) {
                throw new NotFound('User not found');
            }

            req.locals = {...req.locals,user};

            next();
        } catch (e) {
            next(e);
        }
    },

    checkUserDuplicates: (paramName, from, dbField = paramName) => async (req, res, next) => {
        try {
            const searchData = req[from][paramName];

            const user = await usersService.findUserByParams({[dbField]: searchData});

            if (user) {
                throw new NotFound('User with such info already exists: ' + user[paramName]);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    newUserValidator: async (req, res, next) => {
        try {
            const {error, value} = newUserSchema.validate(req.body);

            if (error) {
                throw new BadRequest(error);
            }

            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    }
};
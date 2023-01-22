const usersService = require('./user.service');
const {CREATED, NO_CONTENT} = require('../../errors/errors.codes');

module.exports = {
    getMyProfile: (req, res, next) => {
        try {
            const unreadMessage = 5; // DB query simulation

            res.json({
                ...req.user.toObject(),
                additionalData: { unreadMessage }
            });
        } catch (e) {
            next(e);
        }
    },

    getAllUsers: async (req, res) => {
        const allUsers = await usersService.getAllUsers(req.query);
        res.json(allUsers);
    },

    createUser: async (req, res, next) => {
        try {
            const createdUser = await usersService.createUser(req.body);

            res.status(CREATED).json(createdUser);
        } catch (e) {
            next(e);
        }
    },

    getUserById: async (req, res, next) => {
        try {
            res.json(req.locals.user);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const updatedUser = await usersService.updateUser(req.params.userId, req.body);
            res.json(updatedUser);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            await usersService.deleteUserById(req.params.userId);

            res.status(NO_CONTENT).end();
        } catch (e) {
            next(e);
        }
    }
};
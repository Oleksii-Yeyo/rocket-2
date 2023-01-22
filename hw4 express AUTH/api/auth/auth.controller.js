const authService = require('./auth.service');
const oauthService = require('../../services/oauth.service');
const {NO_CONTENT} = require('../../errors/errors.codes');
const { AUTHORIZATION } = require('../../configs/variables');

module.exports = {
    loginUser: async (req, res, next) => {
        try {
            const user = req.locals.user;

            await oauthService.checkPassword(user.password, req.body.password);
            const tokenPair = oauthService.generateNewAccessTokenPair({...user._id});

            await authService.createOauthPair({...tokenPair, user: user._id});

            res.json({
                ...tokenPair,
                user
            });
        } catch (e) {
            next(e);
        }
    },

    logoutOneDevice: async (req, res, next) => {
        try {
            // logout from one device
            const accessToken = req.get(AUTHORIZATION); // get data from query's header
            await authService.deleteOneByParams({ accessToken });
            
            res.status(NO_CONTENT).json();
        } catch (e) {
            next(e);
        }
    },

    logoutAllDevices: async (req, res, next) => {
        try {
            // logout from all devices
            const accessToken = req.get(AUTHORIZATION); // get data from query's header
            await authService.deleteManyByParams({ user: req.user._id });
            
            res.status(NO_CONTENT).json();
        } catch (e) {
            next(e);
        }
    },

    refreshToken: async (req, res, next) =>{
        try {
            const user = req.user;

            const refreshToken = req.get(AUTHORIZATION); // get data from query's header
            await authService.deleteOneByParams({ refreshToken });

            const tokenPair = oauthService.generateNewAccessTokenPair({...user._id});

            await authService.createOauthPair({...tokenPair, user: user._id});

            res.json({...tokenPair, user});
        } catch (e){
            next(e);
        }
    }
};

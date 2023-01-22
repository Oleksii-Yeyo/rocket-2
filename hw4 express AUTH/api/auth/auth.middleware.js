const {Unauthorized} = require('../../errors/ApiError');
const oathService = require('../../services/oauth.service');
const service = require('./auth.service');
const { AUTHORIZATION } = require('../../configs/variables');

module.exports = {
    validateAccessToken: async (req, res, next) => {
        try {
            const accessToken = req.get(AUTHORIZATION);     // get data from query's header

            if (!accessToken) {
                throw new Unauthorized('No token');
            }

            oathService.validateToken(accessToken, 'access');

            const tokenWithUser = await service.getByParams({ accessToken });


            if(!tokenWithUser){
                throw new Unauthorized('Invalid token');
            }

            // console.log(tokenWithUser);

            req.user = tokenWithUser.user;
            next();
        } catch (e) {
            next(e);
        }
    },

    validateRefreshToken: async (req, res, next) => {
        try {
            const refreshToken = req.get(AUTHORIZATION);    // get data from query's header

            if (!refreshToken) {
                throw new Unauthorized('No token');
            }

            oathService.validateToken(refreshToken, 'refresh');

            const tokenWithUser = await service.getByParams( {refreshToken });


            if(!tokenWithUser){
                throw new Unauthorized('Invalid token');
            }

            // console.log(tokenWithUser);

            req.user = tokenWithUser.user;
            next();
        } catch (e) {
            next(e);
        }
    }
};
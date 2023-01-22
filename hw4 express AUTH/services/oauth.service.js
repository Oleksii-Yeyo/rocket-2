const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {BadRequest, Unauthorized} = require('../errors/ApiError');
const {REFRESH_TOKEN_SECRET, ACCESS_TOKEN_SECRET} = require('../configs/variables');

const hashPassword = (password) => bcrypt.hash(password, 10);

const checkPassword = async (hashedPassword, password) => {
    const isPasswordEquals = await bcrypt.compare(password, hashedPassword);

    if (!isPasswordEquals) {
        throw new BadRequest('Email or password is wrong');
    }
};

const generateNewAccessTokenPair = (encodeData = {}) => {
    const accessToken = jwt.sign(encodeData, ACCESS_TOKEN_SECRET, {expiresIn: '15m'});
    const refreshToken = jwt.sign(encodeData, REFRESH_TOKEN_SECRET, {expiresIn: '30d'});

    return{
        accessToken,
        refreshToken
    };
};

const validateToken = (token = '', tokenType = 'access') => {
    try {
        if (tokenType === 'access') {
            return jwt.verify(token, ACCESS_TOKEN_SECRET);
        }

        return jwt.verify(token, REFRESH_TOKEN_SECRET);
        
    } catch (e) {
        throw new Unauthorized(e.message || 'Invalid token');
    }
};

module.exports = {
    hashPassword,
    checkPassword,
    generateNewAccessTokenPair,
    validateToken
};

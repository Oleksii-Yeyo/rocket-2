module.exports = {
    PORT: process.env.PORT || 3000,
    MONGO_URL: process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/rocket',
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'access_secret',
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'refresh_secret',
    AUTHORIZATION: 'Authorization',
};
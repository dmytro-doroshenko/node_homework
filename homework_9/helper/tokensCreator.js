const jwt = require('jsonwebtoken');


const {
    JWT_ACCESS_SECRET,
    JWT_ACCESS_LIFETIME,
    JWT_BLA_BLA,
    JWT_REFRESH_SECRET,
    JWT_REFRESH_LIFETIME
} = require('../config');

module.exports = () => {
    const accessToken = jwt.sign({JWT_BLA_BLA}, JWT_ACCESS_SECRET, {expiresIn: JWT_ACCESS_LIFETIME});
    const refreshToken = jwt.sign({JWT_BLA_BLA}, JWT_REFRESH_SECRET, {expiresIn: JWT_REFRESH_LIFETIME});

    return {
        accessToken,
        refreshToken,
    };
};
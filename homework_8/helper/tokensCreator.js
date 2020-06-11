const jwt = require('jsonwebtoken');

const {words} = require('../constants');

const {JWT_ACCESS_SECRET, JWT_ACCESS_LIFETIME, JWT_BLA_BLA, JWT_REFRESH_SECRET, JWT_REFRESH_LIFETIME} = words;

module.exports = () => {
    const accessToken = jwt.sign({JWT_BLA_BLA}, JWT_ACCESS_SECRET, {expiresIn: JWT_ACCESS_LIFETIME});
    const refreshToken = jwt.sign({JWT_BLA_BLA}, JWT_REFRESH_SECRET, {expiresIn: JWT_REFRESH_LIFETIME});

    return {
        accessToken,
        refreshToken,
    };
};
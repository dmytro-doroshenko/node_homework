const bcrypt = require('bcrypt');

const ErrorsHandler = require('../errors/ErrorsHandler');
const {errors, httpStatusCodes} = require('../constants');

const {USER_NOT_FOUND} = errors;
const {NOT_FOUND} = httpStatusCodes;

module.exports = async (hashedPassword, password) => {
    const arePasswordsEqual = await bcrypt.compare(password, hashedPassword);

    if (!arePasswordsEqual) {
        throw new ErrorsHandler(USER_NOT_FOUND.message, NOT_FOUND, USER_NOT_FOUND.code);
    }
};
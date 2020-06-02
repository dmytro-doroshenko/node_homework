const bcrypt = require('bcrypt');

module.exports = async (hashedPassword, password) => {
    const arePasswordsEqual = await bcrypt.compare(password, hashedPassword);

    if (!arePasswordsEqual) {
        throw new Error('User not found!');
    }
};
const {hashPassword} = require('../../helper');
const {httpStatusCodes} = require('../../constants');
const {userService} = require('../../services');

const {OK} = httpStatusCodes;

module.exports = {
    getAllUsers: async (req, res) => {

        let users = await userService.getUsers();

        res.json(users);
    },

    createUser: async (req, res) => {
        const user = req.body;

        user.password = await hashPassword(user.password);

        await userService.createUser(user);

        res.sendStatus(OK);
        res.redirect('/users');
    },

}
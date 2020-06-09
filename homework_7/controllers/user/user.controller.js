const {emailActions, errors, httpStatusCodes} = require('../../constants');
const ErrorsHandler = require('../../errors/ErrorsHandler');
const {hashPassword} = require('../../helper');
const {userService, mailerService} = require('../../services');

const {USER_CREATE} = emailActions;
const {USER_NOT_FOUND} = errors;
const {NOT_FOUND, OK} = httpStatusCodes;

module.exports = {
    getAllUsers: async (req, res) => {

        let users = await userService.getUsers();

        res.json(users);
    },

    createUser: async (req, res) => {
        const user = req.body;

        user.password = await hashPassword(user.password);

        await userService.createUser(user);

        await mailerService.sendMail(user.email, USER_CREATE, {
            userName: user.name,
        });

        res.sendStatus(OK);
    },

    deleteUser: async (req, res, next) => {
        const {id} = req.params;

        const isDeleted = await userService.deleteUser(id);

        if (!isDeleted) {
            return next(new ErrorsHandler(USER_NOT_FOUND.message, NOT_FOUND, USER_NOT_FOUND.code))
        }


        res.sendStatus(OK)
    }

}
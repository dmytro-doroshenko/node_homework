const {userService} = require('../../services');
const {hashPassword, checkHashPassword} = require('../../helper');
const ErrorsHandler = require('../../errors/ErrorsHandler');

module.exports = {
    getAllUsers: async (req, res) => {

        let users = await userService.getUsers();

        res.json(users);
    },

    createUser: async (req, res) => {
        const user = req.body;
        console.log(user);

        user.password = await hashPassword(user.password);

        await userService.createUser(user);

        res.end();
    },
    loginUser: async (req, res, next) => {
        try {
            const {email, password} = req.body;

            const user = await userService.getUserByParams({email});

            if (!user) {
                return next(new ErrorsHandler('User not found!', 404, 4041));
            }

            await checkHashPassword(user.password, password);

            res.json(user);
        } catch (e) {
            next(e);
        }
    },
}
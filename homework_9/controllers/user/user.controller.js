const {emailActions, errors, httpStatusCodes, modelNames} = require('../../constants');
const ErrorsHandler = require('../../errors/ErrorsHandler');
const {hashPassword} = require('../../helper');
const {userService, mailerService, photoService} = require('../../services');

const {USER_CREATE, USER_DELETE, USER_UPDATE} = emailActions;
const {USER_NOT_FOUND, PHOTO_NOT_FOUND_TO_DELETE} = errors;
const {NOT_FOUND, OK} = httpStatusCodes;
const {USER} = modelNames;

module.exports = {
    createUser: async (req, res, next) => {
        try {
            const user = req.body;
            const [avatar] = req.photos;

            user.password = await hashPassword(user.password);

            const {id} = await userService.createUser(user);

            if (avatar) {
                const photosDir = `users/${id}/photos`;

                await photoService.addPhoto(avatar, USER, photosDir, id);
            }

            await mailerService.sendMail(user.email, USER_CREATE, {
                userName: user.name,
            });

            res.sendStatus(OK);
        }
        catch (e) {
            return next(new ErrorsHandler(e));
        }
    },

    deleteUser: async (req, res, next) => {
        const {userId} = req;

        const userInfo = await userService.getUserByParams({userId});

        const isDeleted = await userService.deleteUser(+userId);

        if (!userInfo || !isDeleted) {
            return next(new ErrorsHandler(USER_NOT_FOUND.message, NOT_FOUND, USER_NOT_FOUND.code));
        }

        await mailerService.sendMail(userInfo.dataValues.email, USER_DELETE, {
            userEmail: userInfo.dataValues.email
        });

        res.sendStatus(OK);
    },

    deleteUserPhoto: async (req, res, next) => {
        try {
            const [isDeleted] = await photoService.removePhoto(USER, req.userId);

            if (!isDeleted) {
                return next(new ErrorsHandler(
                    PHOTO_NOT_FOUND_TO_DELETE.message,
                    NOT_FOUND,
                    PHOTO_NOT_FOUND_TO_DELETE.code));
            }

            res.sendStatus(OK);
        }
        catch (e) {
            return next (new ErrorsHandler(e))
        }
    },

    getAllUsers: async (req, res) => {

        let users = await userService.getUsers();

        res.json(users);
    },

    getUserProfile: (req, res) => {
        res.json(req.user);
    }
}
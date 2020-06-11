const {errors, httpStatusCodes} = require('../../constants');
const ErrorHandler = require('../../errors/ErrorsHandler');

const {ONLY_IMAGES_ALLOWED} = errors;
const {BAD_REQUEST} = httpStatusCodes;

module.exports = (req, res, next) => {

    if (req.docs.length) {
        return next(new ErrorHandler(ONLY_IMAGES_ALLOWED.message, BAD_REQUEST, ONLY_IMAGES_ALLOWED.code));
    }

    if (req.photos.length > 1) {
        return next(new ErrorHandler('___________', BAD_REQUEST));
    }

    return next();
}
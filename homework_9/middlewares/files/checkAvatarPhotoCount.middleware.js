const {errors, httpStatusCodes} = require('../../constants');
const ErrorHandler = require('../../errors/ErrorsHandler');

const {ONLY_IMAGES_ALLOWED, ONLY_ONE_IMAGE_ALLOWED} = errors;
const {BAD_REQUEST} = httpStatusCodes;

module.exports = (req, res, next) => {

    if (req.docs.length || req.audios.length || req.videos.length) {
        return next(new ErrorHandler(ONLY_IMAGES_ALLOWED.message, BAD_REQUEST, ONLY_IMAGES_ALLOWED.code));
    }

    if (req.photos.length > 1) {
        return next(new ErrorHandler(ONLY_ONE_IMAGE_ALLOWED.message, BAD_REQUEST, ONLY_ONE_IMAGE_ALLOWED.code));
    }

    return next();
}
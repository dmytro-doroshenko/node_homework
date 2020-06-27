const { httpStatusCodes, errors, fileOptions} = require('../../constants');
const ErrorHandler = require('../../errors/ErrorsHandler');

const {FILE_NOT_VALID, FILE_SIZE_EXCEEDED} = errors;
const {BAD_REQUEST} = httpStatusCodes;
const {
    AUDIO_MIMETYPES,
    DOC_MIMETYPES,
    MAX_AUDIO_SIZE,
    MAX_DOC_SIZE,
    MAX_PHOTO_SIZE,
    MAX_VIDEO_SIZE,
    PHOTO_MIMETYPES,
    VIDEO_MIMETYPES
} = fileOptions;

module.exports = (req, res, next) => {
    req.audios = [];
    req.docs = [];
    req.photos = [];
    req.videos = [];

    if (!req.files) {
        return next();
    }

    const files = Object.values(req.files);

    for (let i = 0; i < files.length; i++) {
        const {size, mimetype, name} = files[i];

        if (AUDIO_MIMETYPES.includes(mimetype)) {
            if (size > MAX_AUDIO_SIZE) {
                return next(new ErrorHandler(
                    FILE_SIZE_EXCEEDED.message(MAX_AUDIO_SIZE),
                    BAD_REQUEST,
                    FILE_SIZE_EXCEEDED.code
                ));
            }

            req.audios.push(files[i]);
        }
        else if (DOC_MIMETYPES.includes(mimetype)) {
            if (size > MAX_DOC_SIZE) {
                return next(new ErrorHandler(
                    FILE_SIZE_EXCEEDED.message(MAX_DOC_SIZE),
                    BAD_REQUEST,
                    FILE_SIZE_EXCEEDED.code
                ));
            }

            req.docs.push(files[i]);
        }
        else if (PHOTO_MIMETYPES.includes(mimetype)) {
            if (size > MAX_PHOTO_SIZE) {
                return next(new ErrorHandler(
                    FILE_SIZE_EXCEEDED.message(MAX_PHOTO_SIZE),
                    BAD_REQUEST,
                    FILE_SIZE_EXCEEDED.code
                ));
            }

            req.photos.push(files[i]);
        }
        else if (VIDEO_MIMETYPES.includes(mimetype)) {
            if (size > MAX_VIDEO_SIZE) {
                return next(new ErrorHandler(
                    FILE_SIZE_EXCEEDED.message(MAX_VIDEO_SIZE),
                    BAD_REQUEST,
                    FILE_SIZE_EXCEEDED.code
                ));
            }

            req.videos.push(files[i]);
        }

        else {
            return next(new ErrorHandler(FILE_NOT_VALID.message(name), BAD_REQUEST, FILE_NOT_VALID.code));
        }
    }

    return next();
};
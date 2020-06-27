module.exports = {
    // 400: BAD REQUEST
    ONLY_IMAGES_ALLOWED: {
        message: 'You can upload ONLY images!',
        code: 4001,
    },
    FILE_NOT_VALID: {
        message: (fileName) => `File '${fileName}' is not valid!`,
        code: 4002,
    },
    FILE_SIZE_EXCEEDED: {
        message: (fileSizeInBytes) => `Max file size is ${fileSizeInBytes / 1024 / 1024} MB`,
        code: 4003,
    },
    ONLY_ONE_IMAGE_ALLOWED: {
        message: 'You can upload ONLY ONE image!',
        code: 4004,
    },

    // 401: UNAUTHORIZED
    TOKEN_NOT_VALID: {
        message: 'Token not valid',
        code: 4011,
    },

    // 403: FORBIDDEN
    NO_ACCESS_TO_DELETE_PHOTO:{
        message: 'You don\'t have access to delete this photo!',
        code: 4031,
    },

    // 404: NOT FOUND
    USER_NOT_FOUND: {
        message: 'User not found',
        code: 4041,
    },
    PRODUCT_NOT_FOUND: {
        message: 'Product not found',
        code: 4042,
    },
    PRODUCT_NOT_FOUND_TO_DELETE: {
        message: 'Product not found. Nothing has been deleted',
        code: 4043,
    },
    PRODUCT_NOT_FOUND_TO_UPDATE: {
        message: 'Product not found. Nothing has been updated',
        code: 4044,
    },
    PHOTO_NOT_FOUND_TO_DELETE: {
        message: 'There is no photo in profile. Nothing to delete!',
        code: 4045,
    }
};
module.exports = {
    // BAD REQUEST


    // UNAUTHORIZED
    TOKEN_NOT_VALID: {
        message: 'Token not valid',
        code: 4011,
    },

    // FORBIDDEN


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
};
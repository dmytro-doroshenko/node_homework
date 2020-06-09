const {emailActions} = require('../constants');

const {
    PRODUCT_CREATE,
    PRODUCT_DELETE,
    PRODUCT_UPDATE,
    USER_CREATE,
    USER_DELETE,
    USER_UPDATE,
} = emailActions;


module.exports = {
    [PRODUCT_CREATE]: {
        subject: 'New product added to the DB',
        templateFileName: 'productAdd'
    },
    [PRODUCT_DELETE]: {
        subject: 'Product was DELETED from the DB',
        templateFileName: 'productDelete'
    },
    [PRODUCT_UPDATE]: {
        subject: 'Product was updated in the DB',
        templateFileName: 'productUpdate'
    },
    [USER_CREATE]: {
        subject: 'Creating account',
        templateFileName: 'userRegister'
    },
    [USER_DELETE]: {
        subject: 'Account removal',
        templateFileName: 'userDelete'
    },
    [USER_UPDATE]: {
        subject: 'Updating account',
        templateFileName: 'userDelete'
    },
}
const {emailActions} = require('../constants');
const {mailerService, productService, userService} = require('../services');

const {PRODUCT_NO_PHOTO} = emailActions;
const {sendMail} = mailerService;
const {getProductsWithoutPhoto} = productService;
const {getUserByParams} = userService;

module.exports = async () => {
    const products = await getProductsWithoutPhoto();

    for (const product of products) {
        const {userId, name} = product.dataValues;

        const userInfo = await getUserByParams({id: userId});

        await sendMail(userInfo.dataValues.email, PRODUCT_NO_PHOTO, {
            productName: name,
            userName: userInfo.dataValues.name,
        });
    }
};
const {errors, httpStatusCodes} = require('../../constants');
const ErrorsHandler = require('../../errors/ErrorsHandler');
const {productService} = require('../../services');

const {NO_ACCESS_TO_DELETE_PHOTO} = errors;
const {FORBIDDEN} = httpStatusCodes
const {getProductByID} = productService;

module.exports = async (req, res, next) => {
    const {id} = req.params;

    const [product] = await getProductByID(id);

    if (product.dataValues.userId !== req.userId) {
        return next(new ErrorsHandler(NO_ACCESS_TO_DELETE_PHOTO.message, FORBIDDEN, NO_ACCESS_TO_DELETE_PHOTO.code));
    }

    return next();
};
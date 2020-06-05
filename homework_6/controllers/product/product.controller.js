const ErrorsHandler = require('../../errors/ErrorsHandler');
const {productService} = require('../../services');
const {errors, httpStatusCodes, requestHeaders} = require('../../constants');

const {getProducts, getProductByID} = productService;
const {PRODUCT_NOT_FOUND, PRODUCT_NOT_FOUND_TO_DELETE, PRODUCT_NOT_FOUND_TO_UPDATE} = errors;
const {NOT_FOUND, OK} = httpStatusCodes;

module.exports = {
    getAllProducts: async (req, res) => {
        let products = await getProducts();

        res.json(products);
    },

    getProductByID: async (req, res, next) => {
        const {id} = req.params;
        const productToSend = await getProductByID(id);

        if (!productToSend) {
            return next(new ErrorsHandler(PRODUCT_NOT_FOUND.message, NOT_FOUND, PRODUCT_NOT_FOUND.code));
        }

        res.json(productToSend);
    },

    addNewProduct: async (req, res, next) => {
        try {
            await productService.addProduct(req.body);
        } catch (e) {
            return next(new ErrorsHandler(e.message));
        }

        res.sendStatus(OK);
    },

    deleteProduct: async (req, res, next) => {
        const {id} = req.params;

        const isDeleted = await productService.deleteProduct(id);

        if (!isDeleted) {
            return next(new ErrorsHandler(
                PRODUCT_NOT_FOUND_TO_DELETE.message,
                NOT_FOUND,
                PRODUCT_NOT_FOUND_TO_DELETE.code,
            ));
        }

        res.sendStatus(OK);
    },

    updateProduct: async (req, res, next) => {
        const {id} = req.params;

        const isUpdated = await productService.updateProduct(id, req.body);

        if (!isUpdated) {
            return next(new ErrorsHandler(
                PRODUCT_NOT_FOUND_TO_UPDATE.message,
                NOT_FOUND,
                PRODUCT_NOT_FOUND_TO_UPDATE.code
            ));
        }

        res.sendStatus(OK);
    },
};
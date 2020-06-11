const {emailActions, errors, httpStatusCodes} = require('../../constants');
const ErrorsHandler = require('../../errors/ErrorsHandler');
const {mailerService, productService, userService} = require('../../services');

const {PRODUCT_CREATE, PRODUCT_DELETE, PRODUCT_UPDATE} = emailActions
const {PRODUCT_NOT_FOUND, PRODUCT_NOT_FOUND_TO_DELETE, PRODUCT_NOT_FOUND_TO_UPDATE} = errors;
const {NOT_FOUND, OK} = httpStatusCodes;
const {getProducts, getProductByID} = productService;

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

        const userInfo = await userService.getUserByParams({id: req.userId});

        await mailerService.sendMail(userInfo.dataValues.email, PRODUCT_CREATE, {
            productName: req.body.name,
            userName: userInfo.dataValues.name,
            userEmail: userInfo.dataValues.email
        });

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

        const userInfo = await userService.getUserByParams({id: req.userId});

        await mailerService.sendMail(userInfo.dataValues.email, PRODUCT_DELETE, {
            productName: req.body.name
        });

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

        const userInfo = await userService.getUserByParams({id: req.userId});

        await mailerService.sendMail(userInfo.dataValues.email, PRODUCT_UPDATE, {
            productName: req.body.name
        });

        res.sendStatus(OK);
    },
};
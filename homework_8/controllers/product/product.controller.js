const fsExtra = require('fs-extra').promises;
const {resolve} = require('path');
const uuid = require('uuid').v1();

const {emailActions, errors, httpStatusCodes} = require('../../constants');
const ErrorsHandler = require('../../errors/ErrorsHandler');
const {mailerService, productService, userService} = require('../../services');

const {PRODUCT_CREATE, PRODUCT_DELETE, PRODUCT_UPDATE} = emailActions
const {PRODUCT_NOT_FOUND, PRODUCT_NOT_FOUND_TO_DELETE, PRODUCT_NOT_FOUND_TO_UPDATE} = errors;
const {NOT_FOUND, OK} = httpStatusCodes;
const {getProducts, getProductByID, updateProduct} = productService;

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
            const [photo] = req.photos;
            const {id} = await productService.addProduct(req.body);
            const photosDir = `products/${id}/photos`;
            const fileExtension = photo.name.split('.').pop();
            const photoName = `${uuid}.${fileExtension}`;

            await fsExtra.mkdir(resolve(process.cwd(), 'public', photosDir), {recursive: true});

            await photo.mv(resolve(process.cwd(), 'public', photosDir, photoName));

            await updateProduct(id, {photo: `${photosDir}/${photoName}`});

            const userInfo = await userService.getUserByParams({id: req.userId});

            await mailerService.sendMail(userInfo.dataValues.email, PRODUCT_CREATE, {
                productName: req.body.name,
                userName: userInfo.dataValues.name,
                userEmail: userInfo.dataValues.email
            });


        } catch (e) {
            return next(new ErrorsHandler(e));
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
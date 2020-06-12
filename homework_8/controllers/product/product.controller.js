const {emailActions, errors, httpStatusCodes, modelNames} = require('../../constants');
const ErrorsHandler = require('../../errors/ErrorsHandler');
const {mailerService, productService, photoService, userService} = require('../../services');

const {PRODUCT_CREATE, PRODUCT_DELETE, PRODUCT_UPDATE} = emailActions
const {
    PHOTO_NOT_FOUND_TO_DELETE,
    PRODUCT_NOT_FOUND,
    PRODUCT_NOT_FOUND_TO_DELETE,
    PRODUCT_NOT_FOUND_TO_UPDATE
} = errors;
const {NOT_FOUND, OK} = httpStatusCodes;
const {sendMail} = mailerService;
const {PRODUCT} = modelNames;
const {addPhoto, removePhoto} = photoService;
const {addProduct, deleteProduct, getProducts, getProductByID, updateProduct} = productService;
const {getUserByParams} = userService;

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
            req.body.userId = req.userId;
            const {id} = await addProduct(req.body);

            if (photo) {
                const photosDir = `products/${id}/photos`;

                await addPhoto(photo, PRODUCT, photosDir, id)
            }

            const userInfo = await getUserByParams({id: req.userId});

            await sendMail(userInfo.dataValues.email, PRODUCT_CREATE, {
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

        const isDeleted = await deleteProduct(id);

        if (!isDeleted) {
            return next(new ErrorsHandler(
                PRODUCT_NOT_FOUND_TO_DELETE.message,
                NOT_FOUND,
                PRODUCT_NOT_FOUND_TO_DELETE.code,
            ));
        }

        const userInfo = await getUserByParams({id: req.userId});

        await sendMail(userInfo.dataValues.email, PRODUCT_DELETE, {
            productName: req.body.name
        });

        res.sendStatus(OK);
    },

    deleteProductPhoto: async (req, res, next) => {
        try {
            const {id} = req.params;

            const [isDeleted] = await removePhoto(PRODUCT, id);

            if (!isDeleted) {
                return next(new ErrorsHandler(
                    PHOTO_NOT_FOUND_TO_DELETE.message,
                    NOT_FOUND,
                    PHOTO_NOT_FOUND_TO_DELETE.code));
            }

            res.sendStatus(OK);
        }
        catch (e) {
            return next (new ErrorsHandler(e))
        }
    },

    updateProduct: async (req, res, next) => {
        const {id} = req.params;

        const isUpdated = await updateProduct(id, req.body);

        if (!isUpdated) {
            return next(new ErrorsHandler(
                PRODUCT_NOT_FOUND_TO_UPDATE.message,
                NOT_FOUND,
                PRODUCT_NOT_FOUND_TO_UPDATE.code
            ));
        }

        const userInfo = await getUserByParams({id: req.userId});

        await sendMail(userInfo.dataValues.email, PRODUCT_UPDATE, {
            productName: req.body.name,
        });

        res.sendStatus(OK);
    },
};
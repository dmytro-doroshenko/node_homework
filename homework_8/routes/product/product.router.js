const {Router} = require('express');

const {productController} = require('../../controllers');
const {
    checkNewProductValidity,
    checkProductToUpdateValidity,
    checkAccessToken,
    checkAvatarPhotoCount,
    checkFileTypes
} = require('../../middlewares');

const {getAllProducts, getProductByID, addNewProduct, deleteProduct, updateProduct} = productController;

const productRouter = Router();

productRouter.delete('/:id', checkAccessToken, deleteProduct);
productRouter.get('/', getAllProducts);
productRouter.get('/:id', getProductByID);
productRouter.post(
    '/',
    checkNewProductValidity,
    checkFileTypes,
    checkAvatarPhotoCount,
    checkAccessToken,
    addNewProduct
);
productRouter.put('/:id', checkProductToUpdateValidity,
    checkFileTypes,
    checkAvatarPhotoCount,
    checkAccessToken,
    updateProduct
);

module.exports = productRouter;
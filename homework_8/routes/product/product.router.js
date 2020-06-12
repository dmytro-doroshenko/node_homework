const {Router} = require('express');

const {productController} = require('../../controllers');
const {
    checkAccessToken,
    checkAccessToPhoto,
    checkAvatarPhotoCount,
    checkFileTypes,
    checkNewProductValidity,
    checkProductToUpdateValidity
} = require('../../middlewares');

const {
    addNewProduct,
    deleteProduct,
    deleteProductPhoto,
    getAllProducts,
    getProductByID,
    updateProduct
} = productController;

const productRouter = Router();

productRouter.delete('/:id', checkAccessToken, deleteProduct);
productRouter.delete('/:id/photo', checkAccessToken, checkAccessToPhoto, deleteProductPhoto);
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
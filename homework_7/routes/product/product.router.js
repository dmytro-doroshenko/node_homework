const {Router} = require('express');

const {productController} = require('../../controllers');
const {checkNewProductValidity, checkProductToUpdateValidity, checkAccessToken} = require('../../middlewares');

const {getAllProducts, getProductByID, addNewProduct, deleteProduct, updateProduct} = productController;

const productRouter = Router();

productRouter.get('/', getAllProducts);

productRouter.get('/:id', getProductByID);

productRouter.post('/', checkNewProductValidity, checkAccessToken, addNewProduct);

productRouter.put('/:id', checkProductToUpdateValidity, checkAccessToken, updateProduct);

productRouter.delete('/:id', checkAccessToken, deleteProduct);

module.exports = productRouter;
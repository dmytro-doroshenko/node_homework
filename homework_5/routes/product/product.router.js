const {Router} = require('express');

const {productController} = require('../../controllers');
const {checkNewProductValidity, checkProductToUpdateValidity} = require('../../middlewares');

const {getAllProducts, getProductByID, addNewProduct, deleteProduct, updateProduct} = productController;

const productRouter = Router();

productRouter.get('/', getAllProducts);

productRouter.get('/:id', getProductByID);

productRouter.post('/', checkNewProductValidity, addNewProduct);

productRouter.put('/:id', checkProductToUpdateValidity, updateProduct);

productRouter.delete('/:id', deleteProduct);

module.exports = productRouter;
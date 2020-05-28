const { Router } = require('express');
const { productController } = require('../../controllers');
const { getAllProducts, getProductByID, addNewProduct, deleteProduct, updateProduct } = productController;
const { checkEmptyFields, checkProductID, checkPrice } = require('../../middlewares/product');

const productRouter = Router();

productRouter.get('/', getAllProducts);

productRouter.get('/:id', getProductByID);

productRouter.post('/', checkEmptyFields, addNewProduct);

productRouter.put('/:id', checkPrice, updateProduct);

productRouter.delete('/:id', deleteProduct);

module.exports = productRouter;
const { Router } = require('express');

const productRouter = Router();
const { productController } = require('../../controllers');
const {getAllProducts, getProductByID, addNewProduct, deleteProduct, updateProduct} = productController;
const {checkEmptyFields, checkProductID} = require('../../middlewares/product')

productRouter.get('/', getAllProducts);

productRouter.get('/:id', getProductByID);

productRouter.post('/', checkEmptyFields, checkProductID, addNewProduct);

productRouter.put('/:id', updateProduct);

productRouter.delete('/:id', deleteProduct);

module.exports = productRouter;
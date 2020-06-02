const {productService} = require('../../services');

const ErrorsHandler = require('../../errors/ErrorsHandler');

module.exports = {
    getAllProducts: async (req, res) => {
        let products = await productService.getProducts();

        res.json(products);
    },

    getProductByID: async (req, res, next) => {
        const {id} = req.params;
        const productToSend = await productService.getProductByID(id);

        if (!productToSend) {
            return next(new ErrorsHandler(`Product #${id} not found`, 404));
        }

        res.json(productToSend);
    },

    addNewProduct: async (req, res, next) => {
        try {
            await productService.addProduct(req.body);
        } catch (e) {
            return next(new ErrorsHandler(e.message));
        }

        res.redirect('/products');
    },

    deleteProduct: async (req, res, next) => {
        const {id} = req.params;

        const isDeleted = await productService.deleteProduct(id);

        if (!isDeleted) {
            return next(new ErrorsHandler(`Product #${id} not found. Nothing has been deleted`, 404));
        }

        res.send(`Product #${id} was successfully deleted from database!`);
    },

    updateProduct: async (req, res, next) => {
        const {id} = req.params;

        const isUpdated = await productService.updateProduct(id, req.body);

        if (!isUpdated) {
            return next(new ErrorsHandler(`Product #${id} not found. Nothing has been updated`, 404));
        }

        res.redirect('/products');
    },
};
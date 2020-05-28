const { productService } = require('../../services')

module.exports = {
    getAllProducts: async (req, res) => {
        let products = await productService.getProducts();
        res.json(products);
    },

    getProductByID: async (req, res) => {
        const { id } = req.params;
        const productToSend = await productService.getProductByID(id);

        res.json(productToSend);
    },

    addNewProduct: async (req, res) => {
        try {
            await productService.addProduct(req.body);
        }
        catch (e) {
            res.json(e);
        }

        res.redirect('/products');
    },

    deleteProduct: async (req, res) => {
        const { id } = req.params;
        let message;

        const isDeleted = await productService.deleteProduct(id);

        isDeleted
            ? message = `Product #${id} was successfully deleted from database!`
            : message = `Product #${id} not found. Nothing has been deleted`;

        res.send(message);
    },

    updateProduct: async (req, res) => {
        const { id } = req.params;

        const isUpdated = await productService.updateProduct(id, req.body);

        isUpdated
            ? res.redirect('/products')
            : res.send(`Product #${id} not found. Nothing has been updated`);
    },
};
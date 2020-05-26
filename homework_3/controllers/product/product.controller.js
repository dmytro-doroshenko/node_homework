
const {productService} = require('../../services')

module.exports = {
    getAllProducts: async (req, res) => {
        let products = await productService.getProducts();
        res.send(products);
    },

    getProductByID: async (req, res) => {
        const {id} = req.params;
        const products = await productService.getProducts();
        const productToSend = await products.find(product => +product.id === +id);

        res.send(productToSend);
    },

    addNewProduct: async (req, res) => {
        await productService.addProduct(req.body);

        res.redirect('/products');
    },

    deleteProduct: async (req, res) => {
        const {id} = req.params;

        const products = await productService.getProducts();
        const filteredProducts = await products.filter(product => +product.id !== +id);
        await productService.truncateProducts();
        filteredProducts.forEach(product => {
           productService.addProduct(product);
        });
        res.redirect('/products');
    },

    updateProduct: async (req, res) => {
        const {id} = req.params;
        const {title, price} = req.body;
        const products = await productService.getProducts();
        await productService.truncateProducts();
        products.forEach(product => {
            if (+product.id === +id) {
                if (title) {
                    product.title = title;
                }
                if (price) {
                    product.price = price;
                }
            }
            productService.addProduct(product);
        });
        res.redirect('/products');
    },

};
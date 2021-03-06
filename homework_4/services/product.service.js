const db = require('../database').getInstance();

module.exports = {
    getProducts: async () => {
        const ProductModel = db.getModel('Product');

        const products = await ProductModel.findAll({ });

        return products;
    },
    getProductByID: async (productID) => {
        const ProductModel = db.getModel('Product');

        const product = await ProductModel.findAll({
            where: {
                id: productID,
            }
        });

        if (product.length) {
            return product;
        }
    },
    addProduct: async (product) => {
        const ProductModel = db.getModel('Product');

        await ProductModel.create(product);
    },
    deleteProduct: async (productID) => {
        const ProductModel = db.getModel('Product');

        const status = await ProductModel.destroy({
            where: {
                id: productID,
            }
        });
        return status;
    },
    updateProduct: async (productID, obj) => {
        const ProductModel = db.getModel('Product');

        const status = await ProductModel.update(obj, {
            where: {
                id: productID,
            }
        });
        return status[0];
    },
};
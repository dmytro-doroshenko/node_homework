const db = require('../database').getInstance();
const {modelNames: {PRODUCT}} = require('../constants');

module.exports = {
        addProduct: async (product) => {
        const ProductModel = db.getModel(PRODUCT);

        await ProductModel.create(product);
    },
    deleteProduct: (productID) => {
        const ProductModel = db.getModel(PRODUCT);

        return ProductModel.destroy({
            where: {
                id: productID,
            }
        });
    },
    getProducts: () => {
        const ProductModel = db.getModel(PRODUCT);

        return ProductModel.findAll({});
    },
    getProductByID: async (productID) => {
        const ProductModel = db.getModel(PRODUCT);

        const product = await ProductModel.findAll({
            where: {
                id: productID,
            }
        });

        if (product.length) {
            return product;
        }
    },
    updateProduct: async (productID, obj) => {
        const ProductModel = db.getModel(PRODUCT);

        const status = await ProductModel.update(obj, {
            where: {
                id: productID,
            }
        });
        return status[0];
    },
};
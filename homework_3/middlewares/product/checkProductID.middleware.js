const {productService} = require('../../services')

module.exports = async (req, res, next) => {
    try {
        const {id, title, price} = req.body;
        console.log('*********************');
        console.log(id, title, price);

        let products = await productService.getProducts();
        let existedProduct = products.find(product => product.id === id);

        if (existedProduct) {
            throw new Error(`Product with id ${existedProduct.id} is already exists`)
        }

        next();

    } catch (e) {
        res.render('error', {message: e.message})
    }
}
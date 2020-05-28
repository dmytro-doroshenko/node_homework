module.exports = (req, res, next) => {
    try {
        const {name, category, price} = req.body;

        if (!name || !category || !price) {
            throw new Error('All fields are required!');
        }

        next();
    } catch (e) {
        res.render('error', {message: e.message});
    }
};
module.exports = (req, res, next) => {
    try {
        const {id, title, price} = req.body;

        if (!id || !title || !price) {
            throw new Error('All fields are required!');
        }

        next();
    } catch (e) {
        res.render('error', {message: e.message});
    }
};
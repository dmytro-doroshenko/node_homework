module.exports = (req, res, next) => {
    try {
        const { price } = req.body;

        if (price && price <= 0 ) {
            throw new Error('New price is incorrect!');
        }

        next();
    } catch (e) {
        res.render('error', { message: e.message });
    }
};
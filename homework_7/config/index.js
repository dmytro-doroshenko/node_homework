module.exports = {
    // ---------- server info ----------
    PORT: process.env.PORT || 8000,
    FRONTEND_URL: process.env.FRONTEND_URL,

    // ---------- root email info ----------
    ROOT_EMAIL: process.env.ROOT_EMAIL,
    ROOT_EMAIL_HOST: process.env.ROOT_EMAIL_HOST,
    ROOT_EMAIL_PASS: process.env.ROOT_EMAIL_PASS,
    ROOT_EMAIL_PORT: process.env.ROOT_EMAIL_PORT,
    ROOT_EMAIL_SECURE: process.env.ROOT_EMAIL_SECURE,

    // ---------- links ----------
    OWU_WEBSITE: process.env.OWU_WEBSITE,
    PRODUCTS_LINK: process.env.PRODUCTS_LINK || `http://localhost:8000/products`
}
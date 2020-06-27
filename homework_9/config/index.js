module.exports = {
    // ---------- cron job info ----------
    CRON_JOB_PERIOD: process.env.CRON_JOB_PERIOD || '0 0 * * * ',

    // ---------- database info ----------
    DB_NAME: process.env.DB_NAME || 'database_name',
    DB_LOGIN: process.env.DB_LOGIN || 'root_login',
    DB_PASSWORD: process.env.DB_PASSWORD || 'root_password',
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_DIALECT: process.env.DB_DIALECT || 'mysql',
    USERS_TABLE: process.env.USERS_TABLE ||  'users_table_name',
    PRODUCTS_TABLE: process.env.PRODUCTS_TABLE || 'products_table_name',
    ROLES_TABLE: process.env.ROLES_TABLE || 'roles_table_name',
    TOKENS_TABLE: process.env.TOKENS_TABLE || 'tokens_table_name',

    // ---------- links ----------
    OWU_WEBSITE: process.env.OWU_WEBSITE,
    PRODUCTS_LINK: process.env.PRODUCTS_LINK || `http://localhost:8000/products`,

    // ---------- root email info ----------
    ROOT_EMAIL: process.env.ROOT_EMAIL,
    ROOT_EMAIL_HOST: process.env.ROOT_EMAIL_HOST,
    ROOT_EMAIL_PASS: process.env.ROOT_EMAIL_PASS,
    ROOT_EMAIL_PORT: process.env.ROOT_EMAIL_PORT,
    ROOT_EMAIL_SECURE: process.env.ROOT_EMAIL_SECURE,

    // ---------- server info ----------
    PORT: process.env.PORT || 8000,
    FRONTEND_URL: process.env.FRONTEND_URL,

    // ---------- tokens ---------
    JWT_ACCESS_LIFETIME: process.env.JWT_ACCESS_LIFETIME || '10m',
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || "secretWord",
    JWT_BLA_BLA: process.env.JWT_BLA_BLA || 'any_text',
    JWT_REFRESH_LIFETIME: process.env.JWT_REFRESH_LIFETIME || '12h',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'secret2',
};
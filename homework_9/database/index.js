const Sequelize = require('sequelize');
const {readdir} = require('fs');
const {join} = require('path');

const {DB_NAME, DB_LOGIN, DB_PASSWORD, DB_HOST, DB_DIALECT} = require('../config');

module.exports = (() => {
    let instance;

    function initConnection() {
        const client = new Sequelize(DB_NAME, DB_LOGIN, DB_PASSWORD, {
            host: DB_HOST,
            dialect: DB_DIALECT,
        });

        let models = {};

        function getModels() {
            const modelsDir = join(process.cwd(), 'database', 'models');

            readdir(modelsDir, (err, files) => {
                files.forEach(file => {
                    const [modelName] = file.split('.');
                    models[modelName] = client.import(join(modelsDir, modelName));
                });
            });
        }

        return {
            setModels: () => getModels(),
            getModel: (modelName) => models[modelName],
        }
    }

    return {
        getInstance: () => {
            if (!instance) {
                instance = initConnection();
            }

            return instance;
        }
    }
})();
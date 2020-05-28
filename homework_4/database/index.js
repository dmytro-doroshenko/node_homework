const Sequelize = require('sequelize');
const { readdir } = require('fs');
const { join } = require('path');

module.exports = (() => {
    let instance;

    function initConnection() {
        const client = new Sequelize('node_js_market', 'root', 'root', {
            host: 'localhost',
            dialect: 'mysql',
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
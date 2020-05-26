const {readFile, appendFile, truncate} = require('fs');
const path = require('path');

const productsPath = path.join(process.cwd(), 'productsList.txt');

class ProductService {
    getProducts() {
        let productsList = [];

        return new Promise((resolve, reject) => {
            readFile(productsPath, (error, productsJSON) => {
                if (error) {
                    reject('Can\'t read file!');
                }

                let productsListJSON = productsJSON.toString().split('\n');

                productsListJSON.forEach(jsonProduct => {
                    if (!jsonProduct) {
                        return;
                    }
                    productsList.push(JSON.parse(jsonProduct))
                });
                resolve(productsList);
            });
        });
    };

    addProduct(product) {
        const productToPush = JSON.stringify(product);

        return new Promise((resolve, reject) => {
            appendFile(productsPath, `\n${productToPush}`, (err) => {
                if (err) {
                    reject('Can\'t add product');
                }
                resolve();
            });
        });
    };

    truncateProducts() {
        return new Promise( (resolve, reject) => {
            truncate(productsPath, err => {
                if (err) {
                    reject('Can\'t truncate file!');
                }
                resolve();
            });
        });
    };
}

module.exports = new ProductService;
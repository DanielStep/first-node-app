const fs = require('fs');
const path = require('path');

const pth = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'products.json'
);

const getProductsFromFile = (callback) => {
    fs.readFile(pth, (err, fileContent) => {
        if(err) {
            callback([]);
        }else{
            callback(JSON.parse(fileContent));
        }
    });
};


module.exports = class Product {
    constructor(title, imageUrl, description, price) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        getProductsFromFile((products) =>{
            products.push(this);
            fs.writeFile(pth, JSON.stringify(products), (err) =>{
                console.log(err);
            });
        });
    }

    static fetchAll(callback) {
        getProductsFromFile(callback);
    }

};
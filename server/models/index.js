const db = require('../db');

// constructor
const Product = (product) => {
    this.id = product.id;
    this.name = product.name;
    this.slogan = product.slogan;
    this.description = product.description;
    this.category = product.category;
    this.default_price = product.default_price;
};

// methods
Product.findById = (product_id, result) => {
    db.query(`SELECT name FROM product WHERE id = ${product_id}`, (err, data) => {
        if (err) {
            console.log('error in product find by id', err);
            result(err, null);
            return;
        }
    
        if (data.length) {
            console.log('product name found!', data);
            result(null, data);
            return;
        }

        // product name not found
        result('not found', null);
    })
};

module.exports = Product;
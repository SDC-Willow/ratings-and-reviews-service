module.exports = app => {
    const products = require('../controllers/index.js');

    // find product name
    app.get('/product', products.findOne);
}

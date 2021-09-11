module.exports = app => {
    // const products = require('../controllers/index.js');
    const reviews = require('../controllers/index.js');

    // find product name
    // app.get('/product', products.findOne);
    app.get('/reviews', reviews.findAllReviews);
    app.get('/reviews/meta');
    app.post('/reviews', reviews.create);
    app.put('/reviews/helpful', reviews.updateHelpfulness);
    app.put('/reviews/report', reviews.updateReported);
}

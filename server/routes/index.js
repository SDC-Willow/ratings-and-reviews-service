module.exports = app => {
    // const products = require('../controllers/index.js');
    const reviews = require('../controllers/index.js');

    // find product name
    // app.get('/product', products.findOne);
    app.get('/reviews', reviews.findAllReviews);
    app.get('/reviews/meta');
    app.post('/reviews');
    app.put('/reviews/:review_id/helpful');
    app.put('/reviews/:review_id/report');
}

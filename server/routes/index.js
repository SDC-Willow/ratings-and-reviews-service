const redis = require('redis');
require('dotenv').config();
const client = redis.createClient({
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379
});
client.on('error', err => {
    console.log('Error ' + err);
});
client.on('ready', function() {
    console.log('redis is running');
});

// cache middleware
function cache(req, res, next) {
    const { product_id } = req.query;
    client.get(product_id, (err, data) => {
        if (err) {
            console.log('error in cache middleware', err);
        }
        if (data !== null) {
            console.log('👻');
            res.send(JSON.parse(data));
        } else {
            next();
        }
    });
};

module.exports = app => {
    const reviews = require('../controllers/index.js');

    app.get('/reviews', reviews.findAllReviews);
    app.get('/reviews/meta', cache, reviews.findMetaData);
    app.post('/reviews', reviews.create);
    app.put('/reviews/helpful', reviews.updateHelpfulness);
    app.put('/reviews/report', reviews.updateReported);
}

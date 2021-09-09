const Product = require('../models/index.js');
const Review = require('../models/index.js');
const {reviewsShaper, photosShaper, photosGatherer} = require('../shapers/reviews.js');

exports.findOne = (req, res) => {
    Product.findById(req.query.product_id, (err, data) => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.status(200).send(data);
        }
    });
};

exports.findAllReviews = (req, res) => {
    Review.findAll(req.query.product_id, req.query.page, req.query.count, (err, data) => {
        if (err) {
            res.status(400).send(err);
        } else {
            const response = photosShaper(reviewsShaper(data, req.query.product_id, req.query.page, req.query.count));
            res.status(200).send(photosGatherer(response));
        }
    });
};
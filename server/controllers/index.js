const Review = require('../models/index.js');
const {reviewsShaper, photosShaper, photosGatherer} = require('../shapers/reviews.js');
const metaShaper = require('../shapers/metadata.js');

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

exports.findMetaData = (req, res) => {
    Review.findMetaData(req.query.product_id, (err, data) => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.status(200).send(metaShaper(data, req.query.product_id));
        }
    });
};

exports.create = (req, res) => {
    Review.create(req.body.product_id, req.body.rating, req.body.summary, req.body.body, req.body.recommend, req.body.name, req.body.email, req.body.photos, req.body.characteristics, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    });
};

exports.updateHelpfulness = (req, res) => {
    Review.updateHelpfulness(req.query.review_id, (err, data) => {
        if (err) {
            console.log('error in updating helpful controllers', err);
            res.status(500).send('error in updating helpful controllers', err);
        } else {
            console.log('helpfulness updated!!', data);
            res.status(204).send('this review has been marked as helpful!');
        }
    });
};

exports.updateReported = (req, res) => {
    Review.updateReported(req.query.review_id, (err, data) => {
        if (err) {
            console.log('error in updating reported controllers', err);
            res.status(500).send('error in updating reported controllers', err);
        } else {
            console.log('reported updated!!', data);
            res.status(204).send('your review has been successfully reported');
        }
    });
};
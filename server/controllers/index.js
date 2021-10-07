const Review = require('../models/index.js');
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
const {reviewsShaper, photosShaper, photosGatherer} = require('../shapers/reviews.js');
const metaShaper = require('../shapers/metadata.js');

exports.findAllReviews = (req, res) => {
    // const product_id = req.query.product_id;
    Review.findAll(req.query.product_id, req.query.page, req.query.count, (err, data) => {
        if (err) {
            res.status(400).send(err);
        } else {
            const response = photosGatherer(photosShaper(reviewsShaper(data, req.query.product_id, req.query.page, req.query.count)));
            // save/set data to redis
            // console.log('🤡');
            // client.set(product_id, JSON.stringify(response));
            res.status(200).send(response);
        }
    });
};

exports.findMetaData = (req, res) => {
    const product_id = req.query.product_id;
    Review.findMetaData(req.query.product_id, (err, data) => {
        if (err) {
            res.status(400).send(err);
        } else {
            console.log('🧠');
            const response = metaShaper(data, req.query.product_id);
            // save/set data to redis
            client.set(product_id, JSON.stringify(response));
            res.status(200).send(response);
        }
    });
};

exports.create = (req, res) => {
    Review.create(req.body.product_id, req.body.rating, req.body.summary, req.body.body, req.body.recommend, req.body.name, req.body.email, req.body.photos, req.body.characteristics, (err, data) => {
        if (err) {
            console.log('error', err);
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
            res.status(500).send(err);
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
            res.status(500).send(err);
        } else {
            console.log('reported updated!!', data);
            res.status(204).send('your review has been successfully reported');
        }
    });
};
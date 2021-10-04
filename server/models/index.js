const { result } = require('lodash');
const db = require('../db');
const {arrayToQueryConverter, objectToQueryConverter} = require('../shapers/reviews_create.js');

// constructor
const Review = (review) => {
    this.review_id = review.review_id;
    this.rating = review.rating;
    this.summary = review.summary;
    this.recommend = review.recommend;
    this.response = review.response;
    this.body = review.body;
    this.date = review.date;
    this.reviewer_name = review.reviewer_name;
    this.helpfulness = review.helpfulness;
    this.photos = review.photos;
};

// methods
Review.findAll = (product_id, page, count, result) => {
    db.query(`SELECT reviews.id AS review_id, reviews.rating, reviews.summary, reviews.recommend, reviews.response, reviews.body, reviews.date, reviews.reviewer_name, reviews.helpfulness, reviews_photos.id, reviews_photos.url FROM reviews LEFT JOIN reviews_photos ON reviews.id = reviews_photos.review_id  WHERE reviews.product_id = ${product_id}`, (err, data) => {
        if (err) {
            console.log('error in review.findall models', err);
            result(err, null);
            return;
        }
    
        if (data.length) {
            // console.log('reviews found!', data);
            result(null, data);
            return;
        }
        // reviews not found
        result('reviews not found', null);
    });
};

Review.findMetaData = (product_id, result) => {
    db.query(`select reviews.id as review_id, reviews.rating as ratings, reviews.recommend as recommended, JSON_ARRAYAGG(characteristics.name) AS name, JSON_OBJECTAGG(characteristic_reviews.characteristic_id, characteristic_reviews.value) AS characteristics FROM reviews JOIN characteristics ON reviews.product_id = characteristics.product_id JOIN characteristic_reviews ON characteristics.id = characteristic_reviews.characteristic_id where reviews.product_id = ${product_id} GROUP BY reviews.id;`, (err, data) => {
        if (err) {
            console.log('error in findmetadata models', err);
            result(err, null);
        } else {
            // console.log('meta data found!', data);
            result(null, data);
        }
    });
};

Review.create = (product_id, rating, summary, body, recommend, username, email, photos, characteristics, result) => {
    recommend = recommend === 'true' ? 1 : 0;
    console.log('🤢', product_id)
    db.query(`SELECT MAX(id) + 1 FROM reviews`, (err, res) => {
        if (err) {
            res(err, null);
        } else {
            let id = Object.values(res[0])[0];
            console.log('🥵')
            db.beginTransaction(`INSERT INTO reviews(product_id, rating, summary, body, recommend, reviewer_name, reviewer_email) VALUES('${product_id}', '${rating}', '${summary}', '${body}', '${recommend}', '${username}', '${email}');`, (err) => {
                if (err) {
                    console.log('error first query', err);
                } else {
                    console.log('🤯')
                    db.query(`SET FOREIGN_KEY_CHECKS=0;`, (err) => {
                        if (err) {
                            console.log('error in set foreign key', err);
                        } else {
                            db.query(`INSERT INTO reviews_photos(review_id, url) VALUES${arrayToQueryConverter(photos, id)};`, (err) => {
                                if (err) {
                                    console.log('error in second query', err);
                                } else {
                                    console.log('😵‍💫')
                                    db.query(`INSERT INTO characteristic_reviews(characteristic_id, review_id, value) VALUES${objectToQueryConverter(characteristics, id)};`, (err, res) => {
                                        if (err) {
                                            console.log('error in third query', err);
                                            result(err, null);
                                        } else {
                                            console.log('created the review!!!!!');
                                            result(null, res);
                                        }
                                    })
                                }
                            });
                        }
                    });
                }
            });  
        }
    });
};  

Review.updateHelpfulness = (review_id, result) => {
    db.query(`UPDATE reviews SET helpfulness = helpfulness+1 WHERE id = ${review_id}`, (err, res) => {
        if (err) {
            console.log('error in updating helpfulness models', err);
            result(err, null);
        } else {
            console.log('helpfulness updated!');
            result(null, res);
        }
    });
};

Review.updateReported = (review_id, result) => {
    db.query(`UPDATE reviews SET reported = true WHERE id = ${review_id}`, (err, res) => {
        if (err) {
            console.log('error in updating reported models', err);
            result(err, null);
        } else {
            console.log('report updated!');
            result(null, res);
        }
    });
};

module.exports = Review;

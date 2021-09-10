const db = require('../db');

// constructor
// const Product = (product) => {
//     this.id = product.id;
//     this.name = product.name;
//     this.slogan = product.slogan;
//     this.description = product.description;
//     this.category = product.category;
//     this.default_price = product.default_price;
// };

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

// const Meta = (meta) => {
//     this.product_id = meta.product_id;
//     this.ratings = meta.ratings;
//     this.recommended = meta.recommended;
// }

// methods
// Product.findById = (product_id, result) => {
//     db.query(`SELECT name FROM product WHERE id = ${product_id}`, (err, data) => {
//         if (err) {
//             console.log('error in product find by id', err);
//             result(err, null);
//             return;
//         }
    
//         if (data.length) {
//             console.log('product name found!', data);
//             result(null, data);
//             return;
//         }

//         // product name not found
//         result('not found', null);
//     });
// };

Review.findAll = (product_id, page, count, result) => {
    db.query(`SELECT reviews.id AS review_id, reviews.rating, reviews.summary, reviews.recommend, reviews.response, reviews.body, reviews.date, reviews.reviewer_name, reviews.helpfulness, reviews_photos.id, reviews_photos.url FROM reviews LEFT JOIN reviews_photos ON reviews.id = reviews_photos.review_id  WHERE reviews.product_id = ${product_id}`, (err, data) => {
        if (err) {
            console.log('error in review.findall models', err);
            result(err, null);
            return;
        }
    
        if (data.length) {
            console.log('reviews found!', data);
            result(null, data);
            return;
        }

        // product name not found
        result('reviews not found', null);
    });
};

// Meta.findAll = (product_id) => {
//     // db.query()
// }

// module.exports = Product;
module.exports = Review;
// module.exports = Meta;

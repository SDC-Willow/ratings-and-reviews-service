const Product = require('../models/index.js');

exports.findOne = (req, res) => {
    Product.findById(req.query.product_id, (err, data) => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.status(200).send(data);
        }
    })
};
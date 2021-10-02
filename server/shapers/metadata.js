const _ = require('lodash');

const metaShaper = (jsonArray, product_id) => {
    let result = {
        product_id: product_id,
        ratings: ratingsShaper(jsonArray),
        recommended: recommendedShaper(jsonArray),
        characteristics: characteristicsShaper(jsonArray)
    };
    return result;
};

const ratingsShaper = (jsonArray) => {
    let ratings = {};
    for (let i = 0; i < jsonArray.length; i++) {
        if (ratings[jsonArray[i].ratings] === undefined) {
            ratings[jsonArray[i].ratings] = 1;
        } else {
            ratings[jsonArray[i].ratings]++;
        }
    }
    return ratings;
};

const recommendedShaper = (jsonArray) => {
    let recommended = {
        false: 0,
        true: 0
    };
    for (let i = 0; i < jsonArray.length; i++) {
        if (jsonArray[i].recommended === 1) {
            recommended.true++;
        } else if (jsonArray[i].recommended === 0) {
            recommended.false++;
        }
    }
    return recommended;
};

const characteristicsShaper = (jsonArray) => {
    let characteristics = {};
    let names = _.uniq(jsonArray[0].name);
    let charsRatings = jsonArray[0].characteristics;
    for (let i = 0; i < names.length; i++) {
        const capitalized = names[i].charAt(0).toUpperCase() + names[i].slice(1);
        characteristics[capitalized] = {
            id: Object.keys(charsRatings)[i],
            value: Object.values(charsRatings)[i]
        };
    }
    return characteristics;
};

module.exports = metaShaper;
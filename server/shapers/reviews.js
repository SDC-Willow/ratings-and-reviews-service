const _ = require('lodash');

const reviewsShaper = (json, product_id, page, count) => {
    let data = {
        product: '',
        page: 0,
        count: 0,
        results: []
    };

    data.product = product_id;
    data.page = page;
    data.count = count;
    data.results = json;

    return data;
};

const photosShaper = (json) => {
    json.results.map((element) => {
        if (element.response === 'null') {
            element.response = '';
        }
        if (element.id === null) {
            element.photos = [];
        } else {
            element.photos = [{id: element.id, url: element.url}];
        }
        delete element.id;
        delete element.url;
        return element;
    });
    return json;
};

const photosGatherer = (json) => {
    let tracker = [];
    let indicesTracker = [];
    for (let i = 1; i < json.results.length; i++) {
        if (json.results[i].review_id === json.results[i - 1].review_id) {
            tracker.push(json.results[i - 1], json.results[i]);
            indicesTracker.push(i - 1, i);
        }
    }
    if (tracker.length === 0) {
        return json;
    }
    let reducedObject = {
        review_id: _.uniq(tracker)[0].review_id,
        rating: _.uniq(tracker)[0].rating,
        summary: _.uniq(tracker)[0].summary,
        recommend: _.uniq(tracker)[0].recommend,
        response: _.uniq(tracker)[0].response,
        body: _.uniq(tracker)[0].body,
        date: _.uniq(tracker)[0].date,
        reviewer_name: _.uniq(tracker)[0].reviewer_name,
        helpfulness: _.uniq(tracker)[0].helpfulness
    };
    let allPhotos = [];
    for (let i = 0; i < _.uniq(tracker).length; i++) {
        allPhotos = allPhotos.concat(_.uniq(tracker)[i].photos);
    }
    reducedObject.photos = allPhotos;
    json.results.splice(_.uniq(indicesTracker)[0], _.uniq(indicesTracker)[_.uniq(indicesTracker).length - 1] - _.uniq(indicesTracker)[0] + 1, reducedObject);
    return json.results;
}

module.exports = {reviewsShaper, photosShaper, photosGatherer};
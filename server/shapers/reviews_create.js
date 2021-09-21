const arrayToQueryConverter = (arrayOfUrls, review_id) => {
    // this fct will take an array of urls and a review_id, and will return a string of the values that will be inserted into the table, the string will be shaped like so: '(review_id, array[0]), (review_id, array[1]), .....'

    let result = ``;
    for (let i = 0; i < arrayOfUrls.length; i++) {
        if (i === arrayOfUrls.length - 1) {
            result += `('${review_id}', '${arrayOfUrls[i]}')`;
            return result;
        }
        result += `('${review_id}', '${arrayOfUrls[i]}'), `;
    }
    return result;
};

const objectToQueryConverter = (characteristics, review_id) => {
    // this function will take an object and return a string of values that will be inserted to the table. the object will be like {char_id: value, char_id: value...} and the output will be like '(char_id, review_id, value), (char_id, review_id, value) ...'

    let result = ``;
    for (let key in characteristics) {
        if (key === Object.keys(characteristics)[Object.keys(characteristics).length - 1]) {
            result += `('${key}', '${review_id}', '${characteristics[key]}')`;
            return result;
        }
        result += `('${key}', '${review_id}', '${characteristics[key]}'), `;
    }
    return result;
};

module.exports = {arrayToQueryConverter, objectToQueryConverter};

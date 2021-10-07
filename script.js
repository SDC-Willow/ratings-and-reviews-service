import {sleep} from 'k6';
import http from 'k6/http';

export let options = {
    stages: [
        {duration: '30m', target: 100}
    ]
};

export default () => {
    http.get(`http://ec2-18-117-155-237.us-east-2.compute.amazonaws.com:3000/reviews/meta?product_id=${Math.floor(Math.random() * (1000011 - 900009 + 1)) + 900009}`);
    sleep(1);
}

// k6 run script.js
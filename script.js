import {sleep} from 'k6';
import http from 'k6/http';

export let options = {
    stages: [
        {duration: '1m', target: 1000},
        // {duration: '2m', target: 100},
        // {duration: '5m', target: 200},
        // {duration: '5m', target: 300},
        // {duration: '2m', target: 400}
    ]
};

export default () => {
    http.get('http://localhost:3000/reviews?product_id=50');
    sleep(1);
}

// k6 run script.js
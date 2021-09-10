const { expect } = require('chai');
const chai = require('chai');
const request = require('supertest')('http://localhost:3000/reviews');
// const app = require('../server/index.js');
// const test = require('./test_data.js');
// const chaiHttp = require('chai-http');
// const db = require('../server/db/index.js');
// const shapers = require('../server/shapers/reviews.js');

// chai.use(chaiHttp);

describe('GET /reviews/', () => {
    it('responds with json', async function () {
        const response = await request.get('/reviews');
        expect(response.status).to.eql(404);
        console.log(response);
        // expect(response.body).to.eql([2,3,8,7]);
    });
});
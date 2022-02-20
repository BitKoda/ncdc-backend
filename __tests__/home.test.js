const request = require('supertest');
const app = require('../app.js');

describe.only("GET /api", () => {
  it("returns a JSON document containing information on each endpoint", () => {
    return request(app)
      .get('/api')
      .expect(200)
      .then((res) => {
        const data = res.body;
        expect(Object.keys(data).length).toBe(8);
      });
  });
});


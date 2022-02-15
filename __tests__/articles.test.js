const request = require('supertest');
const app = require('../app.js');
const connection = require('../db/connection.js');

const seed = require('../db/seeds/seed.js');
const data = require('../db/data/test-data/index')

//const {
// articleData,
//} = require("../db/data/test-data/articles");


beforeEach(() => seed(data));
afterAll(() => connection.end());

describe("GET /api/articles/:id ", () => {
  it("status 200: returns a valid article", () => {
    return request(app)
      .get('/api/articles/1')
      .expect(200)
      .then(({body}) => {
        expect(body.article).toEqual(expect.objectContaining({
          article_id: expect.any(Number),
          title: expect.any(String),
          topic: expect.any(String),
          author: expect.any(String),
          body: expect.any(String),
          created_at: expect.any(String),
          votes: expect.any(Number)
        }))
        });
      });
  it("status 400: returns 'bad request' when passed an invalid id", () => {
    return request(app)
      .get('/api/articles/not-a-valid-id')
      .expect(400)
      .then(({body: {msg}}) => {
        expect(msg).toBe("bad request");
      });
  });
  it("status 404: returns a 404 error when passed properly formed url, but does not exist in database", () => {
    return request(app)
      .get('/api/articles/999')
      .expect(404)
      .then(({body: {msg}}) => {
        expect(msg).toBe("article not found");
      });
  });
});


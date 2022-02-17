const request = require('supertest');
const app = require('../app.js');
const connection = require('../db/connection.js');

const seed = require('../db/seeds/seed.js');
const data = require('../db/data/test-data/index')

const {
  topicData,
} = require("../db/data/test-data/topics");


beforeEach(() => seed(data));
afterAll(() => connection.end());

describe("GET /api/topics: ", () => {
  it("returns an array, length 3, of topics that each include a slug and description", () => {
    return request(app)
      .get('/api/topics')
      .expect(200)
      .then((res) => {
        const topics = res.body.topics;
        expect(topics).toHaveLength(3);
        topics.forEach((topic) => {
          expect(topic).toEqual(expect.objectContaining({
            slug: expect.any(String),
            description: expect.any(String),
          }));
        });
      });
  });
});


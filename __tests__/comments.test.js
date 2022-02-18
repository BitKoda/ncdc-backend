const request = require('supertest');
const app = require('../app.js');
const connection = require('../db/connection.js');

const seed = require('../db/seeds/seed.js');
const data = require('../db/data/test-data/index')

beforeEach(() => seed(data));
afterAll(() => connection.end());

describe('DELETE /api/comments/:comment_id', () => {
  test('status:204, responds with an empty response body', () => {
    return request(app).delete('/api/comments/18').expect(204);
  });
});


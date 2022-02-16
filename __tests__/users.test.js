const request = require('supertest');
const app = require('../app.js');
const connection = require('../db/connection.js');

const seed = require('../db/seeds/seed.js');
const data = require('../db/data/test-data/index')

beforeEach(() => seed(data));
afterAll(() => connection.end());

describe("GET /api/users", () => {
  it("returns an array, length 4, of user objects that include a username", () => {
    return request(app)
      .get('/api/users')
      .expect(200)
      .then(({body}) => {
        const users = body.users;
        expect(users).toHaveLength(4);
        users.forEach((user) => {
          expect(user).toEqual(expect.objectContaining({
            username: expect.any(String),
          }));
        });
      });
  });
  it("returns a 404 error when passed incorrect url", () => {
    return request(app)
      .get('/api/userz')
      .expect(404)
      .then(({body}) => {
        expect(body.msg).toBe("path not found");
      });
  });
});


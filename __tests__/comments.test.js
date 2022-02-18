const request = require('supertest');
const app = require('../app.js');
const connection = require('../db/connection.js');

const seed = require('../db/seeds/seed.js');
const data = require('../db/data/test-data/index')

beforeEach(() => seed(data));
afterAll(() => connection.end());

describe("POST /api/articles/:article_id/comments", () => {
  it('status:201, responds with a comment created on an article', () => {
    const newComment = {
      article_id: 2,
      comment_id: 19,
      author: 'icellusedkars',
      body: 'The quick brown fox jumps over the lazy dog.'
    };
    return request(app)
      .post('/api/articles/2/comments')
      .send(newComment)
      .expect(201)
      .then(({ body: { comment }}) => {
          expect(comment).toEqual(expect.objectContaining({
            article_id: expect.any(Number),
            comment_id: expect.any(Number),
            author: expect.any(String),
            body: expect.any(String),
            created_at: expect.any(String),
      }));
    });
  });
  it('status 400: comment not created', () => {
    const badComment = {
      article_id: 2,
      comment_id: 19,
      // no author
      body: 'The quick brown fox jumps over the lazy dog.'
    };
    return request(app)
      .post('/api/articles/2/comments')
      .send(badComment)
      .expect(400)
      .then(({body: {msg}}) => {
        expect(msg).toBe('bad request') // would prefer 'comment not created!'
      }); // can do that with a Promise.reject in model... a refactor for later!
  });
});


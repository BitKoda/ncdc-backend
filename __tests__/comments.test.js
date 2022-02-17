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
      author: 'icellusedkars',
      body: 'The quick brown fox jumps over the lazy dog.'
    };
    return request(app)
      .post('/api/articles/2/comments')
      .send(newComment)
      .expect(201)
      .then(({ body: { comment }}) => {
        console.log(comment, "<<<<========== TEST")
        expect(comment).toEqual({
          article_id: 2,
          comment_id: 19,
          //created_at: TIMESTAMP,
          votes: 0,
          ...newComment,
        });
      });
  });
});


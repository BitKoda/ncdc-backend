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
    //const timestamp = new Date().toISOString();
    return request(app)
      .post('/api/articles/2/comments')
      .send(newComment)
      .expect(201)
      .then(({ body: { comment }}) => {
        expect(comment.article_id).toBe(newComment.article_id);
        expect(comment.comment_id).toBe(newComment.comment_id);
        expect(comment.author).toBe(newComment.author);
        expect(comment.body).toBe(newComment.body);
        //expect(comment).toEqual({
        //  article_id: 2,
        //  comment_id: 19,
        //  created_at: new Date().toISOString(), //timestamp,
        //  votes: 0,
        //  ...newComment,
        //});
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
      });
  });
});


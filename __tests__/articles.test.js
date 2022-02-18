const request = require('supertest');
const app = require('../app.js');
const connection = require('../db/connection.js');

const seed = require('../db/seeds/seed.js');
const data = require('../db/data/test-data/index')

beforeEach(() => seed(data));
afterAll(() => connection.end());

describe("GET /api/articles", () => {
  it("status 200: responds with an array of articles sorted on created_at DESC by default", () => {
    return request(app)
      .get('/api/articles')
      .expect(200)
      .then(({body: {articles}}) => {
        expect(articles).toBeInstanceOf(Array);
        expect(articles).toHaveLength(12);
        expect(articles).toBeSortedBy('created_at', { descending: true });
        articles.forEach((article) => {
          expect(article).toEqual(expect.objectContaining({
            article_id: expect.any(Number),
            author: expect.any(String),
            title: expect.any(String),
            topic: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
          }));
        });
      });
  });
  it("status 200: returns an array of articles, each article includes comment_count", () => {
    return request(app)
      .get('/api/articles')
      .expect(200)
      .then(({body}) => {
        const { articles } = body;
        expect(articles).toBeInstanceOf(Array);
        expect(articles).toHaveLength(12);
        articles.forEach((article) => {
          expect(article).toEqual(
            expect.objectContaining({
              article_id: expect.any(Number),
              title: expect.any(String),
              topic: expect.any(String),
              author: expect.any(String),
              body: expect.any(String),
              created_at: expect.any(String),
              votes: expect.any(Number),
              comment_count: expect.any(String)
          }))
        })
      })
  })
});

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
  it("status 200: returns article id=1 with a comment_count of 11", () => {
    return request(app)
      .get('/api/articles/1')
      .expect(200)
      .then(({body}) => {
        expect(body.article.comment_count).toBe("11");
        expect(body.article).toEqual(expect.objectContaining({
          article_id: expect.any(Number),
          title: expect.any(String),
          topic: expect.any(String),
          author: expect.any(String),
          body: expect.any(String),
          created_at: expect.any(String),
          votes: expect.any(Number),
          comment_count: expect.any(String)
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

describe("GET /api/articles/:article_id/comments", () => {
  it("status 200: returns an array of 11 comments associated article 1", () => {
    return request(app)
      .get('/api/articles/1/comments')
      .expect(200)
      .then(({body: {comments}}) => {
        expect(comments).toHaveLength(11);
      });
  });
  it("status 200: returns an empty array for an article 2, which has no comments", () => {
    return request(app)
      .get('/api/articles/2/comments')
      .expect(200)
      .then(({body: {comments}}) => {
        expect(comments).toHaveLength(0);
      });
  });
  it("status 400: returns 'bad request' when passed 'not-a-valid-id' as id", () => {
    return request(app)
      .get('/api/articles/not-a-valid-id/comments')
      .expect(400)
      .then(({body: {msg}}) => {
        expect(msg).toBe("bad request");
      });
  });
  it("status 404: when passed a valid id (99), but it does not exist in database", () => {
    return request(app)
      .get('/api/articles/99/comments')
      .expect(404)
      .then(({body: {msg}}) => {
        expect(msg).toBe("article not found");
      });
  });
});

describe('PATCH /api/articles/:article_id', () => {
  it('status 200: responds with the updated article with vote count increased by 1', () => {
    const articleUpdates = { inc_votes: 1 };
    return request(app)
      .patch('/api/articles/1')
      .send(articleUpdates)
      .expect(200)
      .then(({ body }) => {
        expect(body.article).toEqual({
          article_id: 1,
          title: "Living in the shadow of a great man",
          topic: "mitch",
          author: "butter_bridge",
          body: "I find this existence challenging",
          created_at: "2020-07-09T20:11:00.000Z",
          votes: 101,
        });
      });
   });
  it('status 200: responds with the updated article with vote count decreased by 100', () => {
    const articleUpdates = { inc_votes: -100 };
    return request(app)
      .patch('/api/articles/1')
      .send(articleUpdates)
      .expect(200)
      .then(({ body }) => {
        expect(body.article).toEqual({
          article_id: 1,
          title: "Living in the shadow of a great man",
          topic: "mitch",
          author: "butter_bridge",
          body: "I find this existence challenging",
          created_at: "2020-07-09T20:11:00.000Z",
          votes: 0,
        });
      });
  });
  it('status 400: responds with bad request with vote is not a number', () => {
    const articleUpdates = { inc_votes: "string" };
    return request(app)
      .patch('/api/articles/1')
      .send(articleUpdates)
      .expect(400)
      .then(({body: {msg}}) => {
        expect(msg).toBe("bad request");
      });
  });
  it('status 400: responds with bad request when passed invalid article_id', () => {
    const articleUpdates = { inc_votes: 1 };
    return request(app)
      .patch('/api/articles/invalid-id')
      .send(articleUpdates)
      .expect(400)
      .then(({body: {msg}}) => {
        expect(msg).toBe("bad request");
      });
  });
  it('status 400: responds with bad request when passed a valid article_id without inc_votes property', () => {
    const articleUpdates = {};
    return request(app)
      .patch('/api/articles/1')
      .send(articleUpdates)
      .expect(400)
      .then(({body: {msg}}) => {
        expect(msg).toBe("bad request");
      });
  });
  it('status 404: respond with article not found when passed an id that does not exist', () => {
    const articleUpdates = { inc_votes: 1 };
    return request(app)
      .patch('/api/articles/99')
      .send(articleUpdates)
      .expect(404)
      .then(({body: {msg}}) => {
        expect(msg).toBe("article not found");
      });
  });
});


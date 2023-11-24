const request = require('supertest');
const db = require('../db/connection')
const app = require('../app');
const seed = require('../db/seeds/seed');
const data = require('../db/data/test-data/index');

beforeEach(() => {
    return seed(data);
});
afterAll(() => {
    return db.end();
});

describe('GET /api/notARoute', () => {
    test('should return a 404 status code when request made to a non-existant route', () => {
        return request(app)
        .get('/api/topicsz')
        .expect(404)
        .then(({ body }) => {
            expect(body.msg).toBe('Not Found!')
        })
    });
});
describe('GET /api/topics', () => {
    test('should return 200 OK status code and a body of all topics', () => {
        return request(app)
        .get('/api/topics')
        .expect(200)
        .then(({ body }) => {
            expect(body).toMatchObject({'topics':[
                {
                  description: 'The man, the Mitch, the legend',
                  slug: 'mitch'
                },
                {
                  description: 'Not dogs',
                  slug: 'cats'
                },
                {
                  description: 'what books are made of',
                  slug: 'paper'
                }]})
        })
    });
});
describe('GET /api', () => {
    test('should return 200 OK status code and an object of all available endpoints', () => {
        return request(app)
        .get('/api')
        .expect(200)
        .then(({ body }) => {
            expect(body).toMatchObject({endpoints: {
                "GET /api": {},
                "GET /api/topics": {},
                "GET /api/articles": {}
            }})
        })
    });
});
describe('GET /api/articles', () => {
    test('should return 200 OK status, and an array of all articles (as objects)--with a default sort order of date, descending', () => {
        return request(app)
        .get('/api/articles')
        .expect(200)
        .then(({ body }) => {
            expect(body.length).toBe(13)
            expect(body).toBeSorted({ descending: true, key: 'created_at'})
        })
    });
});
describe('GET /api/articles/:article_id', () => {
    test('should return 200 OK status and an article object by id', () => {
        return request(app)
        .get('/api/articles/11')
        .expect(200)
        .then(({ body }) => {
            expect(body).toMatchObject({article: {
                article_id: 11,
                title: "Am I a cat?",
                topic: "mitch",
                author: "icellusedkars",
                body: "Having run out of ideas for articles, I am staring at the wall blankly, like a cat. Does this make me a cat?",
                article_img_url:
                  "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
                votes: 0,
                created_at: '2020-01-15T22:21:00.000Z'
              }})
        })
    });
    test('should return 404 Not Found status when request to a non-existent article', () => {
        return request(app)
        .get('/api/articles/9000')
        .expect(404)
        .then(({ body }) => {
            expect(body.msg).toBe('Not Found!')
        })
    });
    test('should return 400 Bad Request status when request to article_id made by anything other than a number', () => {
        return request(app)
        .get('/api/articles/banana')
        .expect(400)
        .then(({ body }) => {
            expect(body).toEqual({code: '22P02', msg: 'Bad Request'})
        })
    });
});
describe('GET /api/articles/:article_id/comments', () => {
    test('should return 200 OK status and an array of all comments for a specific article, sorted in descending order by created_at', () => {
        return request(app)
        .get('/api/articles/1/comments')
        .expect(200)
        .then(({ body }) => {
            expect(body.comments).toBeSorted({ descending: true, key: 'created_at' })
            expect(body.comments.length).toBe(11)
            body.comments.forEach((obj) => {
                expect(Object.keys(obj)).toMatchObject(['comment_id', 'body', 'article_id', 'author', 'votes', 'created_at'])
            })
        })
    });
    test('should return 200 OK and an empty array for an article with no comments', () => {
        return request(app)
        .get('/api/articles/4/comments')
        .expect(200)
        .then(({ body }) => {
            expect(body.comments).toMatchObject([])
        })
    });
    test('should return 404 Not Found status when request to a non-existent article', () => {
        return request(app)
        .get('/api/articles/9000/comments')
        .expect(404)
        .then(({ body }) => {
            expect(body.msg).toBe('Not Found!')
        })
    });
    test('should return 400 Bad Request status when request to article_id made by anything other than a number', () => {
        return request(app)
        .get('/api/articles/banana/comments')
        .expect(400)
        .then(({ body }) => {
            expect(body.msg).toBe('Bad Request')
        })
    });
});
describe('POST /api/articles/:article_id/comments', () => {
    test('should return a status code of 201 and the posted comment', () => {
        return request(app)
        .post('/api/articles/2/comments')
        .expect(201)
        .send({
            username: 'butter_bridge',
            body: 'good job lad'
        })
        .then(({ body }) => {
            expect(body).toMatchObject( {
                comment_id: 19,
                body: 'good job lad',
                article_id: 2,
                author: 'butter_bridge',
                votes: 0,
              })
        })
    });
    test('should return 404 when trying to POST to a non-existent article', () => {
        return request(app)
        .post('/api/articles/9000000/comments')
        .expect(404)
        .send({
            username: 'butter_bridge',
            body: '@@@@@!!!!!'
        })
        .then(({ body }) => {
            expect(body.msg).toBe('Not Found!')
        })
    });
    test('should return a 404 if a username is not provided (cannot be found)', () => {
        return request(app)
        .post('/api/articles/1/comments')
        .expect(404)
        .send({
            body: 'this is a BODY'
        })
        .then(({ body }) => {
            expect(body.msg).toBe('Not Found!')
        })
    });
    test('should return a 404 status code if a user does not exist', () => {
        return request(app)
        .post('/api/articles/1/comments')
        .expect(404)
        .send({
            username: 'blanko',
            body: 'aaaasss'
        })
        .then(({ body }) => {
            expect(body.msg).toBe('Not Found!')
        })
    });
    test('should return a 400 status code and 23502 PSQL error code if a NOT NULL constraint is violated', () => {
        return request(app)
        .post('/api/articles/1/comments')
        .expect(400)
        .send({
            username: 'icellusedkars'
        })
        .then(({ body }) => {
            expect(body.code).toBe('23502')
            expect(body.msg).toBe('Bad Request')
        })
    });
});
describe('DELETE /api/comments/:comment_id', () => {
    test('should return a status code of 204 after a comment has been deleted by comment_id', () => {
        return request(app).delete('/api/comments/1').expect(204)
        })
    });
    test('should return 404 status code if trying to delete a non-existent comment', () => {
        return request(app)
        .delete('/api/comments/333000333')
        .expect(404)
        .then(({ body }) => {
            expect(body.msg).toBe('Not Found!')
        })  
    });
    test('should return 400 status code if trying to delete a comment without passing comment_id as a number', () => {
        return request(app)
        .delete('/api/comments/comment')
        .expect(400)
        .then(({ body }) => {
            expect(body.msg).toBe('Bad Request')
        })
    });
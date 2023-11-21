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
        .then((res) => {
            expect(res.text).toBe('Not Found!')
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
        .then((res) => {
            expect(res.text).toBe('Not Found!')
        })
    });
});
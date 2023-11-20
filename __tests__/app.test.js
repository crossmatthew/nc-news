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

describe('GET /api/topics', () => {
    test('should return 200 OK status code and a body of all topics', () => {
        return request(app)
        .get('/api/topics')
        .expect(200)
        .then(({ body }) => {
            expect(Object.keys(body[0]))
            .toEqual(expect.arrayContaining(
                ['slug', 'description'])
            )
        })
    });
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
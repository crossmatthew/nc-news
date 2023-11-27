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
            expect(body.articles.length).toBe(13)
            expect(body.articles).toBeSorted({ descending: true, key: 'created_at'})
        })
    });
});
describe('GET /api/articles?topics=QUERIES', () => {
    test('should return a 200 status OK and all articles on specified topic', () => {
        return request(app)
        .get('/api/articles?topic=mitch')
        .expect(200)
        .then(({ body }) => {
            expect(body.articles.length).toBe(12)
            body.articles.forEach((article) => {
                expect(Object.keys(article)).toMatchObject(['article_id', 'title', 'topic', 'author', 'body', 'created_at', 'votes', 'article_img_url' ])
            })
        })
    });
    test('should return a 404 when passed a topic which doesn`t exist', () => {
        return request(app)
        .get('/api/articles?topic=notATopic1234')
        .expect(404)
        .then(({ body }) => {
            expect(body.msg).toBe('Not Found!')
        })
    });
    test('should return a 404 when passed a topic which doesn`t exist', () => {
        return request(app)
        .get('/api/articles?topic=paper')
        .expect(200)
        .then(({ body }) => {
            expect(body.articles).toEqual([])
        })
    });
});
describe('GET /api/articles?sort_by=ANY_EXISTING_COLUMN&ORDER=ASC_or_DESC', () => {
    test('should return 200 status code and articles sorted by COLUMN NAME, defaulted to a descending order with order not provided', () => {
        return request(app)
        .get('/api/articles?sort_by=title')
        .expect(200)
        .then(({ body }) => {
            expect(body.articles.length).toBe(13)
            expect(body.articles).toBeSorted({ descending: true, key: 'title' })
            body.articles.forEach((article) => {
                expect(Object.keys(article)).toMatchObject(['article_id', 'title', 'author', 'created_at', 'article_img_url', 'votes', 'topic', 'comment_count'])
            })
        })
	});
    test('should return a 200 status code and articles sorted by created_at in DESC order when sort_by= is present but with no column provided', () => {
        return request(app)
        .get('/api/articles?sort_by=')
        .expect(200)
        .then(({ body }) => {
            expect(body.articles.length).toBe(13)
            expect(body.articles).toBeSorted({ descending: true, key: 'created_at' })
            body.articles.forEach((article) => {
                expect(Object.keys(article)).toMatchObject(['article_id', 'title', 'author', 'created_at', 'article_img_url', 'votes', 'topic', 'comment_count'])
            })
        })
	});
	test('should return a 200 status code and articles sorted by COLUMN NAME in ASC order', () => {
        return request(app)
        .get('/api/articles?sort_by=author&order=ASC')
        .expect(200)
        .then(({ body }) => {
            expect(body.articles.length).toBe(13)
            expect(body.articles).toBeSorted({ descending: false, key: 'author' })
            body.articles.forEach((article) => {
                expect(Object.keys(article)).toMatchObject(['article_id', 'title', 'author', 'created_at', 'article_img_url', 'votes', 'topic', 'comment_count'])
            })
        })
	});
	test('should return a 200 status code and articles sorted by COLUMN NAME in DESC order', () => {
        return request(app)
        .get('/api/articles?sort_by=author&order=desc')
        .expect(200)
        .then(({ body }) => {
            expect(body.articles.length).toBe(13)
            expect(body.articles).toBeSorted({ descending: true, key: 'author' })
            body.articles.forEach((article) => {
                expect(Object.keys(article)).toMatchObject(['article_id', 'title', 'author', 'created_at', 'article_img_url', 'votes', 'topic', 'comment_count'])
            })
        })
	});
	test('should return a 400 status code when a non-existing column name is provided', () => {
        return request(app)
        .get('/api/articles?sort_by=noColumnHere')
        .expect(400)
        .then(({ body }) => {
            expect(body.msg).toBe('Bad Request')
        })
	});
    test('should return a 400 status code if sort_by is valid, but order is invalid', () => {
        return request(app)
        .get('/api/articles?sort_by=author&order=UpsideDown')
        .expect(400)
        .then(({ body }) => {
            expect(body.msg).toBe('Bad Request')
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
    test('should return a 400 if a username is not provided', () => {
        return request(app)
        .post('/api/articles/1/comments')
        .expect(400)
        .send({
            body: 'this is a BODY'
        })
        .then(({ body }) => {
            expect(body.msg).toBe('Bad Request')
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
});
describe('PATCH /api/articles/:article_id', () => {
    test('should return 200 OK status code and respond with votes increased in the updated article', () => {
        return request(app)
        .patch('/api/articles/6')
        .expect(200)
        .send({ inc_votes: 5 })
        .then(({ body }) => {
            expect(body.article).toEqual({
                article_id: 6,
                title: "A",
                topic: "mitch",
                author: "icellusedkars",
                body: "Delicious tin of cat food",
                created_at: '2020-10-18T01:00:00.000Z',
                votes: 5,
                article_img_url:
                "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
            })
        })
    });
    test('should return 200 OK status code and respond with the votes decreased in the updated article', () => {
            return request(app)
            .patch('/api/articles/1')
            .expect(200)
            .send({ inc_votes: -110 })
        .then(({ body }) => {
            expect(body.article).toEqual({
                article_id: 1,
                title: 'Living in the shadow of a great man',
                topic: 'mitch',
                author: 'butter_bridge',
                body: 'I find this existence challenging',
                created_at: '2020-07-09T20:11:00.000Z',
                votes: -10,
                article_img_url: 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700'
            }
            )
        })
    });
    test('should return 404 if trying to PATCH a non-existing article (invalid number)', () => {
        return request(app)
        .patch('/api/articles/6000')
        .expect(404)
        .send({ inc_votes: 3 })
        .then(({ body }) => {
            expect(body.msg).toBe('Not Found!')
        })
    });
    test('should return a 400 status code if trying to PATCH a non-existing article (by not passing a number)', () => {
        return request(app)
        .patch('/api/articles/pasta')
        .expect(400)
        .send({ inc_votes: 3 })
        .then(({ body }) => {
            expect(body.msg).toBe('Bad Request')
        })
    });
    test('should return a 400 status code if trying to PATCH votes with a data type that is not an INT', () => {
        return request(app)
        .patch('/api/articles/3')
        .expect(400)
        .send({ inc_votes: 'one million votes' })
        .then(({ body }) => {
            expect(body.code).toBe('22P02')
            expect(body.msg).toBe('Bad Request')
        })
    });
});
describe('GET /api/users', () => {
        test('should return 200 OK status code and a body of all users', () => {
            return request(app)
            .get('/api/users')
            .expect(200)
            .then(({ body }) => {
                expect(body.users.length).toBe(4)
                body.users.forEach((user) => {
                    expect(Object.keys(user)).toEqual(['username', 'name', 'avatar_url'])
                })
            })
        });
});
describe('GET /api/users/:username', () => {
    test('should return 200 OK status and a user object by username', () => {
        return request(app)
        .get('/api/users/butter_bridge')
        .expect(200)
        .then(({ body }) => {
            expect(body).toMatchObject({user: {
                username: 'butter_bridge',
                name: 'jonny',
                avatar_url:
                  'https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg'
              }})
        })
    });
    test('should return 404 Not Found status when request to a non-existent user', () => {
        return request(app)
        .get('/api/users/WEAREAUSERNAME')
        .expect(404)
        .then(({ body }) => {
            expect(body.msg).toBe('Not Found!')
        })
    });
});

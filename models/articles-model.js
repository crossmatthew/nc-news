const db = require('../db/connection');
const checkValueExists = require('../utils/checkValueExists');

exports.specificArticle = (req) => {
    const { params } = req
    return checkValueExists('articles', 'article_id', params.article_id)
    .then(() => {
        return db.query(`
        SELECT articles.*, COUNT(comments.comment_id) AS comment_count
        FROM articles LEFT JOIN comments
        ON articles.article_id = comments.article_id
        WHERE articles.article_id = $1
        GROUP BY articles.article_id
        ORDER BY created_at DESC;
        `, [params.article_id])
    })
    .then((data) => {
        return data.rows
    })
};
exports.allArticles = (req) => {
    const { sort_by, order, topic, author, limit=10, p } = req.query
    if (order) {
        if (order.toLowerCase() !== 'asc' && order.toLowerCase() !== 'desc') {
            return Promise.reject({status: 400})
        }
    }
    let where = ``
    if (topic) {
        if (topic && author) {
            where = `WHERE articles.topic = '${topic}' AND articles.author = '${author}'`
        } else {
            where = `WHERE articles.topic = '${topic}'`
        }
    }
    if (author && !topic) {
        where = `WHERE articles.author = '${author}'`
    }
    let queryStr = 
    `SELECT articles.*, 
    COUNT(comments.comment_id) AS comment_count,
    (SELECT COUNT(*) FROM articles ${where}) AS total_count
    FROM articles LEFT JOIN comments
    ON articles.article_id = comments.article_id`
    if (topic) {
        if (topic && author) {
            where = `WHERE articles.topic = '${topic}' AND articles.author = '${author}'`
            queryStr += ` WHERE articles.topic = '${topic}' AND articles.author = '${author}'`
        } else {
            where = `WHERE articles.topic = '${topic}'`
            queryStr += ` WHERE articles.topic = '${topic}'`
        }
    }
    if (author && !topic) {
        where = `WHERE articles.author = '${author}'`
        queryStr += ` WHERE articles.author = '${author}'`
    }
    queryStr += ` GROUP BY articles.article_id`
    if (sort_by) {
        if (order) {
            queryStr += ` ORDER BY ${sort_by} ${order}`
        } else {
            queryStr += ` ORDER BY ${sort_by} desc`
        }
    } else {
        queryStr += ` ORDER BY created_at desc`
    }
    if (limit) {
        if (limit && p) {
            let offset = (p * limit)
            queryStr += ` LIMIT ${limit} OFFSET ${offset}`
        }
        if (limit && !p) {
            queryStr += ` LIMIT ${limit}`
        }
    }
    if (author) {
        if (author && topic) {
            return checkValueExists('articles', 'author', author)
            .then(() => {
                return checkValueExists('articles', 'topic', topic)
            })
            .then(() => {
                return db.query(queryStr)
            })
            .then((data) => {
                return { articles: data.rows }
            })
        } else {
            return checkValueExists('articles', 'author', author)
            .then(() => {
                return db.query(queryStr)
            })
            .then((data) => {
                return { articles: data.rows }
            })
        }
    }
    if (topic && !author) {
        return checkValueExists('articles', 'topic', topic)
        .then(() => {
            return db.query(queryStr)
        })
        .then((data) => {
            return { articles: data.rows }
        })
    } else {
    return db.query(queryStr)
    .then((data) => {
        return { articles: data.rows }
    })
    }
};

exports.patchThisArticle = (req) => {
    const { body, params } = req
    return checkValueExists('articles', 'article_id', params.article_id)
    .then(() => {
        return db.query(`
        UPDATE articles
        SET votes = votes + $1
        WHERE article_id = $2
        RETURNING *;`, [body.inc_votes, params.article_id])
    })
    .then((data) => {
        return {article: data.rows[0]}
    })
};
exports.articleToPost = (req) => {
    const { body } = req
        return db.query(`
        INSERT INTO articles (author, title, body, topic, article_img_url)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *`, [body.author, body.title, body.body, body.topic, body.article_img_url])
        .then((data) => {
            return db.query(`
        SELECT articles.*, COUNT(comments.comment_id) AS comment_count
        FROM articles LEFT JOIN comments
        ON articles.article_id = comments.article_id
        WHERE articles.article_id = $1
        GROUP BY articles.article_id
        ORDER BY created_at DESC
        `, [14])
        .then((data) => {
            return { article: data.rows[0] }
        })
    })
};
exports.deleteThisArticle = (req) => {
    const { params } = req
    return checkValueExists('articles', 'article_id', params.article_id)
    .then(() => {
        return db.query(`
        DELETE FROM articles WHERE article_id = $1;`, [params.article_id])
    })
};
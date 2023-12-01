const db = require('../db/connection');
const checkValueExists = require('../utils/checkValueExists');
const checkColumnExists = require('../utils/checkColumnExists');

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
    let { sort_by='created_at', order='DESC'} = req.query
    if (sort_by === '') sort_by = 'created_at';
    return checkColumnExists('articles', `${sort_by}`)
    .then(() => {
        if (order.toUpperCase() !== 'ASC' && order.toUpperCase() !== 'DESC') {
            return Promise.reject({status: 400})
        }
    })
    .then(() => {
        const queryStr = `SELECT articles.article_id, articles.title, articles.author, articles.created_at, articles.article_img_url, articles.votes, articles.topic, COUNT(comments.comment_id) AS comment_count
        FROM articles LEFT JOIN comments
        ON articles.article_id = comments.article_id
        GROUP BY articles.article_id
        ORDER BY articles.${sort_by} ${order};`
        return db.query(queryStr)
    })
    .then((data) => {
        return { articles: data.rows }
    })
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
exports.articlesQuery = (req) => {
    const { query } = req
    let { sort_by='created_at', order='DESC'} = query
    if (sort_by === '') sort_by ='created_at';
    if (order === '') order='DESC';
    return checkColumnExists('articles', `${sort_by}`)
    .then(() => {
        if (order.toUpperCase() !== 'ASC' && order.toUpperCase() !== 'DESC') {
            return Promise.reject({status: 400})
        }
    })
    .then(() => {
        return checkValueExists('topics', 'slug', query.topic)
    })
    .then(() => {
        return db.query(`
            SELECT * FROM articles
            WHERE topic = $1
            ORDER BY ${sort_by} ${order};`, [query.topic])
    })
    .then((data) => {
        if (data.rows.length === 0) {
            if (query.topic) {
                return {status: 200, articles: []}
            }
        }
        return { articles: data.rows }
    });
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
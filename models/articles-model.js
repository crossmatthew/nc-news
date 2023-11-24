const db = require('../db/connection');
const checkExists = require('../utils/checkExists');

exports.specificArticle = (req) => {
    const { params } = req
    return checkExists('articles', 'article_id', params.article_id)
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
    return db.query(`
    SELECT articles.article_id, articles.title, articles.author, articles.created_at, articles.article_img_url, articles.votes, articles.topic,
    COUNT(comments.comment_id) AS comment_count
    FROM articles LEFT JOIN comments
    ON articles.article_id = comments.article_id
    GROUP BY articles.article_id
    ORDER BY created_at DESC;`)
    .then((data) => {
        return data.rows
    })
};
exports.patchThisArticle = (req) => {
    const { body, params } = req
    return checkExists('articles', 'article_id', params.article_id)
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
    return checkExists('topics', 'slug', query.topic)
        .then(() => {
            return db.query(`
                SELECT * FROM articles
                WHERE topic = $1;`, [query.topic])
        })
        .then((data) => {
            if (data.rows.length === 0) {
                if (query.topic) {
                    return {status: 200, articles: []}
                }
            }
            return {articles: data.rows}
        })
};
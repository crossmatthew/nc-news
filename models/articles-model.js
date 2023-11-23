const db = require('../db/connection');

exports.specificArticle = (req) => {
    const { params } = req
    if (typeof (params.article_id * 1) !== 'number') {
        return Promise.reject()
    }
    return db.query(`
    SELECT * FROM articles
    WHERE article_id = $1;`, [params.article_id])
    .then((data) => {
        if (!data.rows.length) {
            return Promise.reject()
        } else {
        return data.rows
        }
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
}
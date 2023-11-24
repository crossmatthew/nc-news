const db = require('../db/connection');
const checkExists = require('../utils/checkExists');

exports.commentsOfArticle = (req) => {
    const { params } = req
    if (typeof (params.article_id * 1) !== 'number') {
        return Promise.reject()
    }
    return db.query(`
    SELECT * FROM comments
    WHERE article_id = $1
    ORDER BY created_at DESC;`, [params.article_id])
    .then((data) => {
        if (!data.rows.length) {
            return checkExists('articles', 'article_id', params.article_id)
        }
    else {
        return data.rows
    }})};
exports.commentToPost = (req) => {
    const { body, params } = req
    const promises = [
        checkExists('articles', 'article_id', params.article_id),
        checkExists('users', 'username', body.username)
    ]
    return Promise.all(promises)
    .then(() => {
        return db.query(`
        INSERT INTO comments (author, body, article_id)
        VALUES ($1, $2, $3)
        RETURNING *;`, [body.username, body.body, params.article_id])})
    .then((data) => {
            return data.rows[0]
        })
    }
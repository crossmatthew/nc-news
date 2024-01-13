const db = require('../db/connection');
const checkValueExists = require('../utils/checkValueExists');

exports.commentsOfArticle = (req) => {
    const { params } = req
    const { limit=10, p } = req.query
    return checkValueExists('articles', 'article_id', params.article_id)
    .then(() => {
        let queryStr = `SELECT * FROM comments
        WHERE article_id = ${params.article_id}
        ORDER BY created_at DESC`
        if (limit) {
            if (limit && p) {
                let offset = (p * limit)
                queryStr += ` LIMIT ${limit} OFFSET ${offset};`
            }
            if (limit && !p) {
                queryStr += ` LIMIT ${limit};`
            }
        }
        return db.query(queryStr)
    })
    .then((data) => {
        if (!data.rows.length) {
            return checkValueExists('articles', 'article_id', params.article_id)
        } else {
            return data.rows
        }
    })
};
exports.commentToPost = (req) => {
    const { body, params } = req
    if (!body.username) return Promise.reject({status: 400})
    const promises = [
        checkValueExists('articles', 'article_id', params.article_id),
        checkValueExists('users', 'username', body.username)
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
};
exports.deleteThisComment = (req) => {
    const { params } = req
    return checkValueExists('comments', 'comment_id', params.comment_id)
    .then(() => {
        return db.query(`
        DELETE FROM comments WHERE comment_id = $1;`, [params.comment_id])
    })
};
exports.patchThisComment = (req) => {
    const { body, params } = req
    return checkValueExists('comments', 'comment_id', params.comment_id)
    .then(() => {
        return db.query(`
        UPDATE comments
        SET votes = votes + $1
        WHERE comment_id = $2
        RETURNING *;`, [body.inc_votes, params.comment_id])
    })
    .then((data) => {
        return {comment: data.rows[0]}
    })
};
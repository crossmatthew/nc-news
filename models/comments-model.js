const db = require('../db/connection');
const checkExists = require('../utils/checkExists');

exports.commentsOfArticle = (req) => {
    const { params } = req
    if (typeof (req * 1) !== 'number') {
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
    }})}
const db = require('../db/connection');

exports.specificArticles = (req) => {
    const { params } = req
    return db.query(`
    SELECT * FROM articles
    WHERE article_id = $1`, [params.article_id])
    .then((data) => {
        return data.rows
    })
}
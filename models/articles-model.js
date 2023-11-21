const { handleFourZeroFour } = require('../controllers/error-handlers');
const db = require('../db/connection');

exports.specificArticle = (req) => {
    const { params } = req
    if (typeof (params.article_id * 1) !== 'number') {
        return Promise.reject() }
    return db.query(`
    SELECT * FROM articles
    WHERE article_id = $1`, [params.article_id])
    .then((data) => {
        if (!data.rows.length) {
            return Promise.reject()
        } else {
        return data.rows
        }
    })
}
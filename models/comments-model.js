const db = require('../db/connection');

exports.commentsOfArticle = (req) => {
    return db.query(`SELECT * FROM comments;`)
    .then((result) => {
        return result.rows;
    })
};
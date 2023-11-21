const db = require('../db/connection')

exports.allTopics = (req) => {
    return db.query(`SELECT * FROM topics;`)
    .then((result) => {
        return result.rows;
    })
}
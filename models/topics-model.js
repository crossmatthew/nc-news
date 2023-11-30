const db = require('../db/connection');

exports.allTopics = (req) => {
    return db.query(`SELECT * FROM topics;`)
    .then((result) => {
        return result.rows;
    })
};
exports.topicToPost = (req) => {
    const { body } = req
        return db.query(`
        INSERT INTO topics (description, slug)
        VALUES ($1, $2)
        RETURNING *`, [body.description, body.slug])
        .then((data) => {
            return { topic: data.rows[0] }
    })
};
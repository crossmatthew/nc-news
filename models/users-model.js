const db = require('../db/connection');

exports.allUsers = (req) => {
    return db.query(`SELECT * FROM users;`)
    .then((result) => {
        return result.rows;
    })
};
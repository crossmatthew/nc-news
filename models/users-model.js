const db = require('../db/connection');
const checkValueExists = require('../utils/checkValueExists');

exports.allUsers = (req) => {
    return db.query(`SELECT * FROM users;`)
    .then((result) => {
        return result.rows;
    })
};
exports.specificUser = (req) => {
    const { params } = req
    return checkValueExists('users', 'username', params.username)
    .then(() => {
        return db.query(`
        SELECT * FROM users
        WHERE username = $1
        `, [params.username])
    })
    .then((data) => {
        return data.rows
    })
};
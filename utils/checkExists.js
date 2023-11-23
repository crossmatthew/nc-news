const { handleFourZeroFour } = require('../controllers/error-handlers');
const db = require('../db/connection');
const format = require('pg-format');

module.exports = checkExists

function checkExists(table, column, value) {
    const queryStr = format(`SELECT * FROM %I WHERE %I = $1`, table, column)
    const dbOutput = db.query(queryStr, [value])
    .then((result) => {
        if (result.rows.length === 0) {
            return Promise.reject({ status: 404, message: 'Not Found!' })
            } else {
                return result.rows
            }
        })
    }
const db = require('../db/connection');
const format = require('pg-format');

module.exports = checkExists

function checkExists(table, column, value) {
    const queryStr = format(`SELECT * FROM %I WHERE %I = $1`, table, column)
    return db.query(queryStr, [value])
    .then((result) => {
        if (result.rows.length === 0) {
            return Promise.reject()
            } else {
                return result.rows
            }
        })
    }
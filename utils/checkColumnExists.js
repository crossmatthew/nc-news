const db = require('../db/connection');
const format = require('pg-format');
function checkColumnExists(table, column) {
    const queryStr = format(`SELECT * FROM information_schema.columns WHERE table_name= %L AND column_name = %L`, table, column)
    return db.query(queryStr)
    .then((result) => {
        if (result.rows.length === 0) {
            return Promise.reject({status: 400})
            } else {
                return []
            }
        })
    };
module.exports = checkColumnExists;

const db = require('../db/connection');
const format = require('pg-format');
function checkColumnExists(table, column) {
    const queryStr = format(`SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = %L AND COLUMN_NAME = %L`, table, column)
    return db.query(queryStr)
    .then((result) => {
        if (result.rows.length === 0) {
            return Promise.reject()
            } else {
                return []
            }
        })
    };

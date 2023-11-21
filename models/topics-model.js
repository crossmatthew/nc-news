const db = require('../db/connection');
const fs = require('fs/promises');

exports.allTopics = (req) => {
    return db.query(`SELECT * FROM topics;`)
    .then((result) => {
        return result.rows;
    })
};
exports.allEndpoints = (req) => {
    return fs.readFile('./endpoints.json', 'utf-8', (err, data) => {
        if (err) next(err)
        return data
    })
    .then((data) => {
        return JSON.parse(data)
    })
}
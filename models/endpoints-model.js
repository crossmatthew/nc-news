const db = require('../db/connection');
const fs = require('fs/promises');

exports.allEndpoints = (req) => {
    return fs.readFile('./endpoints.json', 'utf-8', (err, data) => {
        if (err) next(err)
        return data
    })
    .then((data) => {
        return JSON.parse(data)
    })
}
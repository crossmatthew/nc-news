const { allTopics } = require("../models/topics-model")

exports.getTopics = (req, res, next) => {
    allTopics(req)
    .then((data) => {
        res.status(200).send({topics: data})
    })
    .catch((err) => {
        next(err)
    })
}
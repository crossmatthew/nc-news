const { allTopics, topicToPost } = require("../models/topics-model");

exports.getTopics = (req, res, next) => {
    allTopics(req)
    .then((data) => {
        res.status(200).send({topics: data})
    })
    .catch((err) => {
        next(err)
    })
};
exports.postTopic = (req, res, next) => {
    topicToPost(req)
    .then((data) => {
        res.status(201).send(data)
    })
    .catch((err) => {
        next(err)
    })
};
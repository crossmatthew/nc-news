const { commentsOfArticle, commentToPost } = require("../models/comments-model")

exports.getComments = (req, res, next) => {
    commentsOfArticle(req)
    .then((data) => {
        res.status(200).send(data)
    })
    .catch((err) => {
        next(err)
    })
};
exports.postComment = (req, res, next) => {
    commentToPost(req)
    .then((data) => {
        res.status(201).send(data)
    })
    .catch((err) => {
        console.log(err)
        next(err)
    })
};
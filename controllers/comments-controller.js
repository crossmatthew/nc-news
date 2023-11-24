const { commentsOfArticle, commentToPost, deleteThisComment } = require("../models/comments-model")

exports.getComments = (req, res, next) => {
    commentsOfArticle(req)
    .then((data) => {
        res.status(200).send({comments: data})
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
        next(err)
    })
};
exports.deleteComment = (req, res, next) => {
    deleteThisComment(req)
    .then((data) => {
        res.status(204).send(data)
    })
    .catch((err) => {
        next(err)
    })
}
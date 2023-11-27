const { commentsOfArticle, commentToPost, deleteThisComment, patchThisComment } = require("../models/comments-model")

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
};
exports.patchComment = (req, res, next) => {
    patchThisComment(req)
    .then((data) => {
        res.status(200).send(data)
    })
    .catch((err) => {
        next(err)
    })
};
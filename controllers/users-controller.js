const { allUsers } = require("../models/users-model")

exports.getUsers = (req, res, next) => {
    allUsers(req)
    .then((data) => {
        res.status(200).send({users: data})
    })
    .catch((err) => {
        next(err)
    })
}
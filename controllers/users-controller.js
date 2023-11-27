const { allUsers, specificUser } = require("../models/users-model");
exports.getUsers = (req, res, next) => {
    allUsers(req)
    .then((data) => {
        res.status(200).send({users: data})
    })
    .catch((err) => {
        next(err)
    })
};
exports.getSpecificUser = (req, res, next) => {
    specificUser(req)
    .then((data) => {
        res.status(200).send({user: data[0]})
    })
    .catch((err) =>{
        next(err)
    })
};
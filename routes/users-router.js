const usersRouter = require('express').Router();
const { getUsers, getSpecificUser } = require('../controllers/users-controller');

usersRouter.get('/', getUsers);
usersRouter.get('/:username', getSpecificUser);


module.exports = usersRouter;
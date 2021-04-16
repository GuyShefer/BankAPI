const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');

router.post('/', (req, res) => {
    usersController.addUser(req, res);
})

router.put('/deposite', (req, res) => {
    usersController.depositeCash(req, res);
})

module.exports = router;
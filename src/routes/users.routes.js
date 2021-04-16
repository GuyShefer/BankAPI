const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');

router.post('/', (req, res) => {
    usersController.addUser(req, res);
})

router.put('/deposite', (req, res) => {
    usersController.depositeCash(req, res);
})

router.put('/updateCredit', (req, res) => {
    usersController.updateCredit(req, res);
})

router.put('/withdrawCash', (req, res) => {
    usersController.withdrawCash(req, res);
})

module.exports = router;
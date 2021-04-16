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

router.put('/transferring', (req, res) => {
    usersController.transferrMoney(req, res);
})

router.get('/:id', (req, res) => {
    usersController.getUserById(req, res);
})

router.get('/', (req, res) => {
    usersController.getAllUsers(req, res);
})

module.exports = router;
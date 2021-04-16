const bankData = require('../data/bank.json');
const fs = require('fs');

const addUser = (req, res) => {
    const user = { id, cash, credit, isActive } = req.body;

    if (id < 0 || cash < 0 || credit < 0 || isActive == null) {
        return res.status(406).send('User must contain id, cash, credit and activity.');
    }
    else if (isUserExistById(id)) {
        return res.status(406).send('User ID already exists.');
    }
    else {
        bankData.users.push(user);
        fs.writeFileSync('./src/data/bank.json', JSON.stringify(bankData));
        res.status(201).send('User has been created.');
    }
}

const depositeCash = (req, res) => {
    const { id, cash } = req.body;
    if (id < 0 || cash < 1) {
        return res.status(406).send('The request must include a valid ID and a positive amount of money.')
    }
    else if (!isUserExistById(id)) {
        return res.status(406).send('The User is not exists.')
    }
    else {
        bankData.users.forEach(user => {
            if (user.id == id) {
                user.cash += cash;
            }
        })
        fs.writeFileSync('./src/data/bank.json', JSON.stringify(bankData));
        res.status(200).send('User funds have been successfully deposited.');
    }
}

const isUserExistById = (id) => {
    return bankData.users.some(user => user.id == id);
}

module.exports = {
    addUser,
    depositeCash,
}
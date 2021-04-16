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
        return res.status(406).send('The request must include a valid ID and a positive amount of money.');
    }
    else if (!isUserExistById(id)) {
        return res.status(406).send('The User is not exists.');
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

const updateCredit = (req, res) => {
    const { id, credit } = req.body;
    if (id < 0 || credit < 0) {
        return res.status(406).send('The request must include a valid ID and a positive credit number.');
    }
    else if (!isUserExistById(id)) {
        return res.status(406).send('The User is not exists.');
    }
    else {
        bankData.users.forEach(user => {
            if (user.id == id) {
                user.credit = credit;
            }
        })
        fs.writeFileSync('./src/data/bank.json', JSON.stringify(bankData));
        res.status(200).send('User credit amount successfully updated.');
    }
}

const withdrawCash = (req, res) => {
    const { id, cash } = req.body;
    if (id < 0 || cash < 0) {
        return res.status(406).send('The request must include a valid ID and a positive cash amount.');
    }
    else if (!isUserExistById(id)) {
        return res.status(406).send('The User is not exists.');
    }
    else if (!validCashWithdraw(id, cash)) {
        return res.status(406).send('The amount of cash is not possible, you exceed the amount limit.');
    }
    else {
        bankData.users.forEach(user => {
            if (user.id == id) {
                user.cash -= cash;
            }
        })
        fs.writeFileSync('./src/data/bank.json', JSON.stringify(bankData));
        res.status(200).send('Cash withdrawal was successful.');
    }
}

const transferrMoney = (req, res) => {
    const { receivingUserId, sendingUserId, amount } = req.body;
    if (receivingUserId < 0 || sendingUserId < 0 || amount < 1) {
        return res.status(406).send('The request must include a valid IDs and a positive cash amount.');
    }
    else if (!isUserExistById(receivingUserId) || !isUserExistById(sendingUserId)) {
        return res.status(406).send('One or more of the users is not exists.');
    }
    else if (!validCashWithdraw(sendingUserId, amount)) {
        return res.status(406).send('The amount of cash is not possible, the sending user exceeds his amount limit.');
    }
    else {
        bankData.users.forEach(user => {
            if (user.id == sendingUserId) {
                user.cash -= amount;
            }
            else if (user.id == receivingUserId) {
                user.cash += amount;
            }
        })
        fs.writeFileSync('./src/data/bank.json', JSON.stringify(bankData));
        res.status(200).send('The amount of money was successfully transferred between the users.');
    }
}

const getUserById = (req, res) => {
    const id = req.params.id;
    if (id < 0) {
        return res.status(406).send('The request must include a valid ID.');
    }
    else if (!isUserExistById(id)) {
        return res.status(406).send('The User is not exists.');
    }
    else {
        const user = bankData.users.find(user => user.id == id);
        res.status(200).json(user);
    }
}

const getAllUsers = (req, res) => {
    res.status(200).json(bankData.users);
}

const getAllUsersSortedByMoney = (req, res) => {
    const users = bankData.users;
    users.sort((a, b) => a.cash - b.cash);
    res.status(200).json(users);
}

const getActiveUsersWithSpecifiedAmount = (req, res) => {
    const amount = req.params.amount;
    const users = bankData.users.filter(user => user.isActive === true && user.cash >= amount);
    res.status(200).json(users);
}

// Validations Functions //

const isUserExistById = (id) => {
    return bankData.users.some(user => user.id == id);
}

const validCashWithdraw = (id, amountOfCash) => {
    const user = bankData.users.find(user => user.id == id);
    if (user.cash + user.credit < amountOfCash) {
        return false;
    }
    return true;
}

module.exports = {
    addUser,
    depositeCash,
    updateCredit,
    withdrawCash,
    transferrMoney,
    getUserById,
    getAllUsers,
    getAllUsersSortedByMoney,
    getActiveUsersWithSpecifiedAmount,
}
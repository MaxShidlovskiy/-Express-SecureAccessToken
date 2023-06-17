const express = require('express');
const { createUser, authUser} = require('../service/user.service');
const {isValidUserBody, isValidUser} = require('../helper/validation');
const route = express.Router();


route.post('/reg', isValidUserBody, async (req, res) => {
    try {
        const { name, surname, email, pwd } = req.body;
        const data = await createUser(name, surname, email, pwd);
        res.send(data);
    } catch (err) {
        res.send(err.message);
    }
});


route.post('/auth', isValidUser, async (req, res) => {
    try {
        const { email, pwd } = req.body;
        const data = await authUser(email, pwd);
        res.send(data);
    } catch (err) {
        res.send(err.message);
    }
});

module.exports = route;
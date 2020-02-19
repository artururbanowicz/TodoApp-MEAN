const express = require("express");
const users = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const User = require("../models/User");
const salt = bcrypt.genSaltSync(10);

users.use(cors());

process.env.SECRET_KEY = 'secret';

users.get("/list", (req, res) => {
    User.findAll()
        .then(users => {
            res.json(users)
        })
        .catch(err => {
            res.send("error: " + err)
        })
});

users.post('/register', (req, res) => {
    var hash = bcrypt.hashSync(req.body.password, salt);
    const userData = {
        login: req.body.login,
        password: hash,
        email: req.body.email,
        created: new Date()
    };
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then( user => {
        if(!user) {
                User.create(userData)
                    .then( user => {
                        res.json({ status: "Dodano użytkownika" })
                    })
                    .catch(err => {
                        res.send('error: ' + err)
                    })
        }else{
            res.json({error: "Użytkownik z tym emailem już istnieje"})
        }
    })
        .catch(err => {
            res.send('error: ' + err)
        })
});

users.post('/login', (req, res) => {
    User.findOne({
        where: {
            email: req.body.email,
            login: req.body.login
        }
    })
        .then(user => {
            if (user) {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                        expiresIn: 1440
                    })
                    res.send(token)
                }
            } else {
                res.status(400).json({ error: 'Nie ma takiego użytkownika' })
            }
        })
        .catch(err => {
            res.status(400).json({ error: err })
        })
})

module.exports = users;
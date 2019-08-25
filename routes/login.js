const express = require('express');
const router = express.Router();
const Users = require('../models/users');
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
  res.render('login', { title: 'Login' });
});

router.post('/', (req, res) => {
  const { login, password } = req.body;
  console.log(login, password);
  console.log(Users);
  Users.findOne({ login: login }).then(user => {
    console.log(user);
    if (!user) {
      res.render('singup', { title: 'Sing up', text: "we don't have this login in base" });
    } else {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          res.redirect('/');
        } else {
          res.render('singup', { title: 'Sing up', text: 'incorrend password' });
        }
      });
    }
  });
});

module.exports = router;

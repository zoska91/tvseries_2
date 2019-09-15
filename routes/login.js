const express = require('express');
const router = express.Router();
const Users = require('../models/users');
const bcrypt = require('bcrypt');

const config = require('../config');


router.get('/', (req, res) => {
  res.render('login', { title: 'Login' });
});

router.post('/', (req, res) => {
  const { login, password } = req.body;

  Users.findOne({ login: login }).then(user => {
    if (!user) {
      //jeśli nie ma takiego użytkownika
      res.render('login', { title: 'Login', text: "we don't have this login in base" });
      return;
    } else {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          console.log(result);
          // jeśli dobre hasło przekieruj na profil
          req.session.profile = user;
          res.redirect('/profile');
        } else {
          // jeśli złe hasło
          res.render('login', { title: 'Login', text: 'wrong password' });
        }
      });
    }
  });
});

module.exports = router;

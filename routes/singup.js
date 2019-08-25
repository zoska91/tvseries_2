const express = require('express');
const router = express.Router();
const Users = require('../models/users');
const mongoose = require('mongoose');

const bcrypt = require('bcrypt');
const saltRounds = 10;

router.get('/', (req, res) => {
  // res.redirect('/singup');
  res.render('singup', { title: 'Sing up' });
});

router.post('/', (req, res) => {
  const { login, password } = req.body;

  const findUser = Users.find({ login });
  findUser.exec((err, users) => {
    //jeśli nie ma w bazie:
    if (users.length === 0) {
      console.log('dodaj');
      bcrypt.hash(password, 10, function(err, hash) {
        const newUser = new Users({
          login,
          password: hash
        });
        newUser.save(err => {
          if (err) console.log(err);
        });
        res.redirect('/login');
      });

      //jeśli jest mail w bazie
    } else {
      res.render('singup', { title: 'Sing up', text: 'this mail is already in the database' });
    }
  });

  //zahaszowanie
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Users = require('../models/users');
const mongoose = require('mongoose');

router.get('/', (req, res) => {
  res.render('login', { title: 'Login' });
});

module.exports = router;

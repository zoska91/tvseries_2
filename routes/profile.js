const express = require('express');
const router = express.Router();

// czy zalogowany
router.all('*', (req, res, next) => {
  if (!req.session.profile) {
    res.redirect('/login');
    return;
  }
  next();
});

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('profile', {
    title: 'Profile',
    body: req.session
  });
});

//wylogowanie
router.get('/logout', (req, res) => {
  req.session = null;
  res.redirect('/');
});

module.exports = router;

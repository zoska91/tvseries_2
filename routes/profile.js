const express = require('express');
const router = express.Router();
const Favorite = require('../models/favorites');
const mongoose = require('mongoose');

// czy zalogowany
router.all('*', (req, res, next) => {
  if (!req.session.profile) {
    res.redirect('/login');
    return;
  }
  next();
});

router.post('/:id', (req, res) => {
  console.log('params', req.params);

  const { id: seriesId } = req.params;
  const { _id: userId } = req.session.profile;

  const findFavorite = Favorite.find({ userId, seriesId });

  findFavorite.exec((err, data) => {
    if (data.length === 0) {
      const newFavorite = new Favorite({
        userId,
        seriesId
      });

      newFavorite.save(err => {
        if (err) console.log(err);
      });
    } else {
      return;
    }
  });

  res.redirect('/profile');
});

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('profile', {
    title: 'Profile',
    user: req.session.profile
  });
});

//wylogowanie
router.get('/logout', (req, res) => {
  req.session = null;
  res.redirect('/');
});

module.exports = router;

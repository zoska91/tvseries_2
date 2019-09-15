const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express', user: req.session.profile });
  if (req.session.profile) {
    console.log(true);
  }
});

module.exports = router;

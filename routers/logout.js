const express = require('express');

const router = express.Router();

router.route('/')
  .get((req, res) => {
    req.session.destroy();
    res.clearCookie('user_sid');
    res.locals.username = null;
    return res.redirect('/');
  });

module.exports = router;

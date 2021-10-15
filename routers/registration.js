const express = require('express');

const router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('../db/models/index');

router.route('/')
  .get(async (req, res) => {
    if (req.session.isAuth) {
      res.redirect('/');
    }
    res.render('registration');
  })
  .post(async (req, res) => {
    const {
      username, email, password,
    } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        username, email, password: hashedPassword,
      });
      req.session.user = user;
    } catch (error) {
      console.error(error);

      return res.status(401).json({ registrated: false });
    }
    req.session.isAuth = true;
    return res.json({ registrated: true });
  });

module.exports = router;

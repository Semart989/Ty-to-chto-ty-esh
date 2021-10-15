const express = require('express');

const router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('../db/models/index');

router.route('/')
  .get((req, res) => {
    if (req.session.isAuth) {
      res.redirect('/');
    }
    res.render('login');
  })
  .post(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    try {
      if (!user) { // if user doesn`t exist
        console.log('user doesn`t exist');
        return res.status(401).json({ exsists: false });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) { // if passwords do not match
        console.log('passwords do not match');
        return res.status(401).json({ passwordNotMatch: true });
      }
    } catch (error) {
      console.error(error);
      return res.status(401).json({ loggedIn: false });
    }
    req.session.isAuth = true;
    req.session.user = user;
    return res.json({ loggedIn: true });
  });
module.exports = router;

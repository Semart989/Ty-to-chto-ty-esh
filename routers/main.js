const express = require('express');

const router = express.Router();
// const { Book } = require('../db/models');

router.route('/')
  .get(async (req, res) => {
  // const books = await Book.findAll({ raw: true, where: { UserId: req.session.user.id } }); //Хотел реализовать рендеринг на главной странице карточек пользователя, но при логауте все ломается :////
  // const books = await Book.findAll({ raw: true });
  // console.log('******************************');
  // console.log(books);
  // console.log('///////////////////////////////');
    res.render('main');
  });

module.exports = router;

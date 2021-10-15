const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
const FileStore = require('session-file-store')(session);
const sessionConfig = require('./sessionConfig');

const userMiddleware = require('../middleware/user');
const mainRouter = require('../routers/main');
const searchRouter = require('../routers/search');
const loginRouter = require('../routers/login');
const registerRouter = require('../routers/registration');
const logoutRouter = require('../routers/logout');
// const createBook = require('../routes/routes_create_book');
// const myBooks = require('../routes/routes_my_books');
// const edit = require('../routes/routes_edit');

const config = (app) => {
  app.use(morgan('dev'));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors());
  app.use(express.static('public'));
  app.use(cookieParser());
  app.use(session(sessionConfig));
  app.use(userMiddleware);
  app.use('/', mainRouter);
  app.use('/', searchRouter);
  app.use('/login', loginRouter);
  app.use('/register', registerRouter);
  app.use('/logout', logoutRouter);
  // app.use('/createBook', createBook);
  // app.use('/myBooks', myBooks);
  // app.use('/edit', edit);

  app.set('view engine', 'hbs');
  app.set('views', path.join(__dirname, '..', 'views'));
};

module.exports = config;

// const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const sessionConfig = {
  name: 'user_sid',
  secret: 'sectet',
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 12,
    httpOnly: true,
  },
  store: new FileStore(),
};

module.exports = sessionConfig;

const express = require('express');
const config = require('./config/config');

const app = express();

config(app);

const port = process.env.PORT ?? 3000;

app.listen(port, () => {
  console.log('***Сервер работает***');
});

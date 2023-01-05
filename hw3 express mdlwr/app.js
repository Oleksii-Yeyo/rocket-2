const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({path: path.join(__dirname, 'env', `.env.${process.env.NODE_ENV || 'local'}`)});

const mainRouter = require('./api/api.router');
const { PORT, MONGO_URL } = require('./configs/variables');
const { NotFound } = require("./errors/ApiError");
const { SERVER_ERROR } = require("./errors/error.codes");

const app = express();

mongoose.set('debug', true);
mongoose.set('strictQuery', true);
mongoose.connect(MONGO_URL);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api', mainRouter);
app.use('*', notFoundError);
app.use(mainErrorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listen', PORT);
});


function notFoundError(req, res, next) {
  next(new NotFound('Route not found'));
}


// eslint-disable-next-line
function mainErrorHandler(err, req, res, next) {
  res
    .status(err.status || SERVER_ERROR)
    .json({
      message: err.message || 'Unknown error'
    });
}

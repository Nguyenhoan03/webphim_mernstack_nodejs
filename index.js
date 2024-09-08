const express = require('express');
require('dotenv').config();
const cors = require('cors');
const initRoutes = require('./routes/index');
// var session = require('express-session');
// const morgan = require('morgan');

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(morgan('dev'));

initRoutes(app);


const port = process.env.PORT || 8888;
    app.listen();
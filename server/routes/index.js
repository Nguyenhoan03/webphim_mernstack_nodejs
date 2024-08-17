const express = require('express');
const router = express.Router();
const Product = require('./product');
const Crawlphimhanhdong = require('../controller/crawl/Crawlphimhanhdong');
const Usercontroller = require('../controller/Usercontroller');
const ErrorHandler = require('../middleware/Errorhandle');

const initRoutes = (app) => {
  // Đảm bảo middleware session được áp dụng trước các route
  app.use('/product', Product);
  app.post('/dang-nhap', Usercontroller.Login);
  app.post('/dang-ky', Usercontroller.Register);
  app.post('/refresh_token', Usercontroller.Refreshtoken);
 
  app.get('/crawlphimhanhdong', Crawlphimhanhdong.crawlphimhanhdong);

  // Use router
  app.use(router);
  app.get('/error', (req, res, next) => {
    const error = new Error('Something went wrong!');
    error.statusCode = 400;
    error.stack = new Error().stack;
    next(error);
  });

  // Error handler should be the last middleware
  app.use(ErrorHandler);
};

module.exports = initRoutes;
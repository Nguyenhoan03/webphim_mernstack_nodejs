const express = require('express');
const router = express.Router();
const Product = require('./product');
const Admin = require('./admin');
const Crawlphim = require('../controller/crawl/Crawlphimcontroller');
const Usercontroller = require('../controller/Usercontroller');
const ErrorHandler = require('../middleware/Errorhandle');
const Categorycontroller = require('../controller/Categorycontroller');
const path = require("path");

const initRoutes = (app) => {
  app.use('/product', Product);
  app.use('/admin', Admin);
  app.use('/images', express.static(path.join(__dirname, '../public/images')));
  app.post('/dang-nhap', Usercontroller.Login);
  app.post('/dang-ky', Usercontroller.Register);
  app.post('/refresh_token', Usercontroller.Refreshtoken);
  app.post('/crawl', Crawlphim.Crawlphim);
  app.post('/create_scheduled_crawls', Crawlphim.Scheduled_crawls);
  app.delete('/delete_scheduled_crawls', Crawlphim.Delete_Scheduled_crawls);
  app.get('/category',Categorycontroller.getallcatecontroller);
  app.get('/getalluser',Usercontroller.getallusercontroller);
  app.post('/update_roles',Usercontroller.Updateroles);
  app.post('/update_permissions',Usercontroller.Updatepermissions);
  app.get('/schedule_crawl',Crawlphim.Schedule_crawl);
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
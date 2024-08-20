const express = require('express')
const {Authorize} = require('../middleware/Authorize');
const router = express.Router();

// router.get('/dashboard',Authorize, productController.admindashboard);
// router.get('/user', productController.adminuser);


module.exports = router;

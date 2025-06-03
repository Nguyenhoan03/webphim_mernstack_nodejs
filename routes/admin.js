const express = require('express')
const {Authorize} = require('../middleware/Authorize');
const router = express.Router();
const Admincontroller = require('../controller/admincontroller/Admincontroller')

// router.get('/dashboard',Authorize, productController.admindashboard);
router.post('/addphim', Admincontroller.Addphimcontroller);


module.exports = router;

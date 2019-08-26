const express = require('express');
const bookingControler = require('./../controllers/bookingController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.get(
  '/checkout-session/:tourId',
  authController.protect,
  bookingControler.getCheckoutSession
);
module.exports = router;

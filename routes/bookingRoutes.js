const express = require('express');
const bookingControler = require('./../controllers/bookingController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router.get('/checkout-session/:tourId', bookingControler.getCheckoutSession);

router.use(authController.restrictTo('admin', 'lead-guide'));

router
  .route('/')
  .get(bookingControler.getAllBooking)
  .post(bookingControler.createBooking);

router
  .route('/:id')
  .get(bookingControler.getBooking)
  .patch(bookingControler.updateBooking)
  .delete(bookingControler.deleteBooking);
module.exports = router;

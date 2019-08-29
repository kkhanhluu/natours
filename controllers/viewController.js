const Tour = require('./../models/tourModel');
const Booking = require('./../models/bookingModel');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
exports.getOverview = catchAsync(async (req, res, next) => {
  // 1. get Tour data from collection
  const tours = await Tour.find();
  // 2. Build template

  // 3. Render that template using data from step 1.
  res.status(200).render('overview', {
    title: 'All Tours',
    tours
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  // 1. get Tour data from Collection
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user'
  });

  if (!tour) {
    return next(new AppError('There is no tour with that name', 404));
  }
  // 2. build template
  // 3. render that template using data from step 1
  res.status(200).render('tour', {
    title: tour.name,
    tour
  });
});

exports.getLogin = (req, res) => {
  return res.status(200).render('login', {
    title: 'Log into your account'
  });
};

exports.getAccount = (req, res) => {
  return res.status(200).render('account', {
    title: 'Your account'
  });
};

exports.getMyTours = catchAsync(async (req, res) => {
  // 1. Find all bookings
  const bookings = await Booking.find({ user: req.user.id });
  // 2. Find tours with returned IDs
  const tourIDs = bookings.map(b => b.tour.id);
  const tours = await Tour.find({ _id: { $in: tourIDs } });

  return res.status(200).render('overview', {
    title: 'My Tours',
    tours
  });
});

exports.alerts = (req, res, next) => {
  const { alert } = req.query;
  if (alert === 'booking') {
    res.locals.alert =
      "Your booking was successful! Please check your email for a confirmation. If your booking doesn't show up here immedately, please come back later";
  }
  next();
};

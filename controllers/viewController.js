const Tour = require('./../models/tourModel');
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

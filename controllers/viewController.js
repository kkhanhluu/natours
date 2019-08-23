const Tour = require('./../models/tourModel');
const catchAsync = require('./../utils/catchAsync');

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

exports.getTour = catchAsync(async (req, res) => {
  // 1. get Tour data from Collection
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user'
  });
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

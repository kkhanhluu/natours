const fs = require('fs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Tour = require('./../../models/tourModel');
const User = require('./../../models/userModel');
const Review = require('./../../models/reviewModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

const readFileAsync = file => {
  return new Promise((resolve, reject) => {
    fs.readFile(`${__dirname}/${file}`, (err, data) => {
      if (err) {
        return reject(err);
      }
      return resolve(data);
    });
  });
};

const importData = async () => {
  try {
    const tours = JSON.parse(await readFileAsync('tours.json'));
    const users = JSON.parse(await readFileAsync('users.json'));
    const reviews = JSON.parse(await readFileAsync('reviews.json'));

    await User.create(users, { validateBeforeSave: false });
    await Review.create(reviews);
    await Tour.create(tours);
  } catch (err) {
    // console.log(err);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();
    // console.log('Delete all data successfully');
  } catch (err) {
    // console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

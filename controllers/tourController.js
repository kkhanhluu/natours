const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

// ROUTE HANDLERS
exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: { tours }
  });
};

exports.getTour = (req, res) => {
  const id = +req.params.id;
  const tour = tours.find(t => t.id === id);

  res.status(200).json({
    status: 'success',
    data: { tour }
  });
};

exports.createTour = (req, res) => {
  const newId = tours.length;
  const newTour = { ...req.body, id: newId };
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    err => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour
        }
      });
    }
  );
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: { tour: '<Updated tour here>' }
  });
};

exports.deleteTour = (req, res) => {
  const id = +req.params.id;

  const deletedTour = tours.find(t => t.id === id);
  const newTours = tours.slice(0, id).concat(tours.slice(id + 1));
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(newTours),
    err => {
      res.status(204).json({
        status: 'success',
        data: { tour: deletedTour }
      });
    }
  );
};

exports.checkID = (req, res, next, val) => {
  const id = +req.params.id;
  if (id >= tours.length) {
    return res.status(404).json({
      status: 'failed',
      message: 'Invalid Id'
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'failed',
      message: 'Missing name or price'
    });
  }
  next();
};

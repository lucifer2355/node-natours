const Tour = require("../models/tourModel");

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    requestTime: req.requestTime,
    // results: tours.length,
    // data: {
    //   tours,
    // },
  });
};

exports.getTour = (req, res) => {
  const id = req.params.id * 1;

  // const tour = tours.find((el) => el.id === id);

  res.status(200).json({
    status: "success",
    // data: {
    //   tour,
    // },
  });
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: "sucess",
      data: {
        tour: newTour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "invalid data set!",
    });
  }
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      tour: "<Update tour here...>",
    },
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: "success",
    data: null,
  });
};

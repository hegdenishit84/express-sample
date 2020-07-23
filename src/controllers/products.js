
const {validationResult} = require('express-validator');

/* eslint-disable max-len */
exports.getData = (req, res, next) => {
  res.status(200).json({
    data: [{id: '1001', price: '100$', description: 'sample product'},
      {id: '1002', price: '100$', description: 'sample product'}],
  });
};


exports.createProduct = (req, res, next) => {
  // check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array(),
    });
  }
  const id = req.body.id;
  const price = req.body.price;
  const description = req.body.description;

  res.status(201).json({
    message: 'added to db',
    data: {
      id: id,
      price: price,
      description: description,
    },
  });
};

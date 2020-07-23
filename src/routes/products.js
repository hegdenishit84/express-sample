const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

// express validator required for validating request parameters
const {body} = require('express-validator');

// controller to handler product data
const productController = require('../controllers/products');

router.get('/products', productController.getData);

// use middleware to validate the request data
router.post('/create',
    [body('id').isLength({min: 3}).
        withMessage((value, {req}) => {
          return req.t('id_length');
        }).custom((name, {req}) => {
          if (name === '1001') throw new Error(req.t('id_check'));
        }).exists(),
    body('price').exists(),
    body('description').isLength({min: 3}).exists()],
    productController.createProduct);

module.exports = router;

const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const productController = require('../controllers/productController');
const ValidateFields = require('../middlewares/ValidateFields');

router.get('/', productController.getProducts);

router.post(
    '/',
    [
        body('name', 'Name is required').notEmpty(),
        body('price', 'Price is required').notEmpty(),
        body('price', 'The price must be numerical').isNumeric()
    ],
    ValidateFields,
    productController.createProduct
);

router.put(
    '/:id',
    [
        body('nombre', 'Name is required').optional().notEmpty(),
        body('precio', 'The price must be numerical').optional().isNumeric()
    ],
    ValidateFields,
    productController.updateProduct
);

router.delete('/:id', productController.deleteProduct);

module.exports = router;

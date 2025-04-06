const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const rolController = require('../controllers/rolController');
const ValidateFields = require('../middlewares/ValidateFields');

router.get('/', rolController.getRoles);

router.post(
    '/',
    [
        body('type', 'Type is required').notEmpty(),
    ],
    ValidateFields,
    rolController.createRol
);

router.put(
    '/:id',
    [
        body('type', 'Type is required').notEmpty(),
    ],
    ValidateFields,
    rolController.updateRol
);

router.delete('/:id', rolController.deleteRol);

module.exports = router;

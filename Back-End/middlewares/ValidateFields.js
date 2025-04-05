const { validationResult } = require('express-validator');
const { logError } = require('../utils/logger');

const ValidateFields = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        logError(`Validation errors: ${JSON.stringify(errors.array(), null, 2)}`);
        return res.status(400).json({ errors: errors.array() });
    }

    next();
};

module.exports = ValidateFields;

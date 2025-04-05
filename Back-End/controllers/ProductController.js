const productService = require('../services/productService');
const { logError } = require('../utils/logger');

const getProducts = async (req, res) => {
    try {
        const products = await productService.getAll();
        res.json(products);
    } catch (err) {
        logError(err);
        res.status(500).json({ error: err });
    }
};

const createProduct = async (req, res) => {
    try {
        const product = await productService.create(req.body);
        res.status(201).json(product);
    } catch (err) {
        logError(err);
        res.status(500).json({ error: err });
    }
};

const updateProduct = async (req, res) => {
    try {
        const product = await productService.update(req.params.id, req.body);
        if (!product) return res.status(404).json({ error: 'Not found' });
        res.json(product);
    } catch (err) {
        logError(err);
        res.status(500).json({ error: err });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const deleted = await productService.remove(req.params.id);
        if (!deleted) return res.status(404).json({ error: 'Not found' });
        res.json({ msg: 'Product Removed' });
    } catch (err) {
        logError(err);
        res.status(500).json({ error: err });
    }
};

module.exports = {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
};

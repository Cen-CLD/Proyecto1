const Product = require('../models/Product');

const getAll = () => Product.find();
const create = (data) => Product.create(data);
const update = (id, data) => Product.findByIdAndUpdate(id, data, { new: true });
const remove = (id) => Product.findByIdAndDelete(id);

module.exports = { getAll, create, update, remove };
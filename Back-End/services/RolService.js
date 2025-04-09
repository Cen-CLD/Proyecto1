const Rol = require("../models/Rol");

const getAll = () => Rol.find();
const create = (data) => Rol.create(data);
const update = (id, data) => Rol.findByIdAndUpdate(id, data, { new: true });
const remove = (id) => Rol.findByIdAndDelete(id);
const getById = (id) => Rol.findById(id);

module.exports = { getAll, create, update, remove, getById };


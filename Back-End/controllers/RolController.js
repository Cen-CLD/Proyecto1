const rolService = require("../services/RolService");
const { logError } = require("../utils/Logger");

const getRoles = async (req, res) => {
    try {
        const roles = await rolService.getAll();
        res.json(roles);
    } catch (err) {
        logError(err);
        res.status(500).json({ error: err });
    }
};

const createRol = async (req, res) => {
    try {
        const rol = await rolService.create(req.body);
        res.status(201).json(rol);
    } catch (err) {
        logError(err);
        res.status(500).json({ error: err });
    }
};

const updateRol = async (req, res) => {
    try {
        const rol = await rolService.update(req.params.id, req.body);
        if (!rol) return res.status(404).json({ error: "Not found" });
        res.json(rol);
    } catch (err) {
        logError(err);
        res.status(500).json({ error: err });
    }
};

const deleteRol = async (req, res) => {
    try {
        const deleted = await rolService.remove(req.params.id);
        if (!deleted) return res.status(404).json({ error: "Not found" });
        res.json({ msg: "Rol Removed" });
    } catch (err) {
        logError(err);
        res.status(500).json({ error: err });
    }
};

const getRolById = async (req, res) => {
    try {
        const rol = await rolService.getById(req.params.id);
        if (!rol) return res.status(404).json({ error: "Rol no encontrado" });
        res.json(rol);
    } catch (err) {
        logError(err);
        res.status(500).json({ error: err });
    }
};

module.exports = {
    getRoles,
    createRol,
    updateRol,
    deleteRol,
    getRolById,
};

const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const rolController = require("../controllers/RolController");
const ValidateFields = require("../middlewares/ValidateFields");

router.get("/", rolController.getRoles);

router.post(
    "/",
    [body("type", "Type is required").notEmpty()],
    ValidateFields,
    rolController.createRol,
);

router.put(
    "/:id",
    [body("type", "Type is required").notEmpty()],
    ValidateFields,
    rolController.updateRol,
);

router.delete("/:id", rolController.deleteRol);

router.get("/:id", rolController.getRolById);

module.exports = router;

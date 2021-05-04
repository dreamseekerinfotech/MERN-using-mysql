var express = require("express");
var router = express.Router();
const todoController = require("../controllers/todoController");

// Create a new todo
router.post("/todo", todoController.create);

// Retrieve all todoController
router.get("/todo", todoController.findAll);

// Retrieve a single todo with id
router.get("/todo/:id", todoController.findOne);

// Update a todo with id
router.put("/todo/:id", todoController.update);

// Delete a todo with id
router.delete("/todo/:id", todoController.delete);

module.exports = router;

const db = require("../models");
const Todos = db.Todos;
const Op = db.Sequelize.Op;

// Create and Save a new Todos
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a todo
  const todo = {
    name: req.body.name,
    category: req.body.category,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
  };
  // Save todo in the database
  Todos.create(todo)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Todo.",
      });
    });
};
// Retrieve all Todos from the database.
exports.findAll = (req, res) => {
  Todos.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving todos.",
      });
    });
};

// Find a single Todos with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Todos.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Todo with id=" + id,
      });
    });
};

// Update a Todosby the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Todos.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Todo was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Todo with id=${id}. Maybe Todo was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Todos with id=" + id,
      });
    });
};

// Delete a Todoswith the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Todos.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Todos was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Todos with id=${id}. Maybe Todos was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Todos with id=" + id,
      });
    });
};

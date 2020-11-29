const db = require("../models");
const Game = db.games;

exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  const game = new Game({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  });
  Game
    .save(game)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Game."
      });
    });
};

exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  Game.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving games."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Game.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Game with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Game with id=" + id });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Game.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Game with id=${id}. Maybe Game was not found!`
        });
      } else res.send({ message: "Game was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Game with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Game.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Game with id=${id}. Maybe Game was not found!`
        });
      } else {
        res.send({
          message: "Game was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Game with id=" + id
      });
    });
};

exports.deleteAll = (req, res) => {
    Game.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Games were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all games."
      });
    });
};


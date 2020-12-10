module.exports = app => {
  const gameGuide = require("../controllers/gameGuide.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", gameGuide.create);

  // Retrieve all Tutorials
  router.get("/", gameGuide.findAll);

  // Retrieve all published Tutorials
  router.get("/published", gameGuide.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", gameGuide.findOne);

  // Update a Tutorial with id
  router.put("/:id", gameGuide.update);

  // Delete a Tutorial with id
  router.delete("/:id", gameGuide.delete);

  // Create a new Tutorial
  router.delete("/", gameGuide.deleteAll);

  app.use("/api/gameguide", router);
};
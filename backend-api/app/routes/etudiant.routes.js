module.exports = app => {
  const etudiants = require("../controllers/etudiant.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", etudiants.create);

  // Retrieve all Tutorials
  router.get("/", etudiants.findAll);

  // Retrieve all published Tutorials
  router.get("/published", etudiants.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", etudiants.findOne);

  // Update a Tutorial with id
  router.put("/:id", etudiants.update);

  // Delete a Tutorial with id
  router.delete("/:id", etudiants.delete);

  // Create a new Tutorial
  router.delete("/", etudiants.deleteAll);

  app.use("/api/etudiants", router);
};

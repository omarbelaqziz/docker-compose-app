const db = require("../models");
const Etudiant = db.etudiants;

// Create and Save a new Etudiant
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nom) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Etudiant
  const etudiant = new Etudiant({
    nom: req.body.nom,
    prenom: req.body.prenom,
    filiere: req.body.filiere,
    annee: req.body.annee
  });

  // Save Etudiant in the database
  etudiant
    .save(etudiant)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Etudiant."
      });
    });
};

// Retrieve all Etudiants from the database.
exports.findAll = (req, res) => {
  const nom = req.query.nom;
  var condition = nom ? { nom: { $regex: new RegExp(nom), $options: "i" } } : {};

  Etudiant.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving etudiants."
      });
    });
};

// Find a single Etudiant with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Etudiant.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Etudiant with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Etudiant with id=" + id });
    });
};

// Update a Etudiant by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Etudiant.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Etudiant with id=${id}. Maybe Etudiant was not found!`
        });
      } else res.send({ message: "Etudiant was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Etudiant with id=" + id
      });
    });
};

// Delete a Etudiant with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Etudiant.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Etudiant with id=${id}. Maybe Etudiant was not found!`
        });
      } else {
        res.send({
          message: "Etudiant was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Etudiant with id=" + id
      });
    });
};

// Delete all Etudiants from the database.
exports.deleteAll = (req, res) => {
  Etudiant.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Etudiants were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all etudiants."
      });
    });
};

// Find all published Etudiants
exports.findAllPublished = (req, res) => {
  Etudiant.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving etudiants."
      });
    });
};

const express = require('express');
const Animals = require('./animalsModel.js');
const router = express.Router();

router.get('/', (req, res) => {
  Animals.getAll()
    .then((animals) => {
      res.status(200).json(animals);
    })
    .catch((err) => {
      res.status(500).json({ message: 'Failed to get animals' });
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  Animals.findById(id)
    .then((animal) => {
      if (animal) {
        res.json(animal);
      } else {
        res
          .status(404)
          .json({ message: 'Could not find animal with given id.' });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: 'Failed to get animals' });
    });
});

router.post('/', (req, res) => {
  const animalData = req.body;

  Animals.insert(animalData)
    .then((animal) => {
      res.status(201).json(animal);
    })
    .catch((err) => {
      res.status(500).json({ message: 'Failed to create new animal' });
    });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Animals.remove(id)
    .then((deleted) => {
      if (deleted) {
        res.json({ removed: id });
      } else {
        res
          .status(404)
          .json({ message: 'Could not find animal with given id' });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: 'Failed to delete animal' });
    });
});

module.exports = router;

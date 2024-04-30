const router = require('express').Router();
const Professor = require('../models/Professor.model');

// Routes for professors
router.post('/professors', async (req, res) => {
  try {
    const professor = new Professor(req.body);
    await professor.save();
    res.status(201).send(professor);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/professors', async (req, res) => {
  try {
    const professors = await Professor.find();
    res.send(professors);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;

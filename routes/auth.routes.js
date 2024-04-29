cconst express = require('express');
const router = express.Router();
const Discipline = require('./models/Discipline');
const Professor = require('./models/Professor');

// Route for creating a new discipline
router.post('/disciplines', async (req, res) => {
  try {
    const discipline = new Discipline(req.body);
    await discipline.save();
    res.status(201).send(discipline);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Route for getting all disciplines
router.get('/disciplines', async (req, res) => {
  try {
    const disciplines = await Discipline.find();
    res.send(disciplines);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Route for creating a new professor
router.post('/professors', async (req, res) => {
  try {
    const professor = new Professor(req.body);
    await professor.save();
    res.status(201).send(professor);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Route for getting all professors
router.get('/professors', async (req, res) => {
  try {
    const professors = await Professor.find();
    res.send(professors);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const Discipline = require('./models/Discipline');
const Professor = require('./models/Professor');

// Route for creating a new discipline
router.post('/disciplines', async (req, res) => {
  try {
    const discipline = new Discipline(req.body);
    await discipline.save();
    res.status(201).send(discipline);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Route for getting all disciplines
router.get('/disciplines', async (req, res) => {
  try {
    const disciplines = await Discipline.find();
    res.send(disciplines);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Route for creating a new professor
router.post('/professors', async (req, res) => {
  try {
    const professor = new Professor(req.body);
    await professor.save();
    res.status(201).send(professor);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Route for getting all professors
router.get('/professors', async (req, res) => {
  try {
    const professors = await Professor.find();
    res.send(professors);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;

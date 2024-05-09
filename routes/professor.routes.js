const router = require("express").Router();
const Professor = require("../models/Professor.model");
require("../models/Class.model");
require("../models/Student.model");

// Routes for professors
router.post("/professors", async (req, res) => {
  try {
    const professor = new Professor(req.body);
    await professor.save();
    res.status(201).send(professor);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/professors", async (req, res) => {
  try {
    const professors = await Professor.find();
    res.json(professors);
  } catch (error) {
    if (
      error instanceof SyntaxError &&
      error.status === 400 &&
      "body" in error
    ) {
      // JSON parsing error
      res.status(400).json({ message: "Invalid JSON data in request body" });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
});
// Delete Professor
router.delete("/professors/:id", async (req, res) => {
  try {
    const teacherId = req.params.id;
    await Professor.findByIdAndDelete(teacherId);
    res.status(201).send(/*deleteProfessor*/);
  } catch (error) {
    console.log("Could not find teacher with id", id);
    res.status(500).json(error);
  }
});

// Update Professor
router.put("/professors", async (req, res) => {
  const teacherId = req.params.id;
  try {
    const updatedprofessors = await Professor.findByIdAndUpdate(teacherId, {
      new: true,
    });
    res.status(200).json(updatedprofessors);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;

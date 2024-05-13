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

router.get("/professors/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const professor = await Professor.findById(id);
    res.json(professor);
  } catch (error) {
    console.log("Could not find teacher with id", ids);
    res.status(500).json(error);
  }
});

// Update Professor
router.put("/professors/:id", async (req, res) => {
  const teacherId = req.params.id;
  try {
    const updatedProfessor = await Professor.findByIdAndUpdate(
      teacherId,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedProfessor) {
      return res.status(404).json({ message: "Professor not found" });
    }
    res.status(200).json(updatedProfessor);
  } catch (error) {
    console.log("Error updating professor:", error);
    res.status(500).json(error);
  }
});

module.exports = router;

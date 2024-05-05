const router = require("express").Router();
const Student = require("../models/Student.model");
require("../models/Class.model");
require("../models/Student.model");

// Routes for students
router.post("/students", async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).send(student);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.send(students);
  } catch (error) {
    if (
      error instanceof SyntaxError &&
      error.status === 400 &&
      "body" in error
    ) {
      // JSON parsing error
      res.status(400).send({ message: "Invalid JSON data in request body" });
    } else {
      res.status(500).send({ message: "Internal Server Error" });
    }
  }
});

module.exports = router;

const router = require("express").Router();
const Professor = require("../models/Professor.model");
const Class = require("../models/Class.model");
const Student = require("../models/Student.model");

router.post("/classes", async (req, res) => {
  try {
    const group = new Class(req.body);
    await group.save();
    res.status(201).send(group);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/classes", async (req, res) => {
  try {
    const classes = await Class.find();
    res.json(classes);
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

//Delete Class

router.delete("/classes/:id", async (req, res) => {
  try {
    const classId = req.params.id;
    await Class.findByIdAndDelete(classId);
    res.status(201).send();
  } catch (error) {
    console.log("Could not find class with id", id);
    res.status(500).json(error);
  }
});

//Update Class

router.put("/classes/:id", async (req, res) => {
  const classId = req.params.id;
  try {
    await Class.findByIdAndUpdate(classId, { new: true });
    res.status(200).json();
  } catch (error) {
    console.log("Could not find class with id", id);
    res.status(500).json(error);
  }
});
module.exports = router;

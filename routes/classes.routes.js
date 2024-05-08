const express = require("express");
const Class = require("../models/Class.model");
const router = express.Router();

// Route to get all classes
router.get("/", async (req, res) => {
  try {
    const classes = await Class.find().populate("professor student");
    res.json(classes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to create a new class
router.post("/", async (req, res) => {
  const classData = req.body;
  console.log(classData);
  const newClass = new Class(classData);
  try {
    const savedClass = await newClass.save();
    res.status(201).json(savedClass);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
});

// Route to get a single class by ID
router.get("/:id", getClass, (req, res) => {
  res.json(res.class);
});

// Middleware to get a single class by ID
async function getClass(req, res, next) {
  let classObj;
  try {
    classObj = await Class.findById(req.params.id);
    if (classObj == null) {
      return res.status(404).json({ message: "Class not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.class = classObj;
  next();
}

// Route to update a class by ID
router.patch("/:id", getClass, async (req, res) => {
  if (req.body.student != null) {
    res.class.student = req.body.student;
  }
  if (req.body.professor != null) {
    res.class.professor = req.body.professor;
  }
  if (req.body.subject != null) {
    res.class.subject = req.body.subject;
  }
  try {
    const updatedClass = await res.class.save();
    res.json(updatedClass);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route to delete a class by ID
router.delete("/:id", getClass, async (req, res) => {
  try {
    await res.class.remove();
    res.json({ message: "Class deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

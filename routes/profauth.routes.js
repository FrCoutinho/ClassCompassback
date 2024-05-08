const Professor = require("../models/Professor.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const { isAuthenticated } = require("../middleware/route-guard.middleware");
const uploader = require("../middleware/cloudinary.config.js");

// POST to signup for professors
router.post("/signup", uploader.single("photo"), async (req, res) => {
  console.log(req.body);
  const { name, subject, email, experience_years } = req.body;
  const photo = req.file.path;

  try {
    // Criar um novo professor
    const newProfessor = await Professor.create({
      name,
      subject,
      email,
      experience_years,
      photo,
    });
    res.status(201).json(newProfessor);
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      res.status(400).json({ message: "Username already in use" });
    } else {
      res.status(500).json(error);
    }
  }
});

// POST para login de professors
router.post("/login", async (req, res) => {
  // Found professor by username
  try {
    const potentialProfessor = await Professor.findOne({
      username: req.body.username,
    });
    if (potentialProfessor) {
      // Professor found
      // Is the password correct ?
      if (
        bcrypt.compareSync(req.body.password, potentialProfessor.hashedPassword)
      ) {
        // Sign our JWT
        const authToken = jwt.sign(
          {
            userId: potentialProfessor._id,
            role: "professor",
          },
          process.env.TOKEN_SECRET,
          {
            algorithm: "HS256",
            expiresIn: "6h",
          }
        );
        res
          .status(200)
          .json({ message: "Password Accepted", token: authToken });
      } else {
        res.status(400).json({ message: "Incorrect password" });
      }
    } else {
      // Professor not found
      res.status(400).json({ message: "Professor not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "There is a problem" });
  }
});

// GET to verify
router.get("/verify", isAuthenticated, (req, res) => {
  // Verify the user us a Professor
  if (req.tokenPayload.role === "professor") {
    res.status(200).json(req.tokenPayload);
  } else {
    res.status(403).json({ message: "Forbidden" });
  }
});

module.exports = router;

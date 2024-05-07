const Student = require("../models/Student.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const { isAuthenticated } = require("../middleware/route-guard.middleware");
const uploader = require("../middleware/cloudinary.config.js");

// POST para cadastro de estudantes
router.post("/signup", uploader.single("photo"), async (req, res) => {
  console.log(req.body);
  const { name, age, email, classes } = req.body;
  const photo = req.file.path;

  try {
    // Criar um novo estudante
    const newStudent = await Student.create({
      name,
      age,
      email,
      photo,
      classes,
    });
    res.status(201).json(newStudent);
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      res.status(400).json({ message: "Email already in use" });
    } else {
      res.status(500).json(error);
    }
  }
});

// POST para login de estudantes
router.post("/login", async (req, res) => {
  // Encontrar estudante por email
  try {
    const potentialStudent = await Student.findOne({
      email: req.body.email,
    });
    if (potentialStudent) {
      // Estudante encontrado
      // A senha está correta?
      if (
        bcrypt.compareSync(req.body.password, potentialStudent.hashedPassword)
      ) {
        // Assinar nosso JWT
        const authToken = jwt.sign(
          {
            userId: potentialStudent._id,
            role: "student", // Adicionando o papel do usuário como estudante
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
      // Estudante não encontrado
      res.status(400).json({ message: "Student not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "There is a problem" });
  }
});

// GET para verificação
router.get("/verify", isAuthenticated, (req, res) => {
  // Verificar se o usuário é um Estudante
  if (req.tokenPayload.role === "student") {
    res.status(200).json(req.tokenPayload);
  } else {
    res.status(403).json({ message: "Forbidden" });
  }
});

module.exports = router;

const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const { isAuthenticated } = require("../middleware/route-guard.middleware");

// POST to signup
router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const saltRounds = 13;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPassword = bcrypt.hashSync(password, salt);

  try {
    const newUser = await User.create({ username, hashedPassword });
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      res.status(400).json({ message: "Username already in use" });
    } else {
      res.status(500).json(error);
    }
  }
});

// POST to login
router.post("/login", async (req, res) => {
  console.log(req.body);
  // Find a user by its username
  try {
    const potentialUser = await User.findOne({ username: req.body.username });
    if (potentialUser) {
      //User found

      // Is the password correct ?
      if (bcrypt.compareSync(req.body.password, potentialUser.hashedPassword)) {
        // Sign our JWT

        const authToken = jwt.sign(
          {
            userId: potentialUser._id,
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
      // User not found
      res.status(400).json({ message: "user not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "There is a problem" });
  }
});
// GET to verify
router.get("/verify", isAuthenticated, (req, res) => {
  res.status(200).json(req.tokenPayload);
});

module.exports = router;

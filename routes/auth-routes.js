const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const User = require("../models/UserModel");

// HELPER FUNCTIONS
const {
  isLoggedIn,
  isNotLoggedIn,
  validationLogin,
} = require("../helpers/middlewares");

// POST '/auth/signup'
router.post(
  "/signup",
  isNotLoggedIn,
  validationLogin,
  async (req, res, next) => {
    const { username, password, platforms } = req.body;
    try {
      // projection
      const usernameExists = await User.findOne({ username }, "username");
      console.log(usernameExists)
      if (usernameExists) return next(createError(409, "Username taken"));
      else {
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashPass = bcrypt.hashSync(password, salt);
        const newUser = await User.create({
          username,
          password: hashPass,
          platforms
        });

        newUser.password = "*";
        req.session.currentUser = newUser;
        res
          .status(201) //  Created
          .json(newUser);
      }
    } 
    catch (error) {
      next(createError(error));
    }
  }
);

// POST '/auth/login'
router.post(
  "/login",
  isNotLoggedIn,
  validationLogin,
  async (req, res, next) => {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ username });
      if (!user) {
        next(createError(404));
      } else if (bcrypt.compareSync(password, user.password)) {
        user.password = "*";
        req.session.currentUser = user;
        res.status(200).json(user);
        //return;	 			TODO - remove from the notes
      } else {
        next(createError(401)); // Unauthorized
      }
    } catch (error) {
      next(createError(error));
    }
  }
);

// POST '/auth/logout'
router.post("/logout", isLoggedIn, (req, res, next) => {
  req.session.destroy();
  res
    .status(204) //  No Content
    .send();
});

// GET '/auth/me' for verifying user session on every page
router.get("/me", isLoggedIn, (req, res, next) => {
  const currentUserSessionData = req.session.currentUser;
  currentUserSessionData.password = "*"; // to not share password

  res.status(200).json(currentUserSessionData);
});

// PUT '/auth/profile/:id

module.exports = router;

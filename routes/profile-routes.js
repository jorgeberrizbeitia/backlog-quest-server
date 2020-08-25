//      routes/project-routes.js
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const User = require("../models/UserModel");

// HELPER FUNCTIONS
const { isLoggedIn } = require("../helpers/middlewares"); // to check if user is loggedIn

// GET '/api/profile/:id'		 => to get a specific user info
router.get("/:id", isLoggedIn, (req, res) => {
    console.log("route working")
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res
        .status(400) //  Bad Request
        .json({ message: "Specified id is not valid" });
      return;
    }
    User.findById(id)
      .then(foundUser => {
          console.log(foundUser)
        res.status(200).json(foundUser);
      })
      .catch(err => {
        res.res.status(500).json(err);
      });
  });
  
  // PUT '/api/profile/:id' 		=> to update user info
  router.put("/:id", isLoggedIn, (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }
  

      // route to update platform
      const { platforms, consoles } = req.body
      User.findByIdAndUpdate(req.params.id, {platforms, consoles} )
        .then(() => {
          res.json({
            message: `Media with ${req.params.id} is updated successfully.`
          });
        })
        .catch(err => {
          res.json(err);
        });
  });   
  
  // NOT YET IMPLEMENTED ON FRONTEND
  // DELETE '/api/profile/:id'   => to delete user
  router.delete("/:id", isLoggedIn, (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }
  
    User.findByIdAndRemove(id)
      .then(() => {
        res
          .status(202) //  Accepted
          .json({ message: `Media with ${id} was removed successfully.` });
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });
  
  module.exports = router;
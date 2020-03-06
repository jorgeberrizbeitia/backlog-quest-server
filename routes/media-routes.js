//      routes/project-routes.js
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Media = require("../models/media-model");

// HELPER FUNCTIONS
const { isLoggedIn } = require("../helpers/middlewares"); // to check if user is loggedIn

// POST '/search/add'      => to add a new media element
router.post("/add", isLoggedIn, (req, res) => { 
  const { title, type, done, platform, image, ranking, description, releaseDate } = req.body;

  const user = req.session.currentUser._id;

  Media.create({ title, type, done, platform, image, ranking, description, releaseDate, user })
    .then(response => {
      res.status(201).json(response);
      console.log("Film created:", response)
      // `res.json` is similar to ->  `res.send( JSON.stringify(response) )`
    })
    .catch(err => {
      res
        .status(500) // Internal Server Error
        .json(err);
    });
});

// GET '/backlog'		 => to get all the media elements
router.get("/backlog", isLoggedIn, (req, res, next) => {

  const user = req.session.currentUser._id;

  Media.find({ user: user })
    .then(allTheMedia => {
      allTheMedia.map(e => console.log(e.title))
      res.json(allTheMedia);
    })
    .catch(err => {
      console.log(err)
      res.json(err);
    });
});

// GET '/api/media/:id'		 => to get a specific media element
router.get("/media/:id", (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res
      .status(400) //  Bad Request
      .json({ message: "Specified id is not valid" });
    return;
  }

  Media.findById(id)
    .then(foundMedia => {
      res.status(200).json(foundMedia);
    })
    .catch(err => {
      res.res.status(500).json(err);
    });
});

// PUT '/api/media/:id' 		=> to update a specific media element
router.put("/media/:id", (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  const { platform } = req.body
  Media.findByIdAndUpdate(req.params.id, {platform} )
    .then(() => {
      res.json({
        message: `Media with ${req.params.id} is updated successfully.`
      });
    })
    .catch(err => {
      res.json(err);
    });
});

// DELETE '/api/media/:id'   => to delete a specific media element
router.delete("/media/:id", (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Media.findByIdAndRemove(id)
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

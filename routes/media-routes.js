//      routes/project-routes.js
const express = require('express');
const mongoose = require('mongoose');
const router  = express.Router();

const Media = require('../models/user-model');

// POST '/search/add'
router.post('/search/add', (req,res) => {
    const { title, type, platform } = req.body;
  
    const userId = req.session.currentUser._id

    Media.create({ title, type, platform, user: userId })
      .then((response)=> {
        res
          .status(201)
          .json(response);
        // `res.json` is similar to ->  `res.send( JSON.stringify(response) )`
      })
      .catch((err)=> {
        res
          .status(500)  // Internal Server Error
          .json(err)
      })
  })

  // GET '/backlog'		 => to get all the media
router.get('/projects', (req, res, next) => {
    Project.find().populate('user')
      .then(allTheMedia => {
        res.json(allTheMedia);
      })
      .catch(err => {
        res.json(err);
      })
  });

  // DELETE '/api/projects/:id'   => to delete a specific project
router.delete('/projects/:id', (req, res)=>{
    const { id } = req.params;
  
    if ( !mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
  
    Project.findByIdAndRemove(id)
      .then(() => {
        res
          .status(202)  //  Accepted
          .json({ message: `Project with ${id} was removed successfully.` });
      })
      .catch( err => {
        res.status(500).json(err);
      })
  })
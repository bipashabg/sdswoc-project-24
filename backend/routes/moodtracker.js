const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../database');
const userprofileVerify = require('../middlewares/userprofileVerify');  // Make sure to use the correct path

// GET request for mood tracker
router.get('/', userprofileVerify, (req, res) => {
  const isAuthenticated = true;
  

  if (isAuthenticated) {
    console.log('Mood Tracker data:', {
      date: req.date,
      mood: req.mood,
      intensity: req.intensity,
      id: req.id,
      note: req.note,
    });
    
    res.status(200).json({
      Status: 'Success',
      date: req.date,
      mood: req.mood,
      intensity: req.intensity,
      id: req.id,
      note: req.note,

    });
  } else {
    res.status(401).json({
      Status: 'Error',
      Error: 'User not authenticated',
    });
  }
});


module.exports = router;

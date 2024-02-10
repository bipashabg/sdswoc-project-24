const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../database');
const userprofileVerify = require('../middlewares/userprofileVerify');

// GET request for user profile
router.get('/', userprofileVerify, (req, res) => {
  const isAuthenticated = true;
  

  if (isAuthenticated) {
    console.log('User Profile Data:', {
      Fullname: req.Fullname,
      username: req.username,
      date_of_joining: req.date_of_joining,
      last_online: req.last_online,
      about_me: req.about_me,
      id: req.id,
      depression: req.depression,
      anxiety: req.anxiety,
      stress: req.stress,
      created_at: req.created_at,
    });
    
    res.status(200).json({
      Status: 'Success',
      Fullname: req.Fullname,
      username: req.username,
      date_of_joining: req.date_of_joining,
      last_online: req.last_online,
      about_me: req.about_me,
      id: req.id,

      depression: req.depression,
      anxiety: req.anxiety,
      stress: req.stress,
      created_at: req.created_at


    });
  } else {
    res.status(401).json({
      Status: 'Error',
      Error: 'User not authenticated',
    });
  }
});


module.exports = router;
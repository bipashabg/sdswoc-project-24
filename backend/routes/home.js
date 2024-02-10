const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../database');
const verifyUser = require('../middlewares/verifyuser'); 

// Define a route for the root URL with the middleware
router.get('/', verifyUser, (req, res) => {
  // Check user authentication status
  const isAuthenticated = true; //true by default

  //response
  if (isAuthenticated) {
    res.status(200).json({
      Status: 'Success',
      Fullname: req.Fullname, //Using Fullname from the middleware
      username: req.username
    });
  } else {
    res.status(401).json({
      Status: 'Error',
      Error: 'User not authenticated', 
    });
  }
});

module.exports = router;


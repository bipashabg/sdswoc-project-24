const express = require('express');
const router = express.Router();
const db = require('../database');

const verifyUser = require('../middlewares/verifyuser');  // Make sure to use the correct path

// Define a route for the root URL with the middleware
router.get('/', verifyUser, (req, res) => {
  // Check user authentication status or perform any other logic
  const isAuthenticated = true; // You can replace this with your actual logic

  // Sample response
  if (isAuthenticated) {
    res.status(200).json({
      Status: 'Success',
      Fullname: req.Fullname, // Using Fullname from the middleware
      id: req.id
    });
  } else {
    res.status(401).json({
      Status: 'Error',
      Error: 'User not authenticated', // Replace with an appropriate error message
    });
  }
});


module.exports = router;


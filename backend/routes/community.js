// Import necessary modules
const express = require('express');
const router = express.Router();
const db = require('../database');
const axios = require('axios');
require("dotenv").config();
const verifyUser = require('../middlewares/verifyuser');

// Define a route for the root URL with the middleware
router.get('/', verifyUser, async (req, res) => {
  try {
    // Check user authentication status or perform any other logic
    const isAuthenticated = true; 

    // Sample response
    if (isAuthenticated) {
      // Fetch news from the News API
      const apiKey = process.env.NEWS_API_KEY;
      const response = await axios.get(`https://newsapi.org/v2/everything?q=meditation&apiKey=${apiKey}`);
      
      // Send the news data to the frontend
      res.status(200).json({
        Status: 'Success',
        Fullname: req.Fullname, // Using Fullname from the middleware
        id: req.id,
        articles: response.data.articles,
      });
    } else {
      res.status(401).json({
        Status: 'Error',
        Error: 'User not authenticated', // Replace with an appropriate error message
      });
    }
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({
      Status: 'Error',
      Error: 'Internal Server Error',
    });
  }
});

module.exports = router;

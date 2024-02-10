// signup.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../database');

router.post('/', (req, res) => {
  const saltRounds = 10;
  const sqlUsers = "INSERT INTO users (username, Fullname, email, hashedPassword, date_of_joining) VALUES (?, NOW())";

  bcrypt.hash(req.body.password.toString(), saltRounds, (err, hash) => {
    if (err) return res.json({ Error: "Error for hashing password" });

    const valuesUsers = [
      req.body.username,
      req.body.Fullname,
      req.body.email,
      hash
    ];

    db.query(sqlUsers, [valuesUsers], (err, result) => {
      if (err) {
        console.error('Error inserting data into users table:', err);
        return res.json({ Error: "Inserting data error in server" });
      }
        console.log('Data inserted successfully');
        return res.json({ Status: "Values entered successfully" });
      
    });
  });
});

module.exports = router;

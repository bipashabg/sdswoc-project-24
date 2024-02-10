const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../database');

router.post('/', async (req, res) => {
  const { email, password } = req.body;
  const sql = 'SELECT * FROM users WHERE email = ?';

  db.query(sql, [email], async (err, data) => {
    if (err) {
      console.error('Login error in server:', err);
      return res.status(500).json({ Error: "Login error in server" });
    }

    if (data.length > 0) {
      const user = data[0];
      bcrypt.compare(password.toString(), user.hashedPassword, async (err, response) => {
        if (err) {
          console.error('Password compare error:', err);
          return res.status(500).json({ Error: "Password compare error" });
        }

        if (response) {
          const username = user.username;

          // Update last_online to the current date and time
          const updateLastOnlineSql = 'UPDATE users SET last_online = CURRENT_TIMESTAMP WHERE username = ?';

          db.query(updateLastOnlineSql, [username], (updateLastOnlineErr, updateLastOnlineResult) => {
            if (updateLastOnlineErr) {
              console.error('Error updating last_online:', updateLastOnlineErr);
              return res.status(500).json({ Error: "Error updating last_online" });
            }

            // Generate and update jwtToken
            const token = jwt.sign({ username }, "jwt-secret-key", { expiresIn: '1d' });
            const updateJwtTokenSql = 'UPDATE users SET jwtToken = ? WHERE username = ?';

            db.query(updateJwtTokenSql, [token, username], (updateJwtTokenErr, updateJwtTokenResult) => {
              if (updateJwtTokenErr) {
                console.error('Error updating jwtToken:', updateJwtTokenErr);
                return res.status(500).json({ Error: "Error updating jwtToken" });
              }

              res.cookie('token', token);
              return res.json({ Status: "Success" });
            });
          });
        } else {
          return res.json({ Error: "Password not matched" });
        }
      });
    } else {
      return res.json({ Error: "Email doesn't exist" });
    }
  });
});

module.exports = router;

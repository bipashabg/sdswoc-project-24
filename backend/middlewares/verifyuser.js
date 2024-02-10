const jwt = require('jsonwebtoken');
const db = require('../database');

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  console.log('Received token:', token);

  if (!token) {
    return res.json({ Error: "You are not authenticated" });
  } else {
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if (err) {
        console.error('Token verification error:', err);
        return res.json({ Error: "Token is not valid" });
      } else {
        const sql = 'SELECT Fullname, id FROM users WHERE username = ?';
        db.query(sql, [decoded.username], (queryErr, result) => {
          if (queryErr) {
            console.error('Error fetching Fullname from the database:', queryErr);
            return res.status(500).json({ Error: "Internal server error" });
          }

          if (result.length > 0) {
            req.Fullname = result[0].Fullname;
            req.id = result[0].id;
            console.log('Token decoded successfully:', decoded);
            req.username = decoded.username;
            next();
          } else {
            return res.json({ Error: "User not found" });
          }
        });
      }
    });
  }
};

module.exports = verifyUser;

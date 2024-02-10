const jwt = require('jsonwebtoken');
const db = require('../database');

const userprofileVerify = (req, res, next) => {
  const token = req.cookies.token;
  console.log('Received token:', token);

  if (!token) {
    return res.json({ Error: "You are not authenticated" });
  } else {
    jwt.verify(token, "jwt-secret-key", async (err, decoded) => {
      if (err) {
        console.error('Token verification error:', err);
        return res.json({ Error: "Token is not valid" });
      } else {
        console.log('Token decoded successfully:', decoded);

        // Fetch Fullname from the database based on the decoded username
        const username = decoded.username;

        //mood
        const moodquery = 'SELECT date, mood, intensity, note FROM moods WHERE user_id = ?';

        db.query(moodquery, [req.id], (moodErr, moodResults) => {
          if (moodErr) {
            console.error('Error fetching mood results:', moodErr);
            return res.status(500).json({Error: "Internal server error"});
          }

          if (moodResults.length > 0) {
            req.date = moodResults[0].date;
            req.mood = moodResults[0].date;
            req.intensity = moodResults[0].date;
            req.note = moodResults[0].note;

            console.log('Mood Tracker Results: ', moodResults)
          }
        })

        // Update the SQL query 
        const sql = 'SELECT Fullname, id, about_me, last_online, date_of_joining FROM users WHERE username = ?';

        db.query(sql, [username], (queryErr, result) => {
          if (queryErr) {
            console.error('Error fetching details from the database:', queryErr);
            return res.status(500).json({ Error: "Internal server error" });
          }

          if (result.length > 0) {
            req.Fullname = result[0].Fullname;
            req.last_online = result[0].last_online;
            req.date_of_joining = result[0].date_of_joining;
            req.username = decoded.username;
            req.about_me = result[0].about_me;
            req.id = result[0].id;

            console.log('User ID from middleware:', req.id);
            console.log('User Profile Data:', req);

            // Fetch Mental Health Quiz stats
            const quizResultsQuery = 'SELECT depression, anxiety, stress, created_at FROM quiz_results WHERE user_id = ? ORDER BY created_at DESC LIMIT 1';

            db.query(quizResultsQuery, [req.id], (quizErr, quizResults) => {
              if (quizErr) {
                console.error('Error fetching quiz results:', quizErr);
                return res.status(500).json({ Error: "Internal server error" });
              }

              if (quizResults.length > 0) {
                req.depression = quizResults[0].depression;
                req.stress = quizResults[0].stress;
                req.anxiety = quizResults[0].anxiety;
                req.created_at = quizResults[0].created_at;

                console.log('Quiz Results: ', quizResults);
              } 
              next();
            });
          } else {
            return res.json({ Error: "User not found" });
          }
        });
      }
    });
  }
};

module.exports = userprofileVerify;
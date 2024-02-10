const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const db = require('./database');
const axios = require("axios");
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["POST", "GET"],
  credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.json());


// Database connection
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// Routes
const userprofileRoutes = require('./routes/userprofile');
const quizRoutes = require('./routes/quiz');
const signupRoutes = require('./routes/signup');
const loginRoutes = require('./routes/login');
const homeRoutes = require('./routes/home');
const moodtrackerRoutes = require('./routes/moodtracker');
const affirmationsRoutes = require('./routes/affirmations');
const communityRoutes = require('./routes/community')
const virtualretreatRoutes = require('./routes/virtualretreat')
const gamepageRoutes = require('./routes/gamepage')

app.use('/profile', userprofileRoutes)
app.use('/quizpage', quizRoutes);
app.use('/signup', signupRoutes);
app.use('/login', loginRoutes);
app.use('/', homeRoutes);
app.use('/moodtracker', moodtrackerRoutes);
app.use('/positive', affirmationsRoutes);
app.use('/communitypage', communityRoutes);
app.use('/virtual', virtualretreatRoutes)
app.use('/games', gamepageRoutes)

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password',
  },
});

// Forgot password endpoint
app.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  console.log(email)

  // Check if the email exists in the database
  const userExistsQuery = 'SELECT * FROM users WHERE email = ?';
  db.query(userExistsQuery, [email], async (error, results) => {
    if (error) {
      console.error('Error checking if user exists:', error);
      return res.status(500).send('Internal Server Error');
    }

    if (results.length === 0) {
      return res.status(404).send('User not found');
    }

    // Generate a unique token
    const token = crypto.randomBytes(20).toString('hex');
    const expirationTime = new Date(Date.now() + 3600000); // Token expires in 1 hour

    // Store the token and its expiration time in the users table
    const insertTokenQuery = 'UPDATE users SET reset_token = ?, reset_token_expires_at = ? WHERE email = ?';

    db.query(insertTokenQuery, [token, expirationTime, email], async (error) => {
      if (error) {
        console.error('Error updating reset token:', error);
        return res.status(500).send('Internal Server Error');
      }

      // Send reset email with the token
      const resetLink = `http://localhost:3000/reset-password?token=${token}`;
      const mailOptions = {
        from: 'bipashagayary@gmail.com',
        to: email,
        subject: 'Password Reset',
        text: `Click on the following link to reset your password: ${resetLink}`,
      };

      try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('Reset email sent successfully');
      } catch (emailError) {
        console.error('Error sending reset email:', emailError);
        return res.status(500).send('Internal Server Error');
      }
    });
  });
});

// Logout endpoint
app.get('/logout', (req, res) => {
  res.clearCookie('token');
  return res.redirect('/');
});
 
// POST request to update About Me
app.post('/updateAboutMe', (req, res) => {
    const { username, aboutMe } = req.body;
  
    // Perform the update in the users table using username
    const updateAboutMeQuery = 'UPDATE users SET about_me = ? WHERE username = ?';
  
    db.query(updateAboutMeQuery, [aboutMe, username], (error, results) => {
      if (error) {
        console.error('Failed to update About Me:', error);
        res.status(500).json({ Status: 'Error', Error: 'Failed to update About Me.' });

      } else {
        res.json({ Status: 'Success', message: 'About Me updated successfully.' });
      }
    });
  });

 // Define a route to handle storing results
 app.post('/results', (req, res) => {
    // Log the received data
    console.log('Received data:', req.body);
  
    // Destructure the received data
    const { username, resultsData } = req.body;
    console.log('Received data:', username, resultsData);
  
    // Destructure the relevant data from resultsData
    const { labels, datasets } = resultsData;
    const [depression, stress, anxiety] = datasets[0].data;
  
    // Insert data into the quiz_results table
    const query = 'INSERT INTO quiz_results (user_id, depression, stress, anxiety) VALUES ((SELECT id FROM users WHERE username = ?), ?, ?, ?)';
  
    // Use db.query to execute the query
    db.query(query, [username, depression, stress, anxiety], (error, results) => {
      if (error) {
        console.error('Error storing results in the database:', error);
        res.status(500).json({ status: 'Error', message: 'Failed to store results in the database', error });
      } else {
        console.log('Results updated in the database');
        return res.status(200).json({ status: 'Success', message: 'Results updated in the database' });
      }
    });
});

//mood tracker data

app.post('/moods', (req, res) => {
  const { username, date, mood, intensity, note } = req.body;
  console.log('Mood data to be inserted:', username, date, mood, intensity, note);

  // Insert mood tracker data into the moods table
  const moodQuery = 'INSERT INTO moods (user_id, date, mood, intensity, note) VALUES ((SELECT id FROM users WHERE username = ?), ?, ?, ?, ?)';

  db.query(moodQuery, [username, date, mood, intensity, note], (error, results) => {
    if (error) {
      console.error('Error storing mood data in the database:', error);
      res.status(500).json({ status: 'Error', message: 'Failed to store mood data in the database', error });
    } else {
      console.log('Mood data updated in the database');
      return res.status(200).json({ status: 'Success', message: 'Mood data updated in the database' });
    }
  });
});

//intensity data

app.get('/intensity', async (req, res) => {
  console.log('Intensity Data Request Received:', req.query);


  try {
    // Convert the JavaScript Date object to a string using toISOString
    // const isoDateString = new Date(req.query.date).toISOString();
    const isoDateString = req.query.date;
    console.log('Converted ISO Date String:', isoDateString);

    // const response = await axios.get(`http://localhost:3001/intensity?date=${format(isoDateString, 'yyyy-MM-dd')}`);
    
    // console.log('Intensity Data Response:', response.data);
    //res.json(response.data);
  } catch (error) {
    console.error('Error fetching intensity data:', error);
    res.status(500).json({ error: 'Error fetching intensity data' });
  }
});




app.listen(3001, () => {
  console.log(`Server is running on port ${port}`);
});

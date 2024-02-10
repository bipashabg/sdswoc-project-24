import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/moodtracker.css';

const emotions = [
  'Happy',
  'Sad',
  'Stressed',
  'Calm',
  'Anxious',
  'Excited',
  'Proud',
];

const MoodTracker = () => {
  const [userData, setUserData] = useState({ date: '', intensity: '', mood: '', note: ''});
  const [date, setDate] = useState(new Date());
  const [mood, setMood] = useState('Calm');
  const [intensity, setIntensity] = useState(5);
  const [note, setNote] = useState('');
  const [chartData, setChartData] = useState(getInitialChartData());
  const navigate = useNavigate();
  const [auth, setAuth] = useState(false);
  axios.defaults.withCredentials = true;
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Check if the user is authenticated when the component mounts
    axios.get('http://localhost:3001/moodtracker')
      .then(res => {
        if (res.status === 200) {
          const data = res.data;
          console.log('Response from /moodtracker:', data);
          if (res.data.Status === "Success") {
            setAuth(true);
            setUserData({
              date: data.date || '',
              mood: data.mood || '',
              intensity: data.intensity || '',
              note: data.note || '',
            });

            //set states
            setDate(data.date || '');
            setMood(data.mood || '');
            setIntensity(data.intensity || '');
            setNote(data.note || '');

          } else {
            setAuth(false);
          }
        } else {
          setAuth(false);
        }
      })
      .catch(err => {
        console.log('Error fetching /moodtracker', err);
        setAuth(false);
      });
  }, []);

  const fetchUsername = async () => {
    try {
      const response = await axios.get('http://localhost:3001'); // Adjust the endpoint URL
      setUsername(response.data.username);
    } catch (error) {
      console.error('Error fetching username:', error);
    }
  };

  fetchUsername();

  function getInitialChartData() {
    return {
      labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      datasets: emotions.map((emotion) => ({
        label: emotion,
        data: [],
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 2,
        pointRadius: 5,
      })),
    };
  }

  useEffect(() => {
    const fetchChartData = async () => {
      const intensityData = await fetchIntensityDataForDate(date);

      const updatedChartData = {
        ...chartData,
        datasets: emotions.map((emotion, index) => {
          const dataPoint = {
            x: date.toISOString(), // Store the date as it is
            y: intensityData[emotion],
          };

          return {
            ...chartData.datasets[index],
            data: [...chartData.datasets[index].data, dataPoint],
          };
        }),
      };

      setChartData(updatedChartData);
    };

    fetchChartData();
  }, [date]);


  const fetchIntensityDataForDate = async (date) => {
    try {
      console.log(date);
      // Convert the JavaScript Date object to a string using toISOString
      const isoDateString = date.toISOString();

      const response = await axios.get(`http://localhost:3001/intensity?date=${isoDateString}`);
      return response.data; // Assuming response.data is an object with emotions as keys
    } catch (error) {
      console.error('Error fetching intensity data:', error);
      return {};
    }
  };


  const options = {
    tooltips: {
      callbacks: {
        label: (tooltipItem, data) => {
          const emotion = data.datasets[tooltipItem.datasetIndex].label;
          const intensity = tooltipItem.yLabel;
          const note = getNoteForDataPoint(date, emotion, intensity);
          return `${emotion}: Intensity ${intensity} - Note: ${note}`;
        },
      },
    },
  };

  const getNoteForDataPoint = async (date, emotion, intensity) => {
    try {
      // Convert the JavaScript Date object to a string using toISOString
      console.log('Date just before conversion:', date);
      const isoDateString = date.toISOString();

      const response = await axios.get(
        `http://localhost:3001/note?date=${isoDateString}&emotion=${emotion}&intensity=${intensity}`
      );
      return response.data.note;
    } catch (error) {
      console.error('Error fetching note data:', error);
      return '';
    }
  };

  const handleSave = async () => {
    try {
      const formattedDate = date.toISOString().slice(0, 19).replace('T', ' ');
      console.log(formattedDate);
      const response = await axios.post('http://localhost:3001/moods', {
        username,  // Include the username if necessary
        formattedDate,
        mood,
        intensity,
        note,
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error saving mood data:', error);
    }
  };
  

  return (
    <div>
      {auth ? (
        <div>
          <h1>Mood Tracker</h1>
          <div>
            <DatePicker selected={date} onChange={(date) => setDate(date)} dateFormat="MMMM d, yyyy" />
            <select value={mood} onChange={(e) => setMood(e.target.value)}>
              {emotions.map((emotion) => (
                <option key={emotion} value={emotion}>
                  {emotion}
                </option>
              ))}
            </select>
            <input
              type="range"
              min="1"
              max="10"
              value={intensity}
              onChange={(e) => setIntensity(parseInt(e.target.value, 10))}
            />
            <textarea
              placeholder="Optional notes..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
            <button onClick={handleSave}>Save</button>
          </div>
          <div>
            <Line data={chartData} options={options} />
          </div>
        </div>
      ) : (
        <div>
          <p>You are not authenticated. Please log in.</p>
          <Link to="/Login" className='btn btn-primary'>Login</Link>
        </div>
      )}
    </div>
  );
};


export default MoodTracker;

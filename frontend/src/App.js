import React from 'react'
import Login from './components/Login/Login'
import ForgotPassword from './components/forgotPassword/forgotPassword'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home/Home'
import Quiz from './components/Quiz/quiz'
import Signup from './components/Signup/Signup'
import Gamepage from './components/games/gamepage'
import Breathe from './components/BreathingExercise/BreathingExercise'
import Userprofile from './components/userprofile/userprofile'
import Affirmations from './components/affirmations/affirmations'
import Chatbot from './components/chatbot/chatbot'
import MoodTracker from './components/moodTracker/moodtracker'
import VirtualRetreat from './components/virtualretreat/virtualretreat'
import Community from './components/community/community'

function App() {
  return (
    //<div className='App'><button>Sign in with Google</button></div>
    <BrowserRouter>
      <Routes>
        <Route path='/ForgotPassword' element={<ForgotPassword />}></Route>
        <Route path='/Login' element={<Login />}></Route>
        <Route path='/Signup' element={<Signup />}></Route>
        <Route path='/Gamepage' element={<Gamepage />}></Route>
        <Route path='/Breathe' element={<Breathe />}></Route>
        <Route path= '/Quiz' element={<Quiz />}></Route>
        <Route path= '/Userprofile' element={<Userprofile />}></Route>
        <Route path= '/Affirmations' element={<Affirmations />}></Route>
        <Route path= '/Chatbot' element={<Chatbot />}></Route>
        <Route path= '/MoodTracker' element={<MoodTracker />}></Route>
        <Route path= '/VirtualRetreat' element={<VirtualRetreat />}></Route>
        <Route path= '/Community' element={<Community />}></Route>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

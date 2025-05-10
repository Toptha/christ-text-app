import { useState, useEffect } from 'react'
import './App.css'
import DeanerySelector from './components/DeanerySelector'
import Login from './components/login'
import Signup from './components/Signup'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setIsSignup(false); 
  };

  const handleSignup = () => {
    setIsLoggedIn(true);
    setIsSignup(true); 
  };

  useEffect(() => {
    const email = localStorage.getItem('email');
    if (email) setIsLoggedIn(true);
  }, []);
  
  return (
    <Router>
      {!isLoggedIn ? (
        <Routes>
          <Route path="/" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
        </Routes>
      ) : (
        <DeanerySelector isSignup={isSignup} />
      )}
    </Router>
  );
}

export default App


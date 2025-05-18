import { useState, useEffect } from 'react';
import './App.css';
import DeanerySelector from './components/DeanerySelector';
import Login from './components/login';
import Signup from './components/Signup';
import Chatbox from './components/Chatbox'; 
import ProfilePage from './components/ProfilePage';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const now = Date.now() / 1000;

        if (decoded.exp > now) {
          setIsLoggedIn(true);
        } else {
          localStorage.removeItem('token');
          localStorage.removeItem('email');
          setIsLoggedIn(false);
        }
      } catch (err) {
        console.error('Token decoding failed:', err);
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        setIsLoggedIn(false);
      }
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setIsSignup(false);
  };

  const handleSignup = () => {
    setIsLoggedIn(true);
    setIsSignup(true);
  };

  return (
    <Router>
      <Routes>
        {!isLoggedIn ? (
          <>
            <Route path="/" element={<Login onLogin={handleLogin} />} />
            <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : isSignup ? (
          <>
            <Route path="/" element={<DeanerySelector isSignup={true} />} />
            <Route path="/chat" element={<Chatbox />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            <Route path="/chat" element={<Chatbox />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<Navigate to="/chat" />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;

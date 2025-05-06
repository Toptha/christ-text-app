import { useState } from 'react'
import './App.css'
import DeanerySelector from './components/DeanerySelector'
import Login from './components/login'
import Signup from './components/Signup'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      {!isLoggedIn ? (
        <Routes>
          <Route path="/" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      ) : (
        <DeanerySelector />
      )}
    </Router>
  );
}

export default App


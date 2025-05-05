import { useState } from 'react'
import './App.css'
import DeanerySelector from './components/DeanerySelector'
import Login from './components/Login'
function App() {
  const [isLoggedIn, setIsLoggedIn]=useState(false)
  const handleLogin = () => {
    setIsLoggedIn(true); // Set user as logged in
  };
  return (
    <>
    {isLoggedIn ? (<DeanerySelector/>):(<Login onLogin={handleLogin}/>)}
    </>
  )
}
export default App

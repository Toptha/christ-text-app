import { useState } from 'react'
import './App.css'
import DeanerySelector from './components/DeanerySelector'
import Login from './components/login'
function App() {
  const [isLoggedIn, setIsLoggedIn]=useState(false)
  const handleLogin = () => {
    setIsLoggedIn(true); 
  };
  return (
    <>
    {isLoggedIn ? (<DeanerySelector/>):(<Login onLogin={handleLogin}/>)}
    </>
  )
}
export default App

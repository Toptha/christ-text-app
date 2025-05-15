import './styles/login.css'
import logo from '../assets/logo.png'
import { useState } from 'react'
import { Link } from 'react-router-dom';
function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    regNo: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSignup= async (e) => {
    e.preventDefault();
    const {email, regNo, password, confirmPassword}= formData;
    console.log(regNo);
    if (!email.endsWith('christuniversity.in')) {
      setError('Please enter a valid College Email ID.');
      return;
    }
    if (password!== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    try {
      const response= await fetch('https://christ-text-app-server.onrender.com/api/auth/signup', {
        method:'POST',
        headers:{ 'Content-Type': 'application/json' },
        body:JSON.stringify({ email, regNo, password }),
      });
  
      const data= await response.json();
      if (response.ok) {
        alert(data.message);
        localStorage.setItem('email', email);
        window.location.href= '/'; // redirect to login
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error(err);
      setError('Signup failed. Try again later.');
    }
  };
  
  return (
      <div className="app-container-1">
      <div className="box">
        <img src={logo} id="logo1" alt="Logo" />
        <form onSubmit={handleSignup}>
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required /><br />
          <input type="text" name="regNo" placeholder="Register No." value={formData.regNo} onChange={handleChange} required /><br />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required /><br />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required /><br />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required /><br />
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit">Sign Up</button>
          <p className='paragraph'>&nbsp;Already have an account?&nbsp;&nbsp;<Link to="/" className="link-style">Log In</Link></p>
        </form>
      </div>
      </div>
  );
}
export default Signup;
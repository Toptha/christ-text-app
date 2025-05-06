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
  const handleSignup = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.regNo || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('All fields are required.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!formData.email.endsWith('christuniversity.in')) {
      setError('Please enter a valid College Email ID.');
      return;
    }
    if (isNaN(formData.regNo)) {
      setError('Invalid Register No.');
      return;
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }
    setError('');
    alert('Signup successful!');
    window.location.href = '/';
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
          <p className='paragraph'><b>Already have an account? </b> <br/><Link to="/" style={{color:'#253440'}}>Log In</Link></p>
        </form>
      </div>
      </div>
  );
}
export default Signup;

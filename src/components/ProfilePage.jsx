import './styles/profile.css';
import logo from '../assets/logo.png';
import defaultAvatar from '../assets/default-avatar.png';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode'; 

function ProfilePage() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    name: '',
    regNo: '',
    email: '',
  });
  
  const [profileImage, setProfileImage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);  
        setUserDetails({
          name: localStorage.getItem('name') || '',
          regNo: decoded.regNo || '',
          email: decoded.email || '',
        });
      } catch (error) {
        console.error('Invalid token', error);
      }
    }

    const savedImage = localStorage.getItem('profileImage');
    if (savedImage) {
      setProfileImage(savedImage);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear(); 
    navigate('/', { replace: true }); 
    window.location.reload(); 
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result);
      localStorage.setItem('profileImage', reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="app-container-4">
      <div className="box">
        <img src={logo} id="logo" alt="logo" />
        <h1 className="title">PROFILE</h1>
        <hr className="title" />
        <div className="profile-pic-wrapper">
          <img
            src={profileImage || defaultAvatar}  
            alt="Profile"
            className="profile-pic"
          />
          <label htmlFor="profile-pic">
            <input
              type="file"
              id="profile-pic"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
            <span className="edit-photo">Edit Photo</span>
          </label>
        </div>
        <div className="info-container">
          <div className="info">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Name"
              value={userDetails.name}
              disabled
              readOnly
            />
            <label htmlFor="reg-no">Register Number</label>
            <input
              type="text"
              id="reg-no"
              placeholder="Register Number"
              value={userDetails.regNo}
              disabled
              readOnly
            />
            <label htmlFor="email">Email Address</label>
            <input
              type="text"
              id="email"
              placeholder="Email"
              value={userDetails.email}
              disabled
              readOnly
            />
          </div>
        </div>
        <button onClick={handleLogout} style={{ marginTop: '20px' }}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;

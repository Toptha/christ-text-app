import './styles/profile.css';
import logo from '../assets/logo.png';
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

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserDetails({
          name: decoded.name || localStorage.getItem('name') || '',
          regNo: decoded.regNo || '',
          email: decoded.email || '',
        });
      } catch (error) {
        console.error('Invalid token', error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear(); 
    navigate('/', { replace: true }); 
    window.location.reload(); 
  };

  const handleImageUpload = async (e) => {
    console.log(e);
  };

  return (
    <>
      <div className="app-container-4">
        <div className="box">
          <img src={logo} id="logo" alt="logo" />
          <h1 className="title">PROFILE</h1>
          <hr className="title" />
          <div className="profile-pic-wrapper">
            <img
              src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAPDRANEA0NDw0QDg0NDw0NDg8NDQ0OIBEWFhYRFRMZHCggGBolGxMTITEhJSkrLi4uFx8zODMsNygtLisBCgoKDQ0NDw8NFSsZFRkrKys3LTcrNystLSsrKystLS0tLSs3NysrKzctKysrKysrKysrKysrKysrLSsrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAAAQQFBgMCB//EADQQAQACAAMFAg0FAQEAAAAAAAABAgMFEQQhMUFREnEVIjIzUmGBkqGxssHREyNCcoKRc//EABYBAQEBAAAAAAAAAAAAAAAAAAABAv/EABYRAQEBAAAAAAAAAAAAAAAAAAABEf/aAAwDAQACEQMRAD8A/RAG2QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfX6kgPkAAAAAAAAAAAAECpEJEAAAAAAAAAAAAAAAAAAAAAAAAK8dObR2TKrW33nSOURxe+U7DER+pbfaeETyhqM2qq4WX4VeFdZ6zMrEYdY/jH/H0Ir4tgUnjWN6nj5XS0eLHZn1TuXwHNbTsd8PjGscpjg8HVYlItWazwmNHPbds04V9ONZ31lqVFYSSqIAAAAAAAAAAAAAAAAAAXMr2eL33xrWu+VKW7kuHphdrnMpVaERyEjKoEoABIIVtu2eMSk7t8b4npK0iQcnPHRMrGY4cVxrREcd/qV20QAIAAAAAAAAAAAAAAAAh02xRphV5eLEuZdRs3m6f1r8kqvYQllQAAABEpRIMXO40vWdOMT7eDOaee+Vh91vszFiIAaQAAAAAAAAAAAAAAABDpMuxO1hVn1afZzjWyTHjxsOePlR00Sq1xCWVAAAAESl83tpGs8IBh51i64sV6R+FCHptWJ272t1mZjXlDyhpEgKgAAAAAAAAAAAAAAAA+8DEml4vHGJfBArqNnxovWLRMevTlL1c5sG2fpW59meMfd0GHiRaItE6xLKvsBAAAZWb7XunCjju7XzWMw22MOsxG+8xMRpynrLAtaZmZmdZnisggBpkAAAAAAAAAAAAAAAAAATCEwKh67PtV8PyZ3dJ3w80aINbZ845Xr7YWYzbC9K3u2/Dnwwbt83w44az03THzUsXNcS3DSsfFQQYPq9pmZmZmZnqhCVQAAAAAAAAAAAAAAAAAgB9YeHNp0rEz7Ny9sOW9vxr6xXdpHOWzhYFaRpWsQmrjHwMptO+09mOi5TKMOOM3n2xH2aAmqpeC8Lpb3pPBeF6M+9K6IKXgrC9GfelHgvC9GfeleAUfBWF6M+9KfBeF6M+9K6Ao+CsL0Z96XzbKMOeE3jumPvDQDRk3yWP44k+2uqpjZZi1/j2o61nX4cXQi6Y5K0TE6TExPSd0jqMfZ6XjS1Yn1847pYe3ZfbD8aPGp15171lRTAVAAAAAAAAAACGtl2XcL39kK+U7N27dqeFfm34hm1URCQRUJAAAAAAAAAAABExru5JAYOZ7D+nPbr5E8vRn8KDq70i0TWY1iY0mHNbXgTh3mk98T1jlLUqPEBUAAAAAAE0rMzERxmYiEL+TYPaxe1ypGvt5fcqtjZNnjDpFY75nrPOXsDCgAAAAAAAAAAAAAAADOzrA7WH24414/wBWi+ManaravWsx8AcqIS2yAAAAAANvIq/t2nrfT4R+WI38mj9mPXa0/FKsXgGVAAAAAAAAAAAAAAAAAAcrtFdL3jpe0fGXw9dr87if+l/ql5NoACAAAADoco8xX/X1S550GUeYr32+qUqxdAZUAAAAAAAAAAAAAAAACQHM7dH72J/e3zeCzmUaY9++J+EKzaAAgAAAA6DKPMV77fVIJVi6AyoAAAAAAAAAAAAAAACJISA53NfP3/z9MKgNxAAQAB//2Q=="
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
    </>
  );
}

export default ProfilePage;

import { useState, useEffect } from 'react';
import './styles/deanery.css';
import logo from '../assets/logo.png';
import ProfList from './ProfList';

function DeanerySelector({ isSignup }) {
  const [deanery, setDeanery] = useState('');
  const [department, setDepartment] = useState('');
  const [showProfList, setShowProfList] = useState(false);

  useEffect(() => {
    const updateAndShowProfList = async () => {
      if (deanery && department) {
        if (isSignup) {
          const email = localStorage.getItem('email');
          try {
            const res = await fetch('https://christ-text-app-server.onrender.com/api/user/update', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email, deanery, department }),
            });

            const data = await res.json();
            console.log('Update response:', data);
          } catch (err) {
            console.error('Error saving user info:', err);
          }
        }
        setShowProfList(true);
      }
    };

    updateAndShowProfList();
  }, [deanery, department]);

  if (showProfList) {
    return <ProfList deanery={deanery} department={department} />;
  }

  return (
    <div className="app-container-2">
      <div className="box">
        <img src={logo} id="logo" alt="logo" /><br />
        <h1>Let's Get You Started</h1>
        <hr />
        <div className="selector">
          <h3>Choose Your Academic Division:</h3>
          <label htmlFor="deanery">Deanery</label><br />
          <select name="deanery" value={deanery} onChange={(e) => setDeanery(e.target.value)}>
            <option value="" disabled>Select Deanery</option>
            <option>School of Sciences</option>
          </select><br />
          <label htmlFor="department">Department</label><br />
          <select name="department" value={department} onChange={(e) => setDepartment(e.target.value)}>
            <option value="" disabled>Select Department</option>
            <option>Computer Science</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default DeanerySelector;

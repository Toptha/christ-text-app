import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/proflist.css';
import logo from '../assets/logo.png';
const ProfList = () => {
  const [professors, setProfessors] = useState([]);

  useEffect(() => {
    fetch('/ProfList.json')
      .then(response => response.json())
      .then(data => setProfessors(data))
      .catch(error => console.error('Error fetching professor data:', error));
  }, []);
  return (
    <div className="app-container-3">
      <div className="box">
        <img src={logo} id="logo" alt="logo"/>
        <h2 className="title">PROFESSORS</h2>
        <hr className="title"/>
        <div className="prof-list">
        {professors.map((prof, index) => (
          <div className={`professor ${index % 2 === 1 ? 'reverse' : ''}`} key={index}>
            <img src={prof.image} alt={prof.name} className="professor-image" />
            <div className="info">
              <p className="name">{prof.name}</p>
              <p className="position">{prof.position}</p>
              <p className="email">{prof.email}</p>
            </div>
          </div>
        ))}
        </div>
        <div id="chat-link">
        <Link to="/chat"><b>Click Here</b> to Start A Conversation</Link>
        <hr/>
        </div>
      </div>
      <div class="logout">
        <button id="logout-btn" onClick={() => {localStorage.removeItem('email');window.location.href = '/';}}>Logout</button><hr/>
       </div>
    </div>
  );
};

export default ProfList;
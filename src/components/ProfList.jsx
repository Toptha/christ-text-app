import React, { useEffect, useState } from 'react';
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
        {professors.map((prof, index) => (
          <div className="professor" key={index}>
            <img src={prof.image} alt={prof.name} className="professor-image" />
            <div className="info">
              <p className="name">{prof.name}</p>
              <p className="position">{prof.position}</p>
              <p className="email">{prof.email}</p>
            </div>
            <button className="chat-button">Chat</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfList;

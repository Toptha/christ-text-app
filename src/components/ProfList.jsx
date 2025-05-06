import React, { useEffect, useState } from 'react';
import '../styles/ProfList.css';

const ProfList = () => {
  const [professors, setProfessors] = useState([]);

  useEffect(() => {
    fetch('/professors.json')
      .then(response => response.json())
      .then(data => setProfessors(data))
      .catch(error => console.error('Error fetching professor data:', error));
  }, []);
  return (
    <div className="app-container">
      <div className="professor-card">
        <h2 className="title">PROFESSORS</h2>
        {professors.map((prof, index) => (
          <div className="professor" key={index}>
            <div className="info">
              <p className="name">{prof.name}</p>
              <p className="subject">{prof.subject}</p>
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

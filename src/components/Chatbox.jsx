import React, { useEffect, useState } from 'react';
import './styles/chatbox.css';
import EmojiPicker from 'emoji-picker-react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
const Chatbox = () => {
  const [professors, setProfessors] = useState([]);
  const [filteredProfs, setFilteredProfs] = useState([]);
  const [selectedProf, setSelectedProf] = useState(null);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  useEffect(() => {
    fetch('/ProfList.json')
      .then(res => res.json())
      .then(data => {
        const initialized = data.map(prof => ({ ...prof, messages: [] }));
        setProfessors(initialized);
        setFilteredProfs(initialized);
      })
      .catch(err => console.error('Error loading prof list:', err));
  }, []);

  const handleSelectProf = (prof) => {
    setSelectedProf(prof);
    setInput('');
    setIsTyping(false);
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const updated = professors.map(prof => {
      if (prof.name === selectedProf.name) {
        return {
          ...prof,
          messages: [...prof.messages, {
            text: input,
            sender: 'student',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          }],
        };
      }
      return prof;
    });

    setProfessors(updated);
    setFilteredProfs(updated);
    setSelectedProf(updated.find(p => p.name === selectedProf.name));
    setInput('');
    setIsTyping(false);
  };

  const handleSearch = (e) => {
    const val = e.target.value.toLowerCase();
    setFilteredProfs(professors.filter(p => p.name.toLowerCase().includes(val)));
  };

  const handleEmojiClick = (emojiData) => {
    setInput(prev => prev + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  return (
    <>
    <div className="chat-container">
    <div className="box">
      <div className="sidebar">
        <div className="sidebar-header">
          <img src={logo} id="logo-2" alt="logo"/>
          <Link to="/profile"><img src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=800" alt="profile" className="profile-pic right" id="profile-link"/></Link>
        </div>
        <input
          type="text"
          placeholder="Search Professors"
          className="search-input"
          onChange={handleSearch}
        />
        <div className="contacts">
          {filteredProfs.map((prof, index) => (
            <div
              key={index}
              className={`contact ${selectedProf?.name === prof.name ? 'active' : ''}`}
              onClick={() => handleSelectProf(prof)}
            >
              <img src={prof.image} alt={prof.name} />
              <div>
                <p>{prof.name}</p>
                <span>{prof.position}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="chatbox">
        {selectedProf ? (
          <>
            <div className="chat-header">
              <img src={selectedProf.image} alt={selectedProf.name} />
              <h3>{selectedProf.name}</h3>
            </div>

            <div className="chat-messages">
              {selectedProf.messages.length === 0 ? (
                <div className="no-messages">Start the conversation</div>
              ) : (
                selectedProf.messages.map((msg, idx) => (
                  <div className={`message ${msg.sender}`} key={idx}>
                    <p>{msg.text}</p>
                    <span>{msg.time}</span>
                  </div>
                ))
              )}
              {isTyping && <div className="typing-animation">Typing<span>.</span><span>.</span><span>.</span></div>}
            </div>

            <div className="chat-input">
              <button id="emoji-button" onClick={() => setShowEmojiPicker(!showEmojiPicker)}><i class="fa-regular fa-face-smile"></i></button>
              <label className="upload-icon"><i class="fa-regular fa-image"></i>
                <input
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) setInput(file.name);
                  }}
                />
              </label>
              <input
                type="text"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  setIsTyping(true);
                  setTimeout(() => setIsTyping(false), 1500);
                }}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button onClick={handleSend}>Send</button>
            </div>

            {showEmojiPicker && (
              <div className="emoji-picker">
                <EmojiPicker onEmojiClick={handleEmojiClick} />
              </div>
            )}
          </>
        ) : (
          <div className="no-selection">Select a professor to start chatting</div>
        )}
      </div>
    </div>
    </div>
    </>
  );
};

export default Chatbox;

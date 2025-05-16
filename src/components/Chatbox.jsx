import React, { useEffect, useState } from 'react';
import './chatbox.css';
import profData from './ProfList.json';
import EmojiPicker from 'emoji-picker-react';

const Chatbox = () => {
  const [professors, setProfessors] = useState([]);
  const [filteredProfs, setFilteredProfs] = useState([]);
  const [selectedProf, setSelectedProf] = useState(null);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  useEffect(() => {
    const initialized = profData.map(prof => ({ ...prof, messages: [] }));
    setProfessors(initialized);
    setFilteredProfs(initialized);
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
    <div className="chat-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <h2 className="logo">UniVerse</h2>
          <img src="https://i.pravatar.cc/150?img=11" alt="profile" className="profile-pic right" />
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
              <button onClick={() => setShowEmojiPicker(!showEmojiPicker)}>😊</button>
              <label className="upload-icon">
                📎
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
  );
};

export default Chatbox;

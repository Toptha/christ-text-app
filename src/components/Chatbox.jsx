import React, { useEffect ,useState, useRef } from 'react';
import { io } from 'socket.io-client';
import './styles/chatbox.css';
import EmojiPicker from 'emoji-picker-react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Chatbox = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const currentUser = localStorage.getItem('email') || '';
  const typingTimeout = useRef(null);

  const socket = useRef(null);

useEffect(() => {
  socket.current = io('https://christ-text-app-server.onrender.com');
  socket.current.emit('join_room', currentUser);

  const messageListener = (message) => {
    if (
      (message.senderEmail === selectedUser?.email && message.receiverEmail === currentUser) ||
      (message.senderEmail === currentUser && message.receiverEmail === selectedUser?.email)
    ) {
      setMessages(prev => [...prev, message]);
    }
  };

  socket.current.on('receive_message', messageListener);

  return () => {
    socket.current.off('receive_message', messageListener);
    socket.current.disconnect();
  };
}, [currentUser, selectedUser]);


  const handleSearch = async () => {
    try {
        if (!searchQuery.trim()) {
          setUsers([]); 
          return;
        }
      const res = await fetch(`https://christ-text-app-server.onrender.com/api/search?search=${searchQuery}&currentUser=${currentUser}`);
      const data = await res.json();
      setUsers(data.users || []);
    } catch (err) {
      console.error('Error searching users:', err);
    }
  };

  const handleSelectUser = async (user) => {
    setSelectedUser(user);
    setInput('');
    setIsTyping(false);

    try {
      const res = await fetch(`https://christ-text-app-server.onrender.com/api/messages?user1=${currentUser}&user2=${user.email}`);
      const data = await res.json();
      setMessages(data.messages || []);
    } catch (err) {
      console.error('Error fetching messages:', err);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || !selectedUser) return;

    const message = {
      senderEmail: currentUser,
      receiverEmail: selectedUser.email,
      text: input,
    };

    try {
      const res = await fetch('https://christ-text-app-server.onrender.com/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(message),
      });

      if (res.ok) {
  const newMessage = { ...message, timestamp: new Date().toISOString() };
  setMessages(prev => [...prev, newMessage]);

  socket.current.emit('send_message', newMessage);
  
  setInput('');
}
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  const handleEmojiClick = (emojiData) => {
    setInput(prev => prev + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  const handleTyping = (e) => {
    setInput(e.target.value);
    setIsTyping(true);
    if (typingTimeout.current) clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => setIsTyping(false), 1500);
  };

  return (
    <div className="chat-container">
      <div className="box">
        <div className="sidebar">
          <div className="sidebar-header">
            <img src={logo} id="logo-2" alt="logo" />
            <Link to="/profile">
              <img
                src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="profile"
                className="profile-pic right"
                id="profile-link"
              />
            </Link>
          </div>

          <input
            type="text"
            placeholder="Search Users"
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button onClick={handleSearch} className="search-btn">Search</button>

          <div className="contacts">
            {users.map((user) => (
              <div
                key={user._id}
                className={`contact ${selectedUser?.email === user.email ? 'active' : ''}`}
                onClick={() => handleSelectUser(user)}
              >
                <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="user" />
                <div><p>{user.email}</p></div>
              </div>
            ))}
          </div>
        </div>

        <div className="chatbox">
          {selectedUser ? (
            <>
              <div className="chat-header">
                <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="user" />
                <h3>{selectedUser.email}</h3>
              </div>

              <div className="chat-messages">
                {messages.length === 0 ? (
                  <div className="no-messages">Start the conversation</div>
                ) : (
                  messages.map((msg, idx) => (
                    <div
                      className={`message ${msg.senderEmail === currentUser ? 'student' : 'professor'}`}
                      key={msg._id || idx}
                    >
                      <p>{msg.text}</p>
                      <span>{msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}</span>
                    </div>
                  ))
                )}
                {isTyping && (
                  <div className="typing-animation">Typing<span>.</span><span>.</span><span>.</span></div>
                )}
              </div>

              <div className="chat-input">
                <button id="emoji-button" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                  <i className="fa-regular fa-face-smile"></i>
                </button>
                <label className="upload-icon">
                  <i className="fa-regular fa-image"></i>
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
                  onChange={handleTyping}
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
            <div className="no-selection">Search and select a user to start chatting</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chatbox;

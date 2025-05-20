import React, { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';
import './styles/chatbox.css';
import defaultAvatar from '../assets/default-avatar.png';
import EmojiPicker from 'emoji-picker-react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const faqData = {
  "General Queries": {
    "Class Timings": "Your class timings are available on your course portal.",
    "Attendance Policy": "You must maintain at least 75% attendance to be eligible for exams.",
    "Exam Schedule": "Exam schedules are released 2 weeks before the semester ends."
  },
  "Assignment Related": {
    "Deadline Extension": "Please contact your course instructor for deadline extensions.",
    "Submission Issues": "Ensure your file is under 10MB and in PDF format.",
    "Grading Queries": "Grades are published within 7 days of submission."
  },
  "Technical Support": {
    "Login Issues": "Try resetting your password using the 'Forgot Password' option.",
    "Website Not Working": "Clear cache or try using a different browser.",
    "File Upload Problem": "Ensure file size is below the limit and in accepted format."
  }
};

const Chatbox = () => {
  const profileImage = localStorage.getItem('profileImage') || defaultAvatar;
  const [searchQuery, setSearchQuery] = useState('');
  const [allUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showFAQ, setShowFAQ] = useState(true);
  const [faqLevel, setFaqLevel] = useState(0);
  const [faqHistory, setFaqHistory] = useState([]);
  const currentUser = localStorage.getItem('email') || '';
  const typingTimeout = useRef(null);
  const socket = useRef(null);

useEffect(() => {
  const delayDebounceFn = setTimeout(() => {
    const fetchSearchResults = async () => {
      if (!searchQuery.trim()) {
        setUsers(allUsers);
        return;
      }

      try {
        const res = await fetch(`https://christ-text-app-server.onrender.com/api/search?search=${searchQuery}&currentUser=${currentUser}`);
        const data = await res.json();
        setUsers(data.users || []);
      } catch (err) {
        console.error('Error searching users:', err);
      }
    };

    fetchSearchResults();
  }, 300);

  return () => clearTimeout(delayDebounceFn);
}, [searchQuery, currentUser, allUsers]);

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

useEffect(() => {
  const delayDebounceFn = setTimeout(() => {
    const fetchSearchResults = async () => {
      try {
        const res = await fetch(`https://christ-text-app-server.onrender.com/api/search?search=${searchQuery}&currentUser=${currentUser}`);
        const data = await res.json();
        setUsers(data.users || []);
      } catch (err) {
        console.error('Error searching users:', err);
      }
    };
    fetchSearchResults();
  }, 300);

  return () => clearTimeout(delayDebounceFn);
}, [searchQuery, currentUser]);

  const handleSelectUser = async (user) => {
    setSelectedUser(user);
    setInput('');
    setIsTyping(false);
    setShowFAQ(true);
    setFaqLevel(0);
    setFaqHistory([]);

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
        setShowFAQ(false);
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

  const handleFAQClick = (key) => {
    if (!selectedUser) return; // safety check

    if (faqLevel === 0) {
      // Student selects a category/topic
      // Show selected topic as student's message
      const studentMessage = {
        senderEmail: currentUser,
        receiverEmail: selectedUser.email,
        text: key,
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, studentMessage]);

      setFaqHistory([key]);
      setFaqLevel(1);
    } else if (faqLevel === 1) {
      // Student selects a question under a topic
      // Show selected question as student's message first
      const studentMessage = {
        senderEmail: currentUser,
        receiverEmail: selectedUser.email,
        text: key,
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, studentMessage]);

      // Then show teacher's answer as a message
      const teacherMessage = {
        senderEmail: selectedUser.email,  // teacher as sender
        receiverEmail: currentUser,
        text: faqData[faqHistory[0]][key],
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, teacherMessage]);

      setShowFAQ(false);
    }
  };

  const getFAQOptions = () => {
    if (faqLevel === 0) return Object.keys(faqData);
    if (faqLevel === 1) return Object.keys(faqData[faqHistory[0]]);
    return [];
  };

  return (
    <div className="chat-container">
      <div className="box">
        <div className="sidebar">
          <div className="sidebar-header">
            <img src={logo} id="logo-2" alt="logo" />
            <Link to="/profile">
              <img
                src={profileImage}
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
          />

          <div className="contacts">
            {users.map((user) => (
              <div
                key={user._id}
                className={`contact ${selectedUser?.email === user.email ? 'active' : ''}`}
                onClick={() => handleSelectUser(user)}
              >
                <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="user" />
                <div><p>{user.name || user.email}</p></div>
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
                      className={`message ${
                        msg.senderEmail === currentUser
                          ? 'student'
                          : msg.senderEmail === 'System'
                          ? 'system'
                          : 'professor'
                      }`}
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

              {showFAQ && (
                <div className="faq-box">
                  <h4>Select a topic:</h4>
                  <div className="faq-options">
                    {getFAQOptions().map((option, index) => (
                      <button key={index} onClick={() => handleFAQClick(option)}>{option}</button>
                    ))}
                  </div>
                </div>
              )}

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
                <button id="send-btn" onClick={handleSend}>
                  Send
                </button>
              </div>

              {showEmojiPicker && (
                <EmojiPicker
                  onEmojiClick={handleEmojiClick}
                  height={350}
                  width="100%"
                />
              )}
            </>
          ) : (
            <div className="no-user-selected">
              Select a user to start chatting
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chatbox;

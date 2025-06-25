import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import Message from './components/Message';
import axios from 'axios';

// API endpoint URL - replace with your actual API Gateway URL
const API_URL = 'https://<YOUR-API-ID>.execute-api.ap-southeast-1.amazonaws.com/prod/generate';

function App() {
  const [messages, setMessages] = useState([
    { type: 'system', content: 'Hello! I\'m Claude 3 Haiku. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = async () => {
    const message = input.trim();
    
    if (!message || isLoading) return;
    
    // Add user message to chat
    setMessages(prev => [...prev, { type: 'user', content: message }]);
    
    // Clear input
    setInput('');
    
    // Set loading state
    setIsLoading(true);
    
    try {
      // Send request to API
      const response = await axios.post(API_URL, { prompt: message });
      
      // Add AI response to chat
      setMessages(prev => [...prev, { type: 'ai', content: response.data.response }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        type: 'system', 
        content: 'Sorry, there was an error processing your request. Please try again.' 
      }]);
    } finally {
      // Reset loading state
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Claude 3 Haiku Chat</h1>
        <p>Ask a question and get a response from Claude 3 Haiku</p>
      </header>
      
      <main className="app-main">
        <div className="chat-container">
          <div className="messages-container">
            {messages.map((msg, index) => (
              <Message key={index} type={msg.type} content={msg.content} />
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="input-container">
            <textarea
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Type your message here..."
              disabled={isLoading}
              rows={3}
            />
            <button 
              onClick={handleSendMessage} 
              disabled={isLoading || !input.trim()}
              className="send-button"
            >
              {isLoading ? (
                <div className="loading-spinner"></div>
              ) : (
                'Send'
              )}
            </button>
          </div>
        </div>
      </main>
      
      <footer className="app-footer">
        <p>Powered by Amazon Bedrock and Claude 3 Haiku</p>
      </footer>
    </div>
  );
}

export default App;

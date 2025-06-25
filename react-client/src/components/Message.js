import React from 'react';
import './Message.css';

const Message = ({ type, content }) => {
  // Function to format content with basic markdown-like syntax
  const formatContent = (content) => {
    if (!content) return '';
    
    // Handle code blocks
    content = content.replace(/```([^`]+)```/g, '<pre><code>$1</code></pre>');
    
    // Handle inline code
    content = content.replace(/`([^`]+)`/g, '<code>$1</code>');
    
    // Handle bold text
    content = content.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    
    // Handle italic text
    content = content.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    
    // Convert line breaks to <br>
    content = content.replace(/\n/g, '<br>');
    
    return content;
  };

  return (
    <div className={`message ${type}`}>
      <div className="message-content">
        <div dangerouslySetInnerHTML={{ __html: formatContent(content) }} />
      </div>
    </div>
  );
};

export default Message;

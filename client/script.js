// API endpoint URL - replace with your actual API Gateway URL
const API_URL = 'https://YOUR-API-ID>.execute-api.ap-southeast-1.amazonaws.com/prod/generate';

// DOM elements
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const loadingSpinner = document.querySelector('.loading-spinner');

// Event listeners
sendButton.addEventListener('click', handleSendMessage);
userInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
    }
});

// Function to handle sending messages
async function handleSendMessage() {
    const message = userInput.value.trim();
    
    if (!message) return;
    
    // Add user message to chat
    addMessageToChat('user', message);
    
    // Clear input
    userInput.value = '';
    
    // Disable send button and show loading spinner
    sendButton.disabled = true;
    loadingSpinner.classList.remove('hidden');
    sendButton.querySelector('span').classList.add('hidden');
    
    try {
        // Send request to API
        const response = await sendMessageToAPI(message);
        
        // Add AI response to chat
        addMessageToChat('ai', response);
    } catch (error) {
        console.error('Error:', error);
        addMessageToChat('system', 'Sorry, there was an error processing your request. Please try again.');
    } finally {
        // Re-enable send button and hide loading spinner
        sendButton.disabled = false;
        loadingSpinner.classList.add('hidden');
        sendButton.querySelector('span').classList.remove('hidden');
    }
}

// Function to send message to API
async function sendMessageToAPI(message) {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt: message })
    });
    
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.response;
}

// Function to add message to chat
function addMessageToChat(type, content) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    
    // Process content for markdown-like formatting
    const formattedContent = formatContent(content);
    messageContent.innerHTML = formattedContent;
    
    messageDiv.appendChild(messageContent);
    chatMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Function to format content with basic markdown-like syntax
function formatContent(content) {
    if (!content) return '';
    
    // Convert line breaks to paragraphs
    let formatted = content
        .split('\n\n')
        .map(paragraph => paragraph.trim())
        .filter(paragraph => paragraph)
        .map(paragraph => `<p>${paragraph}</p>`)
        .join('');
    
    // Handle single line breaks
    formatted = formatted.replace(/<p>(.*?)\n(.*?)<\/p>/g, '<p>$1<br>$2</p>');
    
    // Handle code blocks
    formatted = formatted.replace(/```([^`]+)```/g, '<pre><code>$1</code></pre>');
    
    // Handle inline code
    formatted = formatted.replace(/`([^`]+)`/g, '<code>$1</code>');
    
    // Handle bold text
    formatted = formatted.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    
    // Handle italic text
    formatted = formatted.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    
    return formatted;
}

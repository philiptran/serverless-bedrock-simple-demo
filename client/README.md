# Claude 3 Haiku Chat Client

This is a simple web client for interacting with the Claude 3 Haiku model via Amazon Bedrock.

## Setup

1. Make sure your API is deployed and running
2. Update the `API_URL` in `script.js` with your actual API Gateway URL
3. Open `index.html` in a web browser

## Features

- Clean, responsive UI
- Real-time chat interface
- Support for basic markdown formatting (code blocks, bold, italic)
- Loading indicator during API calls

## Usage

Simply type your message in the text area and press Enter or click the Send button. The response from Claude 3 Haiku will appear in the chat.

## Local Development

To run this client locally, you can use a simple HTTP server:

```bash
# Using Python
python -m http.server

# Using Node.js
npx http-server
```

Then open your browser to `http://localhost:8000` (or whatever port your server is using).

## CORS Configuration

The API Gateway is already configured to allow CORS requests from any origin. If you're experiencing CORS issues, make sure your API Gateway has the proper CORS configuration.

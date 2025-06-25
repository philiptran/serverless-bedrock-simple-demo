# Claude 3 Haiku React Client

This is a React-based web client for interacting with the Claude 3 Haiku model via Amazon Bedrock.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Make sure your API is deployed and running

3. Update the `API_URL` in `src/App.js` with your actual API Gateway URL

4. Start the development server:
   ```bash
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser

## Features

- Modern React implementation
- Clean, responsive UI
- Real-time chat interface
- Basic markdown formatting support
- Loading indicator during API calls

## Building for Production

To build the app for production:

```bash
npm run build
```

This creates an optimized production build in the `build` folder that you can deploy to any static hosting service.

## CORS Configuration

The API Gateway is already configured to allow CORS requests from any origin. If you're experiencing CORS issues, make sure your API Gateway has the proper CORS configuration.

# Serverless Bedrock Application

This project demonstrates a serverless application that uses Amazon Bedrock to interact with Claude 3 Haiku. It includes:

1. A serverless backend built with AWS CDK
2. A Lambda function that calls Claude 3 Haiku via Amazon Bedrock
3. An API Gateway endpoint to expose the Lambda function
4. Two client applications to interact with the API:
   - A simple HTML/CSS/JS client
   - A React-based client

## Architecture

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│             │     │             │     │             │     │             │
│  Web Client ├────►│ API Gateway ├────►│   Lambda    ├────►│   Bedrock   │
│             │     │             │     │             │     │             │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
```

## Backend Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Bootstrap your AWS environment:
   ```bash
   npx cdk bootstrap
   ```

3. Deploy the stack:
   ```bash
   npx cdk deploy
   ```

## Client Applications

### Simple HTML/CSS/JS Client

Located in the `client` directory. To run:

1. Open `client/index.html` in a web browser
2. Make sure the API_URL in `client/script.js` matches your deployed API Gateway URL

### React Client

Located in the `react-client` directory. To run:

1. Install dependencies:
   ```bash
   cd react-client
   npm install
   ```

2. Make sure the API_URL in `src/App.js` matches your deployed API Gateway URL

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## API Usage

The API accepts POST requests to the `/generate` endpoint with a JSON body containing a `prompt` field:

```json
{
  "prompt": "Explain quantum computing in simple terms"
}
```

The response will be a JSON object with a `response` field containing Claude's response:

```json
{
  "response": "Quantum computing is like..."
}
```

## Cleanup

To remove all deployed resources:

```bash
npx cdk destroy
```

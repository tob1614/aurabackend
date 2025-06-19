// A simple Express server to act as our backend
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors()); // Allows our website to talk to this backend
app.use(express.json()); // Allows us to read JSON data in requests

const PORT = process.env.PORT || 3001;

// A simple test route to make sure the server is working
app.get('/', (req, res) => {
  res.send('Aura AI Backend is live!');
});

// This is the endpoint our website will call
// It will eventually trigger our n8n workflow
app.post('/api/v1/trigger-agent', async (req, res) => {
    console.log('Received a request to trigger an agent.');

    // TODO: Add the n8n webhook URL here later
    // For now, we'll just log the request and send a success response.

    console.log('Request body:', req.body);

    res.status(200).json({ 
        message: "Request received by backend. n8n trigger will be implemented next.",
        dataReceived: req.body 
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

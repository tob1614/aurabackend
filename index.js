const express = require('express');
const cors = require('cors');
const axios = require('axios'); // We use axios to make requests

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

// This is the n8n webhook URL you set in the Render environment
const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL;

app.get('/', (req, res) => {
  res.send('Aura AI Backend is live! The trigger endpoint is ready.');
});

app.post('/api/v1/trigger-agent', async (req, res) => {
    console.log('Received a request to trigger an agent.');

    if (!N8N_WEBHOOK_URL) {
        console.error('N8N_WEBHOOK_URL is not set!');
        return res.status(500).json({ message: "Server configuration error: Webhook URL is missing." });
    }

    try {
        console.log(`Forwarding request to n8n at: ${N8N_WEBHOOK_URL}`);
        console.log('Data being sent:', req.body);

        // Forward the received data to the n8n webhook
        const n8nResponse = await axios.post(N8N_WEBHOOK_URL, req.body);

        console.log('Successfully triggered n8n workflow.');

        // Send a success response back to the original caller (your website)
        res.status(200).json({ 
            message: "Successfully triggered AI agent workflow.",
            n8nStatus: n8nResponse.status,
        });

    } catch (error) {
        console.error('Error triggering n8n workflow:', error.message);
        res.status(500).json({ message: "Failed to trigger AI agent workflow." });
    }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

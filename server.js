const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();
const port = 5000;

app.use(cors());

app.get('/api/proxy', async (req, res) => {
  const url = req.query.url;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data from external API:', error);
    res.status(500).json({ error: 'Error fetching data' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
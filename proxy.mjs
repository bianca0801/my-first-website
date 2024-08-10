import express from 'express';
import fetch from 'node-fetch';
import serverless from 'serverless-http';

const app = express();
const port = 3000;

app.get('/ip', async (req, res) => {
  try {
    const response = await fetch('http://ip-api.com/json/');
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

if (process.env.NODE_ENV === "dev"){
    app.listen(port, () => {
    console.log(`Proxy server is running on http://localhost:${port}`);
});
}

export const handler = serverless(app);
// server.js
// server.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.json());

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
);

app.post('/chat', async (req, res) => {
  try {
    const userMessage = req.body.message;

    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: userMessage }],
    });

    const botReply = completion.data.choices[0].message.content;
    res.json({ reply: botReply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: 'Erreur serveur 😢' });
  }
});

app.listen(port, () => {
  console.log(`✅ Serveur en ligne sur http://localhost:${port}`);
});

require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.post('/recipe', async (req, res) => {
    const { calories } = req.body;
    const prompt = `Suggest a recipe that contains around ${calories} calories, suitable for a dinner meal.`;

    try {
        const response = await axios.post('https://api.openai.com/v1/engines/text-davinci-002/completions', {
            prompt: prompt,
            max_tokens: 150
        }, {
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        const recipe = response.data.choices[0].text.trim();
        res.json({ recipe });
    } catch (error) {
        console.error('Error calling OpenAI API:', error);
        res.status(500).send('Failed to fetch recipe');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

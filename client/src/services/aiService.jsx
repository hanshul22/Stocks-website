import axios from 'axios';

const API_KEY = import.meta.env.VITE_AI_kEY;  // Replace with your OpenAI API key
const BASE_URL = 'https://api.openai.com/v1/chat/completions'; // Correct endpoint for GPT-4

const getAIResponse = async (prompt) => {
  try {
    const response = await axios.post(
      BASE_URL,
      {
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 150,
        temperature: 0.7
      },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error fetching AI response:", error.response ? error.response.data : error.message);
    return "Sorry, I couldn't process your request. Please try again.";
  }
};

export default getAIResponse;

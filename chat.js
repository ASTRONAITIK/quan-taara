export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Invalid request' });
  }

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Key lives here on the server — users never see it
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        temperature: 1,
        max_tokens: 2048,
        messages: [
          {
            role: 'system',
            content: 'You are ASTROPIX — a friendly physics mentor inside the Quan-Taara astrophysics interface. Be enthusiastic and explain even the weirdest physics questions clearly and precisely. Use equations where helpful. Keep answers concise but complete. Plain text only — no markdown asterisks, no hash symbols, no bullet dashes.'
          },
          ...messages
        ]
      })
    });

    const data = await response.json();

    if (data.error) {
      return res.status(500).json({ error: data.error.message });
    }

    const reply = data.choices?.[0]?.message?.content || 'No response received.';
    return res.status(200).json({ reply });

  } catch (err) {
    return res.status(500).json({ error: err.message || 'Server error' });
  }
}

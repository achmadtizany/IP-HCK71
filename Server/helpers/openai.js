const {OpenAI} = require("openai")
require("dotenv").config()

module.exports = async function openAI (agent1, agent2){
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    })
    const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `Give me a interesting fact  from agent valorant from ${agent1} vs ${agent2}. the response must be a JSON, the format is like this:
            {
                "agent1":
               
            },
            {
                "agent2":
                
            }
            `,
          },
        ],
        model: "gpt-3.5-turbo",
      });
      //   console.log(completion.choices[0].message.content);
      return completion.choices[0].message.content;
}
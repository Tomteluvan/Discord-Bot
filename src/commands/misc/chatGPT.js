const { Configuration, OpenAIApi } = require('openai');
const { ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});

const openai = new OpenAIApi(configuration);

module.exports = {
  name: 'chatgpt',
  description: 'Ask ChatGPT a question.',
  options: [{
    name: 'question',
    type: ApplicationCommandOptionType.String,
    description: 'The question to ask ChatGPT.',
    required: true,
  }],
  //deleted: Boolean,

  async callback(client, interaction) {
    const messages = [];    
    const question = interaction.options.getString('question');

    messages.push(
        {role: "system", content: "Do not give too long answer"},
        {role: "user", content: question });
    
    try {
        const answer = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: messages,
            max_tokens: 500,
          });

    const bot_answer = answer.data.choices[0].message.content;


    await interaction.reply(bot_answer);


    } catch (error) {
        console.log(`Error in chatGPT command: ${error}`);
      await interaction.reply('An error occurred while processing your openAI request.');
    }
  },
};
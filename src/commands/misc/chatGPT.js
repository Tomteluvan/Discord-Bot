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
        {role: "system", content: "Answer short and in a nice manner"},
        {role: "user", content: question });
    
    try {
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: messages,
            max_tokens: 256,
          });

    const completion_text = completion.data.choices[0].message.content;
      console.log(completion_text);

      await interaction.reply(completion_text);


    //   const response = await openai.createChatCompletion({
    //     model: "gpt-3.5-turbo",
    //     messages: messages,
    //     maxTokens: 256,
    //     temperature: 0,
    //   });

    //   const answer = response.data.choices[0].message;
    //   await interaction.reply(answer);

    } catch (error) {
        console.log(`OPENAI ERR: ${error}`);
      await interaction.reply('An error occurred while processing your request.');
    }
  },
};
const { ApplicationCommandOptionType } = require('discord.js');
module.exports = {
    name: 'sum',
    description: 'sums two integers',
    //devOnly: Boolean,
    //testOnly: Boolean,
    //deleted: true,
    options: [
        {
            name: 'first',
            description: 'first number to be summed',
            required: true,
            type: ApplicationCommandOptionType.Integer,
            required: true,
        },
        {
            name: 'second',
            description: 'first number to be summed',
            type: ApplicationCommandOptionType.Integer,
            required: true,
        },
    ],

    callback: (client, interaction) => {
    const first = interaction.options.getInteger('first');
    const second = interaction.options.getInteger('second');
    const sum = first + second;

    interaction.reply(`The sum of ${first} + ${second} is ${sum}.`);
    },
}
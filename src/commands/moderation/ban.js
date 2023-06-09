const { ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js');
module.exports = {
    name: 'ban',
    description: 'Bans a member!',
    //devOnly: Boolean,
    //testOnly: Boolean,
    deleted: true,
    options: [
        {
            name: 'target-user',
            description: 'The user to ban',
            required: true,
            type: ApplicationCommandOptionType.Mentionable,
        },
        {
            name: 'reason',
            description: 'The user to ban.',
            type: ApplicationCommandOptionType.String,
        },
    ],
    permissionsRequired: [PermissionFlagsBits.Administrator],
    botPermissions: [PermissionFlagsBits.Administrator],

    callback: (client, interaction) => {
        interaction.reply(`Ban...`);
    },
}
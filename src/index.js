require('dotenv').config();

const { Client, IntentsBitField, EmbedBuilder, Embed, Activity, ActivityType } = require('discord.js');
const ytdl = require('ytdl-core');
const { joinVoiceChannel } = require('@discordjs/voice');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

let status = [
    {
        name: 'with big money',
        type: ActivityType.Playing,
    },
    {
        name: 'only TOP-Gs',
        type: ActivityType.Listening,
    },
    {
        name: 'Andrew Tate',
        type: ActivityType.Listening,
    },
]

client.on('ready', (c) => {
    console.log(` ✅ ${c.user.tag} is online`);

    setInterval(() => {
        let random = Math.floor(Math.random() * status.length);
        client.user.setActivity(status[random]);
    }, 60000);
});

client.on('interactionCreate', (interaction) => {
    if(!interaction.isChatInputCommand()) return;

    //console.log(interaction.commandName);
    if(interaction.commandName === 'add') {
        const num1 = interaction.options.get('first-number').value;
        const num2 = interaction.options.get('second-number').value;

        interaction.reply(`The sum is ${num1 + num2}`);
    }

    if(interaction.commandName === 'embed') {
        const embed = new EmbedBuilder()
        .setTitle('Embed Title')
        .setDescription('This an embed description')
        .setColor('Random')
        .addFields(
            {
            name: 'Field title', 
            value: 'Some value', 
            inline: true,
            }   
        );

        interaction.reply({ embeds: [embed]});
    }

    if(interaction.commandName === 'hey') {
        interaction.reply('hey!');
    }

    if(interaction.commandName === 'ping') {
        interaction.reply('pong!');
    }
});

client.on('messageCreate', async (msg) => {
    // console.log(msg.content);

    if(msg.author.bot){
        return;
    }

    if(msg.content == 'hello'){
        msg.reply('Hey!');
    }

    if(msg.content == 'Vem är bäst på padel?'){
        msg.reply('Mike är bäst');
    }
});
client.login(process.env.TOKEN);
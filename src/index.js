require('dotenv').config();

const { Client, IntentsBitField, EmbedBuilder, Embed, Activity, ActivityType } = require('discord.js');
const ytdl = require('ytdl-core');
const { joinVoiceChannel } = require('@discordjs/voice');
const eventHandler = require('./handlers/eventHandler');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

eventHandler(client);

client.login(process.env.TOKEN);
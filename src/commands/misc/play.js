const { ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js');
const { joinVoiceChannel, getVoiceConnection, createAudioPlayer, createAudioResource } = require('@discordjs/voice');
const ytdl = require('ytdl-core');

module.exports = {
    name: 'play',
    description: 'Play the sound of a youtube link',
    options: [{
      name: 'url',
      type: ApplicationCommandOptionType.String,
      description: 'URL of youtube video',
      required: true,
    }],

    async callback(client, interaction) {
        // Get the voice channel the user is in
        const voiceChannel = interaction.member.voice.channel;

        // Join the voice channel
        const connection = joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: voiceChannel.guild.id,
        adapterCreator: voiceChannel.guild.voiceAdapterCreator,
        });
        
         try {
            // Get the voice channel the user is in
            const voiceChannel = interaction.member.voice.channel;

            if (!voiceChannel) {
                await interaction.reply('You need to be in a voice channel to use this command.');
                return;
            }

            // Get the existing connection to the voice channel, if one exists
            const connection = getVoiceConnection(voiceChannel.guild.id);

            // If there is no connection, join the voice channel
            if (!connection) {
                await interaction.deferReply();
                const newConnection = joinVoiceChannel({
                    channelId: voiceChannel.id,
                    guildId: voiceChannel.guild.id,
                    adapterCreator: voiceChannel.guild.voiceAdapterCreator,
                });
                await newConnection.ready();
            }

            // Get the YouTube video URL from the user's input
            const videoUrl = interaction.options.getString('url');
            
            // Create a readable stream of the YouTube video
            const stream = ytdl(videoUrl, {filter: this.filterVideo, quality: 'lowest'});
            
            // Create an audio player and resource for the stream
            const resource = createAudioResource(stream);
            const player = createAudioPlayer();
            
            // Add an error event listener to the player
            player.on('error', error => {
                console.error(error);
            });

            // Play the audio resource in the voice channel
            const connectionToUse = connection || newConnection;
            connectionToUse.subscribe(player);
            player.play(resource);

            await interaction.deferReply();
            await interaction.followUp('Now playing: a song?');
            

        } catch (error) {
            console.log(error);
        }
       
    }
};

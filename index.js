require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildMessageReactions,
    ]
});

client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);

    await client.application.commands.set([
        {
            name: 'bind',
            description: 'Bind your account!'
        },
        {
            name: 'time-in',
            description: 'Time In!'
        },
        {
            name: 'time-out',
            description: 'Time Out!'
        }
    ]);
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;
    const { commandName } = interaction;
    const author = interaction.user;
    const member = interaction.guild.members.cache.get(author.id)

    switch (commandName) {
        case 'bind':
            try {
                const res = await axios.post(`${process.env.APP_URL}/bind`, {
                    discordId: author.id,
                    username: member.nickname,
                    discriminator: author.discriminator
                });
                interaction.reply(`${res.data}`);
            } catch (err) {
                console.error(err.response);
                interaction.reply('An error occurred while binding your account., Please try again later or contact server admin! my bad my bad.. <:crying_cat:123456789012345678>');
            }
            break;
        case 'time-in':
            try {
                const res = await axios.post(`${process.env.APP_URL}/set-time`, {
                    discordId: author.id,
                    username: member.nickname,
                    command: 'time-in'
                });
                interaction.reply(`${res.data}`);
            } catch (err) {
                console.error(err.response);
                interaction.reply('An error occurred while logging timestamps., Please try again later or contact server admin! my bad my bad..  <:crying_cat:123456789012345678>');
            }
            break;
        case 'time-out':
            try {
                const res = await axios.post(`${process.env.APP_URL}/set-time`, {
                    discordId: author.id,
                    username: member.nickname,
                    command: 'time-out'
                });
                interaction.reply(`${res.data}`);
            } catch (err) {
                console.error(err.response);
                interaction.reply('An error occurred while logging timestamps., Please try again later or contact server admin! my bad my bad..  <:crying_cat:123456789012345678>');
            }
            break;
    }
});

// This line must be at the very end
client.login(process.env.CLIENT_TOKEN);
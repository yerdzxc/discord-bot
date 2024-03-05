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
            name: 'time-in',
            description: 'Time In!'
        },
        {
            name: 'time-out',
            description: 'Time Out!'
        },
        {
            name: 'attendance',
            description: 'Todays Attendance List!'
        },
        {
            name: 'absent',
            description: 'Todays Absent(s) List!'
        },
        {
            name: 'attendance-intern',
            description: 'Interns Attendance List!'
        },
        {
            name: 'absent-intern',
            description: 'Interns Absent(s) List!'
        },
        {
            name: 'bind',
            description: 'Bind your account!'
        },
        {
            name: 'bind-intern',
            description: 'Bind your account!'
        }
    ]);
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;
    const { commandName } = interaction;
    let username;
    const author = interaction.user;
    const member = interaction.guild.members.cache.get(author.id)
    member.nickname ? username = member.nickname : username = author.username;
    switch (commandName) {
        case 'bind':
            try {
                const res = await axios.post(`${process.env.APP_URL}/bind`, {
                    discordId: author.id,
                    username: username,
                    discriminator: author.discriminator,
                    command: 'bind'
                });
                interaction.reply(`${res.data}`);
            } catch (err) {
                console.error(err.response);
                interaction.reply('An error occurred while binding your account., Please try again later or contact server admin! my bad my bad.. <:crying_cat:123456789012345678>');
            }
            break;
        case 'bind-intern':
            try {
                const res = await axios.post(`${process.env.APP_URL}/bind`, {
                    discordId: author.id,
                    username: username,
                    discriminator: author.discriminator,
                    command: 'bind-intern'
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
                    username: username,
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
                    username: username,
                    command: 'time-out'
                });
                interaction.reply(`${res.data}`);
            } catch (err) {
                console.error(err.response);
                interaction.reply('An error occurred while logging timestamps., Please try again later or contact server admin! my bad my bad..  <:crying_cat:123456789012345678>');
            }
            break;
        case 'attendance':
            try {
                const res = await axios.get(`${process.env.APP_URL}/attendance`);
                interaction.reply(`${res.data}`);
            } catch (err) {
                console.error(err.response);
                interaction.reply('An error occurred while fetching attendance., Please try again later or contact server admin! my bad my bad..  <:crying_cat:123456789012345678>');
            }
            break;
        case 'absent':
            try {
                const res = await axios.get(`${process.env.APP_URL}/absent`);
                interaction.reply(`${res.data}`);
            } catch (err) {
                console.error(err.response);
                interaction.reply('An error occurred while fetching absent(s)., Please try again later or contact server admin! my bad my bad..  <:crying_cat:123456789012345678>');
            }
            break;
        case 'attendance-intern':
            try {
                const res = await axios.get(`${process.env.APP_URL}/attendance-intern`);
                interaction.reply(`${res.data}`);
            } catch (err) {
                console.error(err.response);
                interaction.reply('An error occurred while fetching attendance., Please try again later or contact server admin! my bad my bad..  <:crying_cat:123456789012345678>');
            }
            break;
        case 'absent-intern':
            try {
                const res = await axios.get(`${process.env.APP_URL}/absent-intern`);
                interaction.reply(`${res.data}`);
            } catch (err) {
                console.error(err.response);
                interaction.reply('An error occurred while fetching absent(s)., Please try again later or contact server admin! my bad my bad..  <:crying_cat:123456789012345678>');
            }
            break;
    }
});

client.login(process.env.CLIENT_TOKEN);
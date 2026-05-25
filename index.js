require('dotenv').config();
const { Client, GatewayIntentBits, AttachmentBuilder } = require('discord.js');
const axios = require('axios');
const crypto = require('crypto');
const commandsBuilder = require('./commands/commands.js');

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
        ...commandsBuilder
    ]);
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;
    const { commandName } = interaction;
    let username;
    const author = interaction.user;
    const member = interaction.guild.members.cache.get(author.id);
    member.nickname ? username = member.nickname : username = author.username;

    switch (commandName) {
        case 'bind':
            try {
                const payload = {
                    discordId: author.id,
                    username: username,
                    discriminator: author.discriminator,
                    command: 'bind'
                };
                const headers = generateHeaders(payload);
                if (!process.env.SIGNING_SECRET) {
                    interaction.reply('Signing secret required, contact server admin!. <:crying_cat:123456789012345678>')
                };
                const res = await axios.post(`${process.env.APP_URL}/bind`, payload, { headers });
                interaction.reply(`${res.data}`);
            } catch (err) {
                if (err.response.status === 401) {
                    interaction.reply('Invalid Signature, Please contact server admin!. <:crying_cat:123456789012345678>')
                }
                console.error(err.response);
                interaction.reply('An error occurred while binding your account., Please try again later or contact server admin! my bad my bad.. <:crying_cat:123456789012345678>');
            }
            break;
        case 'bind-intern':
            try {
                const payload = {
                    discordId: author.id,
                    username: username,
                    discriminator: author.discriminator,
                    command: 'bind-intern'
                };
                const headers = generateHeaders(payload);
                if (!process.env.SIGNING_SECRET) {
                    interaction.reply('Signing secret required, contact server admin!. <:crying_cat:123456789012345678>')
                };
                const res = await axios.post(`${process.env.APP_URL}/bind`, payload, { headers });
                interaction.reply(`${res.data}`);
            } catch (err) {
                if (err.response.status === 401) {
                    interaction.reply('Invalid Signature, Please contact server admin!. <:crying_cat:123456789012345678>')
                }
                console.error(err.response);
                interaction.reply('An error occurred while binding your account., Please try again later or contact server admin! my bad my bad.. <:crying_cat:123456789012345678>');
            }
            break;
        case 'time-in':
            try {
                const payload = {
                    discordId: author.id,
                    username: username,
                    command: 'time-in'
                };
                const headers = generateHeaders(payload);
                if (!process.env.SIGNING_SECRET) {
                    interaction.reply('Signing secret required, contact server admin!. <:crying_cat:123456789012345678>')
                };
                const res = await axios.post(`${process.env.APP_URL}/set-time`, payload, { headers });
                interaction.reply(`${res.data}`);
            } catch (err) {
                if (err.response.status === 401) {
                    interaction.reply('Invalid Signature, Please contact server admin!. <:crying_cat:123456789012345678>')
                }
                console.error(err.response);
                interaction.reply('An error occurred while logging timestamps., Please try again later or contact server admin! my bad my bad..  <:crying_cat:123456789012345678>');
            }
            break;
        case 'time-out':
            try {
                const payload = {
                    discordId: author.id,
                    username: username,
                    command: 'time-out'
                };
                const headers = generateHeaders(payload);
                if (!process.env.SIGNING_SECRET) {
                    interaction.reply('Signing secret required, contact server admin!. <:crying_cat:123456789012345678>')
                };
                const res = await axios.post(`${process.env.APP_URL}/set-time`, payload, { headers });
                interaction.reply(`${res.data}`);
            } catch (err) {
                if (err.response.status === 401) {
                    interaction.reply('Invalid Signature, Please contact server admin!. <:crying_cat:123456789012345678>')
                }
                console.error(err.response);
                interaction.reply('An error occurred while logging timestamps., Please try again later or contact server admin! my bad my bad..  <:crying_cat:123456789012345678>');
            }
            break;
        case 'attendance':
            try {
                const headers = generateHeaders();
                const res = await axios.get(`${process.env.APP_URL}/attendance`, { headers });
                interaction.reply(`${res.data}`);
            } catch (err) {
                if (err.response.status === 401) {
                    interaction.reply('Invalid Signature, Please contact server admin!. <:crying_cat:123456789012345678>')
                }
                console.error(err.response);
                interaction.reply('An error occurred while fetching attendance., Please try again later or contact server admin! my bad my bad..  <:crying_cat:123456789012345678>');
            }
            break;
        case 'attendance-by-date':
            try {
                const headers = generateHeaders();
                if (!process.env.SIGNING_SECRET) {
                    interaction.reply('Signing secret required, contact server admin!. <:crying_cat:123456789012345678>')
                };
                const date = interaction.options.getString('date');
                const res = await axios.get(`${process.env.APP_URL}/attendance-by-date?signature=${date}`, { headers });
                interaction.reply(`${res.data}`);
            } catch (err) {
                if (err.response.status === 401) {
                    interaction.reply('Invalid Signature, Please contact server admin!. <:crying_cat:123456789012345678>')
                }
                console.error(err.response);
                interaction.reply('An error occurred while fetching attendance., Please try again later or contact server admin! my bad my bad..  <:crying_cat:123456789012345678>');
            }
            break;
        case 'absent':
            try {
                const headers = generateHeaders();
                if (!process.env.SIGNING_SECRET) {
                    interaction.reply('Signing secret required, contact server admin!. <:crying_cat:123456789012345678>')
                };
                const res = await axios.get(`${process.env.APP_URL}/absent`, { headers });
                interaction.reply(`${res.data}`);
            } catch (err) {
                if (err.response.status === 401) {
                    interaction.reply('Invalid Signature, Please contact server admin!. <:crying_cat:123456789012345678>')
                }
                console.error(err.response);
                interaction.reply('An error occurred while fetching absent(s)., Please try again later or contact server admin! my bad my bad..  <:crying_cat:123456789012345678>');
            }
            break;
        case 'absent-by-date':
            try {
                const headers = generateHeaders();
                if (!process.env.SIGNING_SECRET) {
                    interaction.reply('Signing secret required, contact server admin!. <:crying_cat:123456789012345678>')
                };
                const date = interaction.options.getString('date');
                const res = await axios.get(`${process.env.APP_URL}/absent-by-date?signature=${date}`, { headers });
                interaction.reply(`${res.data}`);
            } catch (err) {
                if (err.response.status === 401) {
                    interaction.reply('Invalid Signature, Please contact server admin!. <:crying_cat:123456789012345678>')
                }
                console.error(err.response);
                interaction.reply('An error occurred while fetching absent(s)., Please try again later or contact server admin! my bad my bad..  <:crying_cat:123456789012345678>');
            }
            break;
        case 'attendance-intern':
            try {
                const headers = generateHeaders();
                if (!process.env.SIGNING_SECRET) {
                    interaction.reply('Signing secret required, contact server admin!. <:crying_cat:123456789012345678>')
                };
                const res = await axios.get(`${process.env.APP_URL}/attendance-intern`, { headers });
                interaction.reply(`${res.data}`);
            } catch (err) {
                if (err.response.status === 401) {
                    interaction.reply('Invalid Signature, Please contact server admin!. <:crying_cat:123456789012345678>')
                }
                console.error(err.response);
                interaction.reply('An error occurred while fetching attendance., Please try again later or contact server admin! my bad my bad..  <:crying_cat:123456789012345678>');
            }
            break;
        case 'absent-intern':
            try {
                const headers = generateHeaders();
                if (!process.env.SIGNING_SECRET) {
                    interaction.reply('Signing secret required, contact server admin!. <:crying_cat:123456789012345678>')
                };
                const res = await axios.get(`${process.env.APP_URL}/absent-intern`, { headers });
                interaction.reply(`${res.data}`);
            } catch (err) {
                if (err.response.status === 401) {
                    interaction.reply('Invalid Signature, Please contact server admin!. <:crying_cat:123456789012345678>')
                }
                console.error(err.response);
                interaction.reply('An error occurred while fetching absent(s)., Please try again later or contact server admin! my bad my bad..  <:crying_cat:123456789012345678>');
            }
            break;
        case 'export':
            try {
                await interaction.deferReply();
                const from = interaction.options.getString('from');
                const to = interaction.options.getString('to');
                const type = interaction.options.getString('type') || 'employee';

                const today = new Date();
                const monday = new Date(today);
                monday.setDate(today.getDate() - ((today.getDay() + 6) % 7));
                const sunday = new Date(monday);
                sunday.setDate(monday.getDate() + 6);

                const fmt = (d) => d.toISOString().split('T')[0];
                const fromDate = from || fmt(monday);
                const toDate = to || fmt(sunday);

                const res = await axios.get(`${process.env.APP_URL}/export`, {
                    params: { from: fromDate, to: toDate, type },
                    responseType: 'arraybuffer',
                });

                const attachment = new AttachmentBuilder(Buffer.from(res.data), {
                    name: `KargaX Attendance ${fromDate} to ${toDate}.csv`
                });
                await interaction.editReply({ files: [attachment], content: `Export: ${fromDate} to ${toDate} (${type})` });
            } catch (err) {
                console.error(err?.response?.data || err);
                await interaction.editReply('An error occurred while exporting. Please try again or contact server admin!');
            }
            break;
        case 'setname':
            try {
                const name = interaction.options.getString('name');
                const targetUser = interaction.options.getUser('user') || interaction.user;
                const member = interaction.guild.members.cache.get(targetUser.id);
                const displayName = member?.nickname || targetUser.username;

                const payload = {
                    discordId: targetUser.id,
                    username: name,
                };
                const headers = generateHeaders(payload);
                const res = await axios.post(`${process.env.APP_URL}/set-name`, payload, { headers });
                interaction.reply(`${res.data}`);
            } catch (err) {
                if (err.response?.status === 401) {
                    interaction.reply('Invalid Signature, Please contact server admin!. <:crying_cat:123456789012345678>');
                }
                console.error(err?.response || err);
                interaction.reply('An error occurred while updating the name. Please try again later!');
            }
            break;
        case 'ot':
            try {
                const date = interaction.options.getString('date');
                const hours = interaction.options.getNumber('hours');
                const type = interaction.options.getString('type');
                const reason = interaction.options.getString('reason');

                const payload = {
                    discordId: author.id,
                    date,
                    hours,
                    type,
                    note: reason || undefined,
                };
                const headers = generateHeaders(payload);
                if (!process.env.SIGNING_SECRET) {
                    interaction.reply('Signing secret required, contact server admin!. <:crying_cat:123456789012345678>')
                };
                const res = await axios.post(`${process.env.APP_URL}/overtime`, payload, { headers });
                interaction.reply(`${res.data}`);
            } catch (err) {
                if (err.response?.status === 401) {
                    interaction.reply('Invalid Signature, Please contact server admin!. <:crying_cat:123456789012345678>')
                }
                console.error(err?.response?.data || err);
                interaction.reply('An error occurred while filing overtime. Please try again later!');
            }
            break;
    }
});

function generateHeaders(payload) {
    const timestamp = new Date().toISOString();
    const body = payload && Object.keys(payload).length > 0
        ? JSON.stringify(payload)
        : '';
    const signature = crypto
        .createHmac('sha256', `${process.env.SIGNING_SECRET}`)
        .update(`${timestamp}:${body}`)
        .digest('hex');
    return {
        'x-signature': signature,
        'x-signature-timestamp': timestamp
    }
}

client.login(process.env.CLIENT_TOKEN);
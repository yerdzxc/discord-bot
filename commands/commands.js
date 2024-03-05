const { SlashCommandBuilder } = require('discord.js');

const attendanceByDate = new SlashCommandBuilder()
    .setName('attendance-by-date')
    .setDescription('Attendance List by a specific date!')
    .addStringOption(option =>
        option.setName('date')
            .setDescription('Enter the date (YYYY-MM-DD)')
            .setRequired(true));

const absentByDate = new SlashCommandBuilder()
    .setName('absent-by-date')
    .setDescription('Absent List by a specific date!')
    .addStringOption(option =>
        option.setName('date')
            .setDescription('Enter the date (YYYY-MM-DD)')
            .setRequired(true));

const timeIn = new SlashCommandBuilder()
    .setName('time-in')
    .setDescription('Time In!');


const timeOut = new SlashCommandBuilder()
    .setName('time-out')
    .setDescription('Time Out!');

const attendance = new SlashCommandBuilder()
    .setName('attendance')
    .setDescription('Todays Attendance List!');

const absent = new SlashCommandBuilder()
    .setName('absent')
    .setDescription('Todays Absent(s) List!');

const attendanceIntern = new SlashCommandBuilder()
    .setName('attendance-intern')
    .setDescription('Interns Attendance List!');

const absentIntern = new SlashCommandBuilder()
    .setName('absent-intern')
    .setDescription('Interns Absent(s) List!');

const bind = new SlashCommandBuilder()
    .setName('bind')
    .setDescription('Bind your account!');

const bindIntern = new SlashCommandBuilder()
    .setName('bind-intern')
    .setDescription('Bind your account!');


module.exports = [
    attendanceByDate.toJSON(),
    absentByDate.toJSON(),
    timeIn.toJSON(),
    timeOut.toJSON(),
    attendance.toJSON(),
    absent.toJSON(),
    attendanceIntern.toJSON(),
    absentIntern.toJSON(),
    bind.toJSON(),
    bindIntern.toJSON()
];        
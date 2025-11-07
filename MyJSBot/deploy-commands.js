const { REST, Routes, PermissionFlagsBits } = require('discord.js');
const { config } = require('dotenv');

// Load environment variables (your token)
config();
const TOKEN = process.env.DISCORD_TOKEN;
const CLIENT_ID = 'YOUR_BOT_CLIENT_ID'; // Get this from Discord Developer Portal -> General Information

if (!TOKEN || !CLIENT_ID) {
  console.error("Error: DISCORD_TOKEN or CLIENT_ID is missing from .env file.");
  process.exit(1);
}

const commands = [
  {
    name: 'pomodoro',
    description: 'Starts a 25/5 Pomodoro session in your voice channel.',
  },
  {
    name: 'stop',
    description: 'Stops the current Pomodoro session.',
  },
  {
    name: 'status',
    description: 'Checks the status of the current Pomodoro session.',
  },
  {
    name: 'muteuser',
    description: 'Times out a user for a specified duration.',
    options: [
      {
        name: 'user',
        description: 'The user to timeout',
        type: 6, // USER type
        required: true,
      },
      {
        name: 'duration_minutes',
        description: 'How many minutes to time them out for',
        type: 4, // INTEGER type
        required: true,
      },
      {
        name: 'reason',
        description: 'The reason for the timeout',
        type: 3, // STRING type
        required: false,
      },
    ],
    default_member_permissions: String(PermissionFlagsBits.ModerateMembers), // Only visible to mods
  },
];

const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');
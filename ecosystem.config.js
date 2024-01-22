module.exports = {
  apps: [
    {
      name: 'discord-bot:3001',
      exec_mode: 'cluster',
      instances: '1',
      script: './index.js',
    }
  ]
}

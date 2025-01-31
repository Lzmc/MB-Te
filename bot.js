const mineflayer = require('mineflayer');
const keep_alive = require('./keep_alive.js');

const config = {
  host: process.env.HOST,
  port: parseInt(process.env.PORT, 10),
  username: process.env.NAME,
  version: false,
  reconnectDelay: 5000,
  targetServer: process.env.SERVER,
  velocity: true
};

let bot;

function createBot() {
  bot = mineflayer.createBot({
    host: config.host,
    port: config.port,
    username: config.username,
    version: config.version,
    auth: 'offline',
    velocity: config.velocity
  });

  bot.on('login', () => console.log(`[BOT] Logged in as ${bot.username}`));

  bot.on('spawn', () => {
    console.log('[BOT] Spawned.');
    setTimeout(() => {
      bot.chat(`/server ${config.targetServer}`);
      console.log(`[BOT] Switching to ${config.targetServer}.`);
    }, 2000);
  });

  bot.on('kicked', (reason) => console.log(`[BOT] Kicked: ${reason}`));
  bot.on('error', (err) => console.log(`[BOT] Error: ${err.message}`));
  bot.on('end', () => {
    console.log('[BOT] Disconnected. Reconnecting...');
    setTimeout(createBot, config.reconnectDelay);
  });
}

createBot();
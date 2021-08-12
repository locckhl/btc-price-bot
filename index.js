const { Client, Intents } = require("discord.js");
const binanceClient = require("./binanceConfig");
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
require("dotenv").config();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  
  setInterval(async () => {
    // Get binace response
    let res = await binanceClient.prices({ symbol: "BTCUSDT" });
    let btcPrice = Math.round(res.BTCUSDT);

    console.log(`BTCUSDT price is ${btcPrice}`);

    // Change bot nickname to btc price in all server every 10 seconds
    client.guilds.cache.map((guild) => {
        guild.me.setNickname('BTC $'+ btcPrice);
    });
  
  }, 10 * 1000);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === "ping") {
    await interaction.reply("Pong!");
  }
});

client.login(process.env.TOKEN);

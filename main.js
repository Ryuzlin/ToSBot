const util = require('util');
const Discord = require("discord.js");
const config = require('./config/config');
const commands = require('./scripts/commands');
const adminCommands = require('./scripts/adminCommands');

const client = new Discord.Client();


client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}!\n-`);
});

client.on('error', (e) => console.error("error: " + e));
client.on('warn', (e) => console.warn("warn: " + e));
//client.on('debug', (e) => console.info("debug: " + e));



client.on('message', msg => {
	if (msg.author.id == client.user.id) {
		console.log(`Bot's message...\n`);
		return;
	} else if(!msg.content.startsWith(config.prefix) || msg.guild === null) return;

	console.log(`Author: ${msg.author.username} (${msg.author.id})\n` + 
		`Server: ${msg.guild.name} (${msg.guild.id})\n` + 
		`Channel: ${msg.channel.name} (${msg.channel.id})\n` + 
		`Content: ${util.inspect(msg.content)} (${msg.id})\n`);
	
	let arg = msg.content.toLocaleLowerCase().replace(/ +/g, ' ').split(' ');

	if (arg[0].startsWith(config.prefix + 'calcdmg')) {
		commands.calculateDamage(arg, msg, client);
	} else if (arg[0].startsWith(config.prefix + 'calcdodge')) {
		commands.calculateDodge(arg, msg, client);
	} else if (arg[0].startsWith(config.prefix + 'calccrit')) {
		commands.calculateCritical(arg, msg, client);
	}  else if (arg[0].startsWith(config.prefix + 'calcblock')) {
		commands.calculateBlock(arg, msg, client);
	}  else if (arg[0].startsWith(config.prefix + 'help') || arg[0].startsWith(config.prefix + 'commands')) {
		commands.help(arg, msg, client);
	}
});


client.login(config.loginKey);
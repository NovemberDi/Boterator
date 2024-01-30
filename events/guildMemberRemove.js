//
const { Events, Client } = require('discord.js');


module.exports = {
	name: Events.GuildMemberRemove,
	execute(interaction) {
		const channel = interaction.guild.channels.cache.find(channel => channel.name === "server_events");

		console.log(`Пользователь ${interaction.nickname?interaction.nickname:interaction.user.username} покинул сервер ${interaction.guild.name}`);
		channel.send(`Пользователь ${interaction.nickname?interaction.nickname:interaction.user.username} покинул сервер ${interaction.guild.name}`);

		},
};
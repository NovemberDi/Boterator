//
const { Events, Client } = require('discord.js');


module.exports = {
	name: Events.GuildMemberRemove,
	execute(interaction) {
		const channel = interaction.guild.channels.cache.find(channel => channel.name === "server_events");

		console.log(`Пользователь ${interaction.nickname?interaction.nickname:interaction.user.username} покинул сервер ${interaction.guild.name}`);
		channel.send(`>>> ### Событие на сервере — пользователь покинул сервер *${interaction.guild.name}*
		* Глобальное имя - ***${interaction.user.username}***
		* Никнейм на сервере - ***${interaction.nickname || 'отсутствовал'}***.
		`);

		},
};
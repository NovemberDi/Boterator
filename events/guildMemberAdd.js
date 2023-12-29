//
const { Events, Client } = require('discord.js');
const store = require('../store/store.js');
const {checkUser} = require('../actions/checkUser.js');

const logger = require('../actions/logger.js');

module.exports = {
	name: Events.GuildMemberAdd,
	async execute(interaction) {
		logger('Новый ползователь ' + interaction.user.username)
		const channel = interaction.guild.channels.cache.find(channel => channel.name === "server_events");
		store.listOfUsers.addUser(interaction)
		channel.send(`Пользователь ${interaction.nickname?interaction.nickname:interaction.user.username}  (<@${interaction.user.id}>) добавлен на сервер ${interaction.guild.name}.
		${await checkUser(interaction)}`)
		// console.log(`Пользователь ${interaction.nickname?interaction.nickname:interaction.user.username} добавлен на сервер ${interaction.guild.name}`) 
	},
};
//
const { Events } = require('discord.js');

const {checkUser} = require('../actions/checkUser.js');

const logger = require('../actions/logger.js');

module.exports = {
	name: Events.GuildMemberUpdate,
	async execute (oldMember, newMember) {
		logger('Нинейм '+ oldMember.nickname + '=>'+ newMember.nickname);

		if (oldMember.nickname === newMember.nickname ) return;
		
		const channel = newMember.guild.channels.cache.find(channel => channel.name === "server_events");
		
		let answer = `>>> ### Событие на сервере — пользователь сменил никнейм:
		* Глобальное имя - ***${newMember.user.username}***
		* Ссылка - <@${newMember.user.id}>
		* Никнейм на сервере - ***${newMember.nickname}***.
		`;
		channel.send(answer + await checkUser(newMember));
	},		

};
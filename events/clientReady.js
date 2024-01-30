//Событие логина
const { Events, ChannelType } = require('discord.js');
const {adminData} = require('../store/store.js');

const logger = require('../actions/logger.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		logger('Бот онлайн');
		console.log(`Ready! Logged in as ${client.user.tag}`);
	    const Guilds = client.guilds.cache.map(guild => guild); // Получаем список серверов
		//Проходимся по списку серверов и добавляем админа в стор
	    Guilds.forEach(guild => {
			adminData.setAdminId(guild);
		});
		
		
		//Проходимся по списку серверов и ..создаём канал событий если его нет
		Guilds.forEach(guild => {
			const channelNameList = guild.channels.cache.map(channel => channel.name);
			if (channelNameList.includes('server_events')) return;
			guild.channels.create({
				name: 'server_events',
				type: ChannelType.GuildText
			})
			.then(() => console.log('Канал событий создан')).catch((err) => console.log(err))
			
		})
	},
};
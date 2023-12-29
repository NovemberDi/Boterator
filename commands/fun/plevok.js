const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('плевок')
		.setDescription('Плюнь в кого-нибудь, себя или под ноги :)')
        .addStringOption(option =>
            option.setName('цель')
                .setDescription('Укажи цель или оставь пустым, если плюешь под ноги')
                .setRequired(false)),
	async execute(interaction) {
		let messagePart = '';
		if (interaction.options.getString('цель')){
			if (`<@${interaction.user.id}>` === interaction.options.getString('цель')){
				messagePart = `плюёт против ветра`
			} else{
				messagePart = `плюёт в  ${interaction.options.getString('цель')}`
			}
		} else {
			messagePart = `плюёт под ноги`;
		}
		await interaction.reply(`<@${interaction.user.id}> ${messagePart}`);
	},
};
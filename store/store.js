let { targetRole } = require('./../config.json');

// let makeUser = (member) => {
//     let id = member.user.id;
//     let name = member.nickname||member.user.globalName||member.user.username;
//     let username = member.user.username;
//     let avatar = member.user.displayAvatarURL({ size: 256, dynamic: true });
//     let roles = member.roles.cache.map((role)=> role.name);
//     let hasRole = roles.includes(targetRole)
//     return {
//         id,
//         name,
//         username,
//         avatar,
//         roles,
//         hasRole
//     };
// };

// const listOfUsers = {
//     users: {

//     },
//     addUser(member) {
//         if (member.user.bot) return;
//         let guildID = member.guild.id;
//         let user = makeUser(member);

//         !this.users[guildID]?this.users[guildID] = []:'';
//         this.users[guildID].push(user);
        
//     },



//     updateUser(member){
//         let guildID = member.guild.id;
//         if (!this.users[guildID]) return;
//         let user = makeUser(member);
//         this.users[guildID] = this.users[guildID].filter((item) => {return item.id != user.id});
//         this.users[guildID].push(user);    

//     },
//     removeUser(member){
//         let guildID = member.guild.id;
//         let userID = member.user.id;
//         if (!this[guildID]) return;
//         this.users[guildID] = this.users[guildID].filter((item) => {return item.id != userID});
//         // console.log(this)
//     },
//     getUsersList(guildID){
//         console.log('get')
//         return listOfUsers.users[guildID||'1016758118421626902']
//     },
//     getUser(id){

//         return this.users[adminData.getGuilds()[0].guildID].find((item)=> item.id == id)
        
//     },

// };
const adminData = {
    admins: ['418346177587576832'],
    guilds:[],
    setAdminId(guild){
       this.admins.push(guild.ownerId) 
       this.guilds.push({guildID: guild.id, guildName: guild.name})
       console.log(this.admins)
    },
    getAdminId(){
        return this.admins 
    },
    getGuilds(){
        return this.guilds 
    }
}

module.exports = {
	// listOfUsers,
    adminData
};
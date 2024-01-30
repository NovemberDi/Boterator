const {client} = require('./bot.js')
const jwt = require('jsonwebtoken');
const path = require('path');
const {fixUsers, auditUsers} = require("./actions/checkUser.js");
const {targetRole, secret, authLink} = require("./config");
const {listOfUsers, adminData} = require('./store/store.js')



const generateAccessToken = (id) => {
    const payload = {
        id,
    }
    return jwt.sign(payload, secret, {expiresIn: "24h"} )
}
let makeUser = (member) => {
    let id = member.user.id;
    let name = member.nickname||member.user.globalName||member.user.username;
    let username = member.user.username;
    let avatar = member.user.displayAvatarURL({ size: 256, dynamic: true });
    let roles = member.roles.cache.map((role)=> role.name);
    let hasRole = roles.includes(targetRole)
    let auditResult = member.auditResult;
    return {
        id,
        name,
        username,
        avatar,
        roles,
        hasRole,
        auditResult
    };
};
class authController {
    link(req, res){
        res.json(authLink)
    };
    async login(req, res) {
        try {
            const {idUser} = req;
            // console.log(req)
            if (!idUser) {
                return res.status(400).json({message: `Пользователь не найден`})
            }
            console.log(adminData.getAdminId().includes(idUser));
            if (!adminData.getAdminId().includes(idUser)) {
                
                return res.status(400).json({message: `Пользователь не является администратором`})
            }
            const token = generateAccessToken(idUser)
            return res.json({token})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Login error'})
        }
    };
    async getAdminData(req, res) {
        try {
            const guilds = adminData.getGuilds();
            const guildId = guilds[0].guildID;
           
            const guild = client.guilds.cache.find((guild) => {return guild.id == guildId}); 
            const member = (await guild.members.fetch()).find(((member) => member.id == req.user.id ));
            const admin = makeUser(member);
           
            admin.guilds = guilds;
            
            console.log('дошло')
            res.json(admin)
        } catch (e) {
            console.log(e)
        }
    };

    async getUsers(req, res) {
        try {
            const guildId = req.body.guild;
            const guild = client.guilds.cache.find((guild) => {return guild.id == guildId}); 
            const members = [];
            (await guild.members.fetch()).forEach(((member) => {
                if (!member.user.bot) {
                    member.auditResult = null;
                    members.push(makeUser(member))  
                    }                                     
            }));

            
            res.json(members)
        } catch (e) {
            console.log(e)
        }
    };
    async auditUsers(req, res) {
        try {
            const guildId = req.body.guild;
            const guild = client.guilds.cache.find((guild) => {return guild.id == guildId}); 
            const members = [];
            (await guild.members.fetch()).forEach(((member) => {
                if (!member.user.bot) {
                    member.auditResult = null;
                    members.push(makeUser(member))  
                    }                                     
            })); 
       
           await auditUsers(members);     
            res.json(members)
        } catch (e) {
            console.log(e)
        }
    };
    async fixUsers(req, res) {
        try {
            const target = req.body.target;
            const guildId = req.body.guild;
            const guild = client.guilds.cache.find((guild) => {return guild.id == guildId}); 
            const members = [];
            const auditedMembers = [];
            (await guild.members.fetch()).forEach((member) => {
                if (!member.user.bot) { 
                    let targetMember =  target.find(item => item.id == member.id)
                    
                    if (targetMember){
                        console.log(targetMember)
                        member.hasRole = targetMember.hasRole;
                        console.log(member.user.username)
                        members.push(member)
                    }                     
                }                                     
            }); 
            console.log('Исправляем..')
            await fixUsers(members);  
            console.log('Сделано');
            (await guild.members.fetch()).forEach(async(member) => {
                if (!member.user.bot) {
                    member.auditResult = null;
                    auditedMembers.push(makeUser(member))  
                    }                                     
            }); 
            await auditUsers(auditedMembers);     
            res.json(auditedMembers)
        } catch (e) {
            console.log(e)
        }
    };
    async changeNickname(req, res) {
        try {
            const guildId = req.body.guild;
            const targetId = req.body.target.id;
            const newNickname = req.body.target.newNickname;
            const guild = client.guilds.cache.find((guild) => {return guild.id == guildId}); 
            let member = (await guild.members.fetch()).find(member => member.id == targetId) 
            let result = await member.setNickname(newNickname, 'by Bot');
            res.json(result)
        } catch (e) {
            console.log(e)
            res.json(e)
        }
    };
}

module.exports = new authController()








    // Не используем
    // async getAdminImage(req, res) {
    //     try {
           
    //         console.log('дошло')
    //         res.sendFile(path.join(__dirname + '/images/admin.jpg'))
    //     } catch (e) {
    //         console.log(e)
    //     }
    // };
const {client} = require('./bot.js')
const jwt = require('jsonwebtoken');
const path = require('path');
const {checkUser} = require("./actions/checkUser.js");
let { targetRole } = require('./bot-params.json');
const {secret} = require("./config");
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
    return {
        id,
        name,
        username,
        avatar,
        roles,
        hasRole
    };
};
class authController {
    async login(req, res) {
        try {
            const {idUser} = req;
            // console.log(req)
            if (!idUser) {
                return res.status(400).json({message: `Пользователь не найден`})
            }
            if (idUser != adminData.getAdminId()[0]) {
                return res.status(400).json({message: `Пользователь не является администратором`})
            }
            const token = generateAccessToken(idUser)
            return res.json({token})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Login error'})
        }
    };

    async getUsers(req, res) {
        try {
            const users = {answer:listOfUsers.getUsersList()}
            console.log('дошло')
            res.json(users)
        } catch (e) {
            console.log(e)
        }
    };

    async getAdminData(req, res) {
        try {
            const data = listOfUsers.getUser(req.user.id);
            data.guilds = adminData.getGuilds();
            console.log('дошло')
            res.json(data)
        } catch (e) {
            console.log(e)
        }
    };
    async auditUsers(req, res) {
        try {
            const target = req.body.target;
            const guildId = req.body.guild;
            console.log('1')
            // if (!target) {
                const guild = client.guilds.cache.find((guild) => {return guild.id == guildId}); 

                console.log('2')
                const members = [];  

                (await guild.members.fetch()).forEach((member => members.push(member)));
                console.log('3')
                for (let member of members){
                        await checkUser(member)                                 
                    }

            
                    console.log('4') 
                let users = [];
                let result = [];
                (await guild.members.fetch()).forEach((member => users.push(member)));
                console.log('3')
                for (let user of users){
                       if (!user.user.bot) {
                       result.push(makeUser(user))  
                       }                               
                    }        
            // const answer = {answer:makeUser(member)}
            console.log('5')

            res.json({answer:result} )
        } catch (e) {
            console.log(e)
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
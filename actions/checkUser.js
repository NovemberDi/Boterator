let { targetRole, nameOfWowGuild, apiUsername, apiPassword } = require('./../config.json');
const axios = require('axios');
// const cheerio = require('cheerio');

const logger = require('../actions/logger.js');



async function checkUser(member){
    try{
    let currentUsers = await getListMembers();
    let name = (member.nickname||member.user.globalName||member.user.username).split(' ')[0].toLowerCase();
    return fixRole(currentUsers.includes(name), member)
}catch{
    console.log('ошибка при проверке');
    return 'Ошибка при проверке'
}
}

async function auditUsers(members){
    try{
    let currentUsers = await getListMembers();
    for (let member of members) { 
        let name = member.name.split(' ')[0].toLowerCase();
        member.auditResult = await currentUsers.includes(name) == member.hasRole;
    } 
}catch{
    console.log('ошибка при проверке');
    return 'Ошибка при проверке'
}
}


async function fixUsers(members){
    try{
    for (let member of members) {
       await fixRole((!member.hasRole), member)
    } 

}catch{
    console.log('ошибка при проверке');
    return 'Ошибка при проверке'
}
}

async function fixRole(roleIsFound,member){
    let answer = ''
    try{
        if (roleIsFound){
            if (await addRole(member)){
                answer += 'Является членом гильдии и ему назначена роль.'
            }else{
                answer += `Роль ${targetRole} не найдена!`
            }
        } else{
            if (await removeRole(member)){	
                answer += 'Не является членом гильдии. Роль недоступна.'
            }else{
                answer += `Роль ${targetRole} не найдена!`
            }
        };
        return answer
    }catch {
        return 'ошибка действий с ролями'
    }
}


async function removeRole(member){
    const role = await member.guild.roles.cache.find(channel => channel.name === targetRole);
    if (role ) {
        await member.roles.remove(role);
        console.log('Удалил роль')
        return true
    }
}
async function addRole(member){
    const role = await member.guild.roles.cache.find(channel => channel.name === targetRole);
    if (role ) {
        
        await member.roles.add(role);
        console.log('Добавил роль')
        return true
    }
}

module.exports = {
    checkUser,
    auditUsers,
    fixUsers
};


async function getListMembers(){
    let token;
    console.log('ждём данные с WOW Api')
    try{
    let responseToken = await axios.post(
    'https://oauth.battle.net/token',
    new URLSearchParams({
        'grant_type': 'client_credentials'
    }),
    {
        auth: {
        username: apiUsername,
        password: apiPassword
        }
    });
    token = responseToken.data.access_token
    // console.log(token)
    const response = await axios.get('https://eu.api.blizzard.com/data/wow/guild/eversong/'+nameOfWowGuild+'/roster', {
    params: {
        'namespace': 'profile-eu',
        'locale': 'ru_RU'
    },
    headers: {
        'Authorization': 'Bearer '+token
    }
    });
    console.log('Есть данные с WOW Api')
    return response.data.members.map(item => item.character.name.toLowerCase())
        }catch {
            console.log('Ошибка WOW Api')
            logger('Ошибка api проверки');
        }

}

// Проверка по имени пользователя через сайт
// async function checkName(member){
//     let name = member.nickname||member.user.globalName||member.user.username;
//     name = name.split(' ')[0]; 
//     let result;
//     try {
//     let response = await axios.get(`${checkLink + name}`);	
//         // console.log(response.status);
//           $ = cheerio.load(response.data);
//           $meta = await $('meta[name=description]'); 
//             result = await $meta[0].attribs.content.includes(nameOfWowGuild);
//             return result
//           }catch(err){
//             console.log(err.response.status);
//             return false
//           }
//         }





// async function checkName(member){
    // let name = (member.nickname||member.user.globalName||member.user.username).split(' ')[0];
    // let currentUsers = await getListMembers();
    // // for (let member of members) {
    // //     if (member.user.bot) continue;
    // try {
    
    //       }catch(err){
    //         console.log(err.response.status);
    //         return false
    //       }
// }
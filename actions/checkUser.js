let { targetRole, checkLink, nameOfWowGuild } = require('./../bot-params.json');
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
        if (member.user.bot) continue;  
        let name = (member.nickname||member.user.globalName||member.user.username).split(' ')[0].toLowerCase();
        return fixRole(currentUsers.includes(name), member)
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
            if (addRole(member)){
                answer += 'Является членом гильдии и ему назначена роль.'
            }else{
                answer += `Роль ${targetRole} не найдена!`
            }
        } else{
            if (removeRole(member)){	
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
        return true
    }
}
async function addRole(member){
    const role = await member.guild.roles.cache.find(channel => channel.name === targetRole);
    if (role ) {
        await member.roles.add(role);
        return true
    }
}
async function checkName(member){
    // let name = (member.nickname||member.user.globalName||member.user.username).split(' ')[0];
    // let currentUsers = await getListMembers();
    // // for (let member of members) {
    // //     if (member.user.bot) continue;
    // try {
    
    //       }catch(err){
    //         console.log(err.response.status);
    //         return false
    //       }
}
    
module.exports = {
    checkUser
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
      username: '00e989c3a3694449bf28280452091382',
      password: 'gSBpwPDYEm5kugO403NmGWxuJvQNqjdH'
    }
  }
);
token = responseToken.data.access_token
// console.log(token)
const response = await axios.get('https://eu.api.blizzard.com/data/wow/guild/eversong/демоны-семи-грехов/roster', {
  params: {
    'namespace': 'profile-eu',
    'locale': 'ru_RU'
  },
  headers: {
    'Authorization': 'Bearer '+token
  }
});
return response.data.members.map(item => item.character.name.toLowerCase())
    }catch {
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
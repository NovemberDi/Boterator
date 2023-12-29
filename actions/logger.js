const fs = require('node:fs');
module.exports = function(data){
try{
    if (!fs.existsSync('./log/')) fs.mkdirSync('./log/');
    fs.appendFile('./log/botlog.log', new Date() + ' || ' + data + '\n', (err) => { 
        if (err) { 
          console.log(err); 
        } 
      })
}catch(e) {
    console.log(e)
}

}
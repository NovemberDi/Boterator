const express = require('express');
const path = require('path')
const cors = require('cors');

const authRouter = require('./authRouter')

const {startBot} = require('./bot.js')

const {port} = require('./config.json');





const app = express()
app.use(cors({origin: '*'})); //чтобы браузер не ругался на другой адрес
app.use(express.json())
app.use("/auth", authRouter)
app.use('/',express.static(path.join(__dirname + '/bot-admin-panel/dist')));


const start = async () => {
    try {
        await startBot();
        app.listen(port, () => console.log(`server started on port ${port}`))
    } catch (e) {
        console.log(e)
    }
}

start()


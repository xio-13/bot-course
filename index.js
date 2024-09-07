const TelegramApi = require('node-telegram-bot-api')
const { gameOptions, againOptions } = require('./options')
const token = '7494659229:AAHU2eBzDOrQmJ0MGzCS4rQc8__PBsTWxxw'

const bot = new TelegramApi(token, {polling: true})

const chats = {}



const startGame = async (chatId) => {
    await bot.sendMessage(chatId, 'Зараз я загадую цифру від 0 до 9, а ти повинен її відгадати!')
            const randomNumber = Math.floor(Math.random() * 10)
            chats[chatId] = randomNumber;
            await bot.sendMessage(chatId, 'Відгадуй', gameOptions)
}


const start = () => {
    bot.setMyCommands([
        {command: '/start', description: 'Початкове привітання'},
        {command: '/info', description: 'Отримати інформацію про користувача'},
        {command: '/game', description: 'Гра вгадай цифру'},
    ])
    
    bot.on('message',async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
    
        if (text === '/start'){
           await bot.sendSticker(chatId,'https://sl.combot.org/programming_stickers/webp/0xf09f92bb.webp')
           return bot.sendMessage(chatId, `Добрий день!`)
        }
        if (text === '/info'){
           return bot.sendMessage(chatId, `Тебе  звати ${msg.from.first_name} `)
        }
        if (text === '/game'){
            return startGame(chatId);
        }
        return bot.sendMessage(chatId, 'Я тебе не розумію, спробуй ще раз!')
    })

    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        if (data === '/again'){
           return startGame(chatId)
        }
        if(data === chats[chatId]) {
            return await bot.sendMessage(chatId, `Вітаю, ти вгадав цифру ${chats[chatId]}`, againOptions)
        } else {
            return await bot.sendMessage(chatId, `Нажаль ти не вгадав, бот загадав цифру ${chats[chatId]}`, againOptions)
        }
        
    })
}

start()
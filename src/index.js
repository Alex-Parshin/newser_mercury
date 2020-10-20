import underscore from 'underscore'
import cli from 'cli-color'

import dotenv from 'dotenv'
dotenv.config()

import { GetData, SendData } from './connect'
import { Start } from './proceed'

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

global.app = {
    cli: cli,
    underscore: underscore,
    path: '/usr/src/app/logs/mercury-logs.txt'
}

async function run() {
    await GetData('news_unprocessed', async(message) => {
        console.log(global.app.cli.green(`${new Date()} Обрабатываю ${message.title}`))
        console.log(global.app.cli.yellow(`${new Date()} Обрабатываю ${message.href}`))
        message = await Start(message)
        if (message === null) {
            console.log(`${new Date()} Следующее сообщение...`)
            return
        } else {
            console.log(message)
            await SendData(message, 'news_processed')
        }
    })
}

run()
'use strict'

import Mercury from '@postlight/mercury-parser'
import { Custom } from './custom'
import { GetRandom } from './utils'
import { userAgents } from './data/config'
import { SendData } from './connect'

import { RemoveJavaScriptFunctions, RemoveEmptyStrings, RemoveMiltipleSpaces } from './cleaners'

async function handle(message, result) {
    message.content = result.content
    message.content = RemoveJavaScriptFunctions(message.content)
    message.content = RemoveEmptyStrings(message.content)
    message.content = RemoveMiltipleSpaces(message.content)

    /**
     * Some other
     * cleaners
     */

    message.lead_img = result.lead_image_url
    if (result.date_published) message.date = result.date_published
    if (message.lead_img === null) {
        console.log(message)
        console.log(global.app.cli.red(`${new Date()} Не смог поолучить картинку`))
        SendData(message, 'cannot_get_lead_img')
        message = null
    }
    return message
}

export async function Start(message) {
    try {
        const userAgent = userAgents[GetRandom(0, userAgents.length)]
        await Mercury.addExtractor(Custom(message.href))

        await Mercury.parse(message.href, {
            contentType: 'text',
            headers: {
                'User-Agent': userAgent
            }
        }).
        then(async result => {
            if (result.error) throw `${new Date()} ${result.message}`

            if (result.content.length < 10) {
                throw `${new Date()} Не смог получить контент!`
            } else {
                message = await handle(message, result)
            }
        });
    } catch (err) {
        console.log(`${new Date()} ${global.app.cli.red(err)}`)
        return null
    }
    return message
}
'use strict'

import fs from 'fs'

function getDomainFromUrl(url) {
    return url.split(/\/+/)[1].replace('www.', '');
}

export function Custom(href) {
    const domain = getDomainFromUrl(href)
    const customSelectors = [{
            domain: 'ria.ru',
            lead_image_url: {
                selectors: ['img']
            },
            content: {
                selectors: ['article__body'],
            }
        },
        {
            domain: 'vk.com',
            lead_image_url: {
                selectors: ['img']
            },
            content: {
                selectors: ['article__body'],
            }
        }
    ]

    customSelectors.forEach(selector => {
        if (selector.domain === domain) {
            console.log(`Нашел селектор для ${domain}!`)
            return site
        }
    })

    console.log(`Не нашел селектор для ${domain} (${href})`)
    let urls = fs.readFileSync(global.app.path, 'utf-8')
    urls = new Set(fs.readFileSync(global.app.path, 'utf-8').split('\n')).add(href)
    fs.writeFileSync(global.app.path, Array.from(urls).join('\n'))
    return {}
}
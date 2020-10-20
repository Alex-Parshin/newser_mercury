export function RemoveEmptyStrings(message) {
    let content = message.split('\n')

    let newMessage = []
    for (let line of content) {
        line = line.trim()
        if (line.length > 20) newMessage.push(line)
    }
    message = newMessage.join('\n')
    return message
}

export function RemoveMiltipleSpaces(message) {
    let content = message.split('\n')
    let chars = []
    content = content.map(line => {
        chars = line.split(' ')
        chars = chars.filter(char => {
            if (char) return char
        })
        line = chars.join(' ')
        return line
    })
    message = content.join('\n')
    return message
}

export function RemoveJavaScriptFunctions(message) {
    while (message.indexOf('function') !== -1) {
        let endIndex = 0,
            countStartBracer = 0,
            countEndBracer = 0
        const functionIndex = message.indexOf('function')
        if (functionIndex !== -1) {
            for (let i = functionIndex; i < message.length; i++) {
                if (message[i] === '{') {
                    countStartBracer += 1
                }
                if (message[i] === '}') {
                    countEndBracer += 1
                }
                if (countStartBracer !== 0 && countEndBracer === countStartBracer) {
                    endIndex = i
                    break
                }
            }
        }
        message = message.split(message.split('').splice(functionIndex, (endIndex - functionIndex) + 1).join('')).join('')
    }
    return message
}
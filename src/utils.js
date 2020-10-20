export async function Sleep(ms, msg = '') {
    const newMS = GetRandom(ms, ms + 1000)
    console.log(global.app.cli.yellow(`${new Date()} Задержка ${(newMS / 1000).toFixed(2)} секунд ${msg}`))
    return new Promise(resolve => setTimeout(resolve, newMS));
}

export function GetRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
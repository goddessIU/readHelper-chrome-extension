/**
 * 生成随机码字符串
 * @param {Number} len 
 * @param {Number} min 
 * @param {Number} max 
 */
export function getRandomSalt(len, min, max) {
    const salt = []
    for (let i = 0; i < len; i++) {
        const randomNum = Math.floor(Math.random() * (max - min + 1)) + min
        salt.push(`${randomNum}`)
    }
    return salt.join('')
}


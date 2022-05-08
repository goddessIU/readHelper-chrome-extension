import { getRandomSalt } from "../../../utils/random";
import { appId as appid, secretKey } from "./baiduConfig";
const md5 = require('md5')

/**
 * 生成百度翻译所需的sign
 * @param {String} q  
 */
function getBaiduSign(q) {
    //获取salt
    const salt = getRandomSalt(10, 0, 9)

    const signRaw = `${appid}${q}${salt}${secretKey}`

    const sign = md5(signRaw)

    return sign
}


/**
 * 生成百度翻译所需的url
 * @param {String} q 
 * @param {String} from 
 * @param {String} to 
 */
export function getBaiduUrl(q, from, to) {
    const sign = getBaiduSign(q, appid, secretKey)

    const baseUrl = `http://api.fanyi.baidu.com/api/trans/vip/translate?q=${q}&from=${from}&to=${to}&appid=${appid}&salt=${salt}&sign=${sign}`

    return baseUrl
}
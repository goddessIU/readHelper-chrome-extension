/**
 * 
 * @param {Function} fn 
 * @param {number} wait 
 * 
 * @return {Function}
 */
export function debouce(fn, wait = 100) {
    let timer = null
    return function (...args) {
        if (timer) {
            clearTimeout(timer)
            timer = null
        }
        setTimeout(() => {
            fn.call(this, ...args)
        }, wait)
    }
}
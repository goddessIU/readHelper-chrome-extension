import { debouce } from "./debounce"

//事件处理类
export class MouseMoveHandleClass {
    /**
     * absolute状态下的移动
     * 
     * @param {HTMLElement} header
     * @param {HTMLElement} block
     * @param {number} mouseHeaderLeft 
     * @param {number} mouseHeaderTop
     * @param {number} time
     * 
     * @return void
     */
    constructor(header, block, mouseHeaderLeft, mouseHeaderTop, time = 100) {
        this.header = header
        this.block = block
        this.mouseHeaderLeft = mouseHeaderLeft
        this.mouseHeaderTop = mouseHeaderTop
        this.callBack = debouce(this.moveBlock, time)
    }

    /**
     * 
     * @param {Event} event 
     */
    handleEvent(event) {
        this.callBack(event, this.header, this.block, this.mouseHeaderLeft, this.mouseHeaderTop)
    }

    /**
     * absolute状态下的移动
     * 
     * @param {Event} event
     * @param {HTMLElement} header
     * @param {HTMLElement} block
     * @param {number} mouseHeaderLeft 
     * @param {number} mouseHeaderTop
     * 
     * @return void
     */
    moveBlock(event, header, block, mouseHeaderLeft, mouseHeaderTop) {
        block.style.left = `${event.clientX - mouseHeaderLeft}px`
        block.style.top = `${event.clientY - mouseHeaderTop}px`
    }
}
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
    constructor(header, block, mouseHeaderLeft, mouseHeaderTop,  emitMouseup, time = 10) {
        this.header = header
        this.block = block
        this.mouseHeaderTop = mouseHeaderTop
        this.mouseHeaderLeft = mouseHeaderLeft
        this.callBack = debouce(this.moveBlock, time)
        this.emitMouseup = emitMouseup
    }

    /**
     * 
     * @param {Event} event 
     */
    handleEvent(event) {
        event.preventDefault()
        event.stopImmediatePropagation()

        this.callBack(event, this.header, this.block, this.mouseHeaderLeft, this.mouseHeaderTop, this.emitMouseup)
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
    moveBlock(event, header, block, mouseHeaderLeft, mouseHeaderTop, emitMouseup) {
        const minX = event.clientX - mouseHeaderLeft
        const minY = event.clientY - mouseHeaderTop

        const maxX = event.clientX + mouseHeaderLeft
        const maxY = event.clientY + mouseHeaderTop
        
        if (minX <= 0 || minY <= 0 || maxX >= (document.documentElement.clientWidth - 20) || maxY >= (document.documentElement.clientHeight - 20))  {
            emitMouseup.value = true
            return
        }

        block.style.left = `${minX}px`
        block.style.top = `${minY}px`
    }
}
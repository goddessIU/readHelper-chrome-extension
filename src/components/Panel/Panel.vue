<template>
    <div id="app" class="panel " ref="panel" @dragstart="() => false"
        @mousemove="changeCursorMethod" @mousedown="resizeMethod">
        <header class="panel__head" @mousedown="dragMethod" ref="panelHeader"></header>
        <div class="panel__body">
            <Note class="body__note" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
#readerHelper .panel {
    height: 300px;
    width: 300px;
    border: 2px solid black;

    box-sizing: border-box;

    background-color: #fff;
    z-index: 9999;
    
    position: fixed;
    left: 10vw;
    top: 3vh;

    color: black!important;

    .panel__head {
        width: 296px;
        height: 26px;
        box-sizing: border-box;

        cursor: move;
        background: #8aefb0;
    }

    .panel__body {
        box-sizing: border-box;
        width: 296px;
        height: 270px;

        color: black!important;
    }
}

</style>

<script setup>
import { ref, watch } from 'vue';
import { MouseMoveHandleClass } from '../../utils/MouseMoveHandleClass';
import Note from './Note/Note.vue'

const panel = ref(null)
const panelHeader = ref(null)

/**
 * 得到用于移动面板的相关方法和控制变量
 */
const useDrag = () => {
    const emitMouseup = ref(false)

    /**
     * 拖拽方法实现
     * @param {Event} e 
     */
    const dragMethod = (e) => {
        e.preventDefault()
        e.stopImmediatePropagation()

        const headerLeft = panel.value.getBoundingClientRect().left
        const headerTop = panel.value.getBoundingClientRect().top

        panel.value.style.left = headerLeft + 'px'
        panel.value.style.top = headerTop + 'px'


        //计算后面absolute需要的距离
        const mouseHeaderLeft = e.clientX - headerLeft
        const mouseHeaderTop = e.clientY - headerTop

        //事件处理对象
        const mouseMoveObj = new MouseMoveHandleClass(panelHeader.value, panel.value, mouseHeaderLeft, mouseHeaderTop, emitMouseup)

        emitMouseup.value = false

        document.addEventListener('mousemove', mouseMoveObj)

        panelHeader.value.onmouseup = function (e) {
            e.preventDefault()
            e.stopImmediatePropagation()

            document.removeEventListener('mousemove', mouseMoveObj)
            panelHeader.value.onmouseup = null
        }

        //用来处理如果操作界面到达上下左右最极端，需要取消掉移动事件，模拟mouseup
        const unwatch = watch(emitMouseup, (newValue) => {
            if (newValue === true) {
                document.removeEventListener('mousemove', mouseMoveObj)
                panelHeader.value.onmouseup = null
                unwatch()
            }
        })
    }

    return {
        dragMethod
    }
}
const {
    dragMethod
} = useDrag()
</script>
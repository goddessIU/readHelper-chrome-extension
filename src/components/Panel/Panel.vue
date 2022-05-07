<template>
    <div id="app" class="panel " ref="panel" :class="{ 'panel--resize': canResize }" @dragstart="() => false"
        @mousemove="changeCursorMethod" @mousedown="resizeMethod">
        <header class="panel__head" @mousedown="dragMethod" ref="panelHeader"></header>
        <main class="panel__body">
            <Note class="body__note" />
        </main>
    </div>
</template>

<style lang="scss" scoped>
#readerHelper .panel {
    height: 200px;
    width: 200px;
    border: 2px solid black;
    background-color: #fff;
    resize: both;
    z-index: 9999 ;
    box-sizing: border-box;
    position: fixed;
    left: 10vw;
    top: 3vh;



    .panel__head {
        width: 100%;
        height: 10%;

        cursor: move;
        background: #8aefb0;
    }

    .panel__body {
        width: 100%;
        height: 90%;
        box-sizing: border-box;
        overflow: hidden;

        .body__note {
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            overflow: hidden;

        }

    }
}

#readerHelper .panel--resize {
    cursor: nwse-resize !important;
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

// https://medium.com/the-z/making-a-resizable-div-in-js-is-not-easy-as-you-think-bda19a1bc53d
// const isResize = ref(false)
// const canResize = ref(false)
// const changeCursorMethod = (e) => {
//     const rect = panel.value.getBoundingClientRect()
//     if (Math.abs(rect.right - e.clientX) <= 30 && Math.abs(rect.bottom - e.clientY) <= 30) {
//         canResize.value = true
//     } else {
//         canResize.value = false
//     }
// }

// const resizeMethod = (e) => {
//     if (!canResize.value) {
//         return
//     }
//     const startX = e.clientX
//     const startY = e.clientY
//     function resizeMove(event) {
//         let a = event.clientX - startX
//         let b = event.clientY - startY
//         const v = Math.min(a / panel.value.getBoundingClientRect().width,  b / panel.value.getBoundingClientRect().height)
//         panel.value.style.width *= v
//         panel.value.style.height *= v
//     }
//     document.addEventListener('mousemove', resizeMove)
//     document.addEventListener('mouseup', (event) => {
//         document.removeEventListener('mousemove', resizeMove)
//     })
// }



</script>
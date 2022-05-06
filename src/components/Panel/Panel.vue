<template>
    <div id="app" class="panel " ref="panel"
        :class="{ 'panel--initial': isInitial, 'panel--absolute': isAbsolute, 'panel--fixed': (!isInitial && isFixed), 'panel--resize': isResize }"
        @dragstart="() => false" @mousemove="resizeMethod">
        <header class="panel__head" @mousedown="dragMethod" ref="panelHeader"></header>
        <main class="panel__body">
            <Note class="body__note" />
        </main>
    </div>
</template>

<style scoped lang="scss">
.panel {
    height: 20vw;
    width: 20vw;
    border: 2px solid black;
    background-color: #fff;

    z-index: 9999;



    .panel__head {
        width: 100%;
        height: 2vw;

        cursor: move;
        background-color: #8aefb0;
    }

    .panel__body {
        width: 20vw;
        height: 18vw;
        overflow: hidden;

        .body__note {
            width: 100%;
            height: 18vw;
        }
    }
}

.panel--initial {
    position: fixed;
    right: 10vw;
    top: 3vh;
}

.panel--fixed {
    position: fixed;
}

.panel--absolute {
    position: absolute;
}

.panel--resize {
    cursor: nwse-resize!important;
}
</style>

<script setup>
import { ref } from 'vue';
import { MouseMoveHandleClass } from '../../utils/MouseMoveHandleClass';
import Note from './Note/Note.vue'

const panel = ref(null)
const panelHeader = ref(null)

/**
 * 得到用于移动面板的相关方法和控制变量
 */
const useDrag = () => {
    const isInitial = ref(true)
    const isFixed = ref(true)
    const isAbsolute = ref(false)
    /**
     * 拖拽方法实现
     * @param {Event} e 
     */
    const dragMethod = (e) => {
        const headerLeft = panelHeader.value.getBoundingClientRect().left
        const headerTop = panelHeader.value.getBoundingClientRect().top

        if (isInitial.value) {
            isInitial.value = false
        }
        isAbsolute.value = true
        panel.value.style.left = headerLeft + 'px'
        panel.value.style.top = headerTop + 'px'


        //计算后面absolute需要的距离
        const mouseHeaderLeft = e.clientX - panelHeader.value.getBoundingClientRect().left
        const mouseHeaderTop = e.clientY - panelHeader.value.getBoundingClientRect().top

        //事件处理对象
        const mouseMoveObj = new MouseMoveHandleClass(panelHeader.value, panel.value, mouseHeaderLeft, mouseHeaderTop)

        //添加mousemove和mouseup事件
        document.addEventListener('mousemove', mouseMoveObj)

        document.addEventListener('mouseup', () => {
            isAbsolute.value = false
            isFixed.value = true
            document.removeEventListener('mousemove', mouseMoveObj)
        })
    }

    return {
        isInitial,
        isFixed,
        isAbsolute,
        dragMethod
    }
}
const {
    isInitial,
    isFixed,
    isAbsolute,
    dragMethod
} = useDrag()

const isResize = ref(false)
const resizeMethod = (e) => {
    const rect = panel.value.getBoundingClientRect()
    if (Math.abs(rect.right - e.clientX) <= 30 && Math.abs(rect.bottom - e.clientY) <= 30) {
        isResize.value = true
    }
}
</script>
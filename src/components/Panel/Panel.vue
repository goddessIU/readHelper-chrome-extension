<template>
    <div id="app" class="panel " ref="panel" @dragstart="() => false" @mousemove="changeCursorMethod"
        @mousedown="resizeMethod" v-if="showPanel">
        <header class="panel__head" @mousedown="dragMethod" ref="panelHeader">
            <div class="head__options">
                <span class="options__option" :class="{ 'options__option--choosed': index === curOption }"
                    v-for="(option, index) in options" @click.stop="chooseOption(index)">
                    {{ option }}
                </span>
            </div>
            <div class="head__close" @click.stop="closePanel">x</div>
        </header>
        <div class="panel__body">
            <keep-alive>
                <component :is="tabs[currentTab]"></component>
            </keep-alive>
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

    color: black !important;

    .panel__head {
        width: 296px;
        height: 26px;

        box-sizing: border-box;

        cursor: move;
        background: #8aefb0;

        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;

        .head__options {
            flex-grow: 1;

            justify-content: flex-start;
            align-items: flex-end;

            .options__option {
                background-color: rgb(255, 250, 205);
                height: 20px;

                display: inline-block;

                margin-right: 3px;

                flex-grow: 0;

                font: 12px cursive;
                color: black !important;

                cursor: pointer;
            }

            .options__option--choosed {
                background-color: rgb(151, 255, 255);
            }
        }

        .head__close {
            flex-basis: 20px;
            height: 26px;
            line-height: 26px;
            text-align: center;
            font-weight: bold;
            color: #fff !important;

            cursor: pointer;
        }
    }

    .panel__body {
        box-sizing: border-box;
        width: 296px;
        height: 270px;

        color: black !important;
    }
}
</style>

<script setup>
import { nextTick, onMounted, ref, watch } from 'vue';
import { MouseMoveHandleClass } from '../../utils/MouseMoveHandleClass';
import Note from './Note/Note.vue'
import SearchEngine from './SearchEngine/SearchEngine.vue'

const panel = ref(null)
const panelHeader = ref(null)

/**
 * 展示面板相关逻辑
 */
const useShowPanel = () => {
    //接受popup发来的信息
    onMounted(() => {
        chrome.runtime.onMessage.addListener(
            function (message) {
                if (message.open === true) {
                    showPanel.value = true
                }
            }
        )
    })

    const closePanel = () => {
        if (showPanel.value) {
            showPanel.value = false
        }
    }

    return {
        closePanel
    }
}
const {
    closePanel
} = useShowPanel()




//关于选择面板功能的函数
const useOptions = () => {
    //动态组件相关
    const currentTab = ref('Note')
    const tabs = {
        Note,
        SearchEngine
    }
    const tabName = ['Note', 'SearchEngine']

    const showPanel = ref(false)
    const options = ref(['页面标签', '搜索功能'])
    const curOption = ref(0)
    const chooseOption = (index) => {
        curOption.value = index
        currentTab.value = tabName[index]
    }
    return {
        options,
        curOption,
        chooseOption,
        currentTab,
        tabName,
        tabs,
        showPanel
    }
}
const {
    options,
    curOption,
    chooseOption,
    currentTab,
    tabName,
    tabs,
    showPanel
} = useOptions()



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
<template>
    <article class="note">
        <ul class="noteMark" ref="noteMarkRef">
            <li class="noteMark__mark" v-for="(markText, index) in markDB" @click="clickMark(index)"
                :class="{ 'noteMark__mark--clicked': curMarkIndex === index }">
                <div class="mark__content">
                    {{ markText }}
                </div>
                <span class="mark__close" @click="deleteMark($event, index)">
                    删
                </span>
            </li>
        </ul>
        <aside class="noteControl">
            <button class="noteControl__markButton" @click="addMark">
                打下标记
            </button>
            <textarea cols="10" rows="10" class="noteControl__text" placeholder="标记内容" v-model="markText"
                @keyup.shift.enter.prevent="addMark"></textarea>
        </aside>
    </article>
</template>

<script setup>
import { ref } from 'vue';

/**
 * 添加mark标签的函数
 */
const useAddMark = () => {
    //记录mark详情
    const markText = ref('')

    //记录打下mark时的位置
    const markPos = ref([])

    //当前选中或处于哪个mark
    const curMarkIndex = ref(0)

    //mark信息记录
    const markDB = ref([])

    //添加mark的方法
    const addMark = () => {
        if (markText.value.trim() === '') {
            return
        }
        markDB.value.push(markText.value)
        markPos.value.push({
            x: window.pageXOffset,
            y: window.pageYOffset
        })
        markText.value = ''
        curMarkIndex.value = markDB.value.length - 1
    }

    return {
        markText,
        markDB,
        addMark,
        markPos,
        curMarkIndex
    }
}
const {
    markText,
    markDB,
    addMark,
    curMarkIndex,
    markPos
} = useAddMark()

/**
 * 使用mark标签滚动
 */
const useMarkToScroll = () => {
    const clickMark = (index) => {
        const { x, y } = markPos.value[index]
        window.scrollTo(x, y)
        curMarkIndex.value = index
    }
    return {
        clickMark
    }
}
const {
    clickMark
} = useMarkToScroll()

/**
 * 删除mark标签
 * @param {Event} e 
 * @param {number} index 
 */
const deleteMark = (e, index) => {
    e.stopPropagation()
    e.stopImmediatePropagation()

    if (index < 0 || index >= markDB.value.length) {
        return
    }
    markDB.value.splice(index, 1)
    markPos.value.splice(index, 1)
    if (index === curMarkIndex.value) {
        curMarkIndex.value = curMarkIndex.value - 1 || 0
    } else if (index < curMarkIndex.value) {
        curMarkIndex.value -= 1
    }
}

</script>

<style scoped lang="scss">
#readerHelper .note {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: nowrap;

    color: black !important;

    .noteMark {
        width: 180px;
        height: 270px;

        box-sizing: border-box !important;

        overflow: auto;
        border-right: 2px solid black;


        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;

        .noteMark__mark {
            width: 178px;
            height: 30px;
            box-shadow: 0 1px 2px 0 black;

            box-sizing: border-box;

            font: 16px cursive;

            overflow-x: hidden;

            display: flex;
            align-items: center;
            justify-content: flex-start;
            flex-shrink: 0;

            .mark__content {
                flex-basis: 150px;

                height: 30px;
                line-height: 30px;

                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            .mark__close {
                color: black!important;
                font: 16px cursive;

                flex-grow: 1;

                height: 30px;
                line-height: 30px;

                overflow: hidden;
            }
        }




        .noteMark__mark--clicked {
            background-color: rgb(80, 181, 161);
        }
    }

    .noteControl {
        width: 116px;
        height: 270px;

        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;

        box-sizing: border-box !important;

        .noteControl__markButton {
            width: 116px;
            height: 20px;
            line-height: 20px;
            box-sizing: border-box;

            color: black !important;
            font: 12px cursive;

            text-align: center;

            border-top: 1px solid black !important;
            border-bottom: 1px solid black !important;
            background-color: rgb(212, 242, 113) !important;

            transition: font-weight 0.3s linear;

            cursor: pointer;

            &:hover {
                font-weight: bold;
            }
        }



        .noteControl__text {
            width: 116px;
            height: 250px;

            color: black !important;
            font: 14px cursive;

            resize: none;
        }
    }
}
</style>
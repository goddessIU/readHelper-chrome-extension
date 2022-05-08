<template>
    <div class="searchEngine">
        <input type="text" v-model="inputValue" class="searchEngine__content" @keyup.enter.stop="goSearch">
        <div class="searchEngine__SelecteAndConfirm">
            <select v-model="selectedValue" class="SelecteAndConfirm__select">
                <option value="baidu" selected>百度</option>
                <option value="google">谷歌</option>
                <option value="bing">必应</option>
                <option value="github">github</option>
            </select>
            <button @click="goSearch" class="SelecteAndConfirm__button">
                搜一下
            </button>
        </div>
    </div>
</template>

<style scoped lang="scss">
.searchEngine {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    .searchEngine__content {
        margin-top: 20px;

        width: 296px;
        height: 30px;
        outline: none;
        border: 2px solid black;
        box-sizing: border-box;
        font: 16px cursive;
    }

    .searchEngine__SelecteAndConfirm {
        margin-top: 10px;
        flex-grow: 1;
        width: 296px;
        font: 16px cursive;
        height: 80px;

        display: flex;
        justify-content: space-around;
        align-items: center;

        .SelecteAndConfirm__select {
            width: 100px;
            height: 30px;
            flex-grow: 0;
            font: 16px cursive !important;
        }

        .SelecteAndConfirm__button {
            width: 100px;
            height: 30px;
            font: 16px cursive !important;

            cursor: pointer;

            flex-grow: 0;
            border: 1px solid black;
            outline: none;

            background-color: rgb(131, 197, 95);
        }
    }
}
</style>

<script setup>
import { ref } from 'vue';

/**
 * 使用搜索引擎相关逻辑
 */
const useSearchEngine = () => {
    const inputValue = ref('')
    const selectedValue = ref('baidu')
    const goSearch = () => {
        chrome.runtime.sendMessage({
            purpose: 'searchEngine',
            engine: selectedValue.value,
            query: inputValue.value
        })
    }
    return {
        inputValue,
        selectedValue,
        goSearch
    }
}
const {
    inputValue,
    selectedValue,
    goSearch
} = useSearchEngine()

</script>
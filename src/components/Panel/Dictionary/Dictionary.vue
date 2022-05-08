<template>
    <article class="translation">
        <section class="translation__input">
            <div class="translation__title">
                提供的是百度翻译
            </div>
            <div class="translation__search">
                <input type="text" class="search__text" placeholder="输入单词" v-model="searchText">
                <button class="search__button" @click="searchMethod">搜一下</button>
            </div>
        </section>
        <section class="translation__output">
            青青草原懒大王
        </section>
    </article>
</template>

<style scoped lang="scss">
#readerHelper .translation {
    width: 296px;
    height: 270px;
    background-color: red;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    box-sizing: border-box;

    .translation__input {
        width: 296px;
        height: 80px;

        box-sizing: border-box;

        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;

        .translation__title {
            font: 12px cursive;
            height: 20px;
        }

        .translation__search {
            width: 296px;
            height: 60px;

            display: flex;
            justify-content: flex-start;
            align-items: center;

            .search__text { 
                width: 200px;
                height: 25px;

                font: 12px cursive;
            }

            .search__button {
                border: none;
                outline: none;

                height: 25px;

                flex-grow: 1;

                font: 12px cursive;

                background-color: rgb(72, 98, 10);
            }
        }
    }

    
}
</style>

<script setup>
import { ref } from 'vue';
import { getBaiduUrl } from './utils.js'
import instance from '../../../api/axios.js'

const searchText = ref('')

const searchMethod = async () => {
    const content = searchText.value
    searchText.value = ''

    if (content === '') {
        return
    }

    const url = getBaiduUrl(content, 'en', 'zh')
    
    const answer = await instance.get(url)

    console.log(answer, '*')
}
</script>
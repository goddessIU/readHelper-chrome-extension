<template>
    <article class="note">
        <div class="noteMark">
            <section class="noteMark__mark">
                标记1
            </section>
            <section class="noteMark__mark">
                标记1
            </section>
            <section class="noteMark__mark">
                标记1
            </section>
            <section class="noteMark__mark">
                标记1
            </section>
            <section class="noteMark__mark">
                标记1
            </section>
            <section class="noteMark__mark">
                标记1
            </section>
            <section class="noteMark__mark">
                标记1
            </section>
            <section class="noteMark__mark">
                标记1
            </section>
            <section class="noteMark__mark">
                标记1
            </section>
        </div>
        <aside class="noteControl">
            <button class="noteControl__markButton">
                打下标记
            </button>
        </aside>
    </article>
</template>

<style scoped lang="scss">
#readerHelper .note {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: nowrap;

    .noteMark {
        width: 60%;
        height: 100%;
        overflow: scroll;
        border-right: 2px solid black;
        box-sizing: border-box;

        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;

        .noteMark__mark {
            width: 100%;
            height: 30px;
            box-shadow: 0 1px 2px 0 black;
            box-sizing: border-box;
            font: 16px cursive;

            display: flex;
            align-items: center;
            justify-content: center;

            flex-shrink: 0;
        }
    }

    .noteControl {
        width: 40%;
        height: 100%;

        .noteControl__markButton {
            width: 100%;
            height: 20px;
            line-height: 20px;
            font: 12px cursive;
            text-align: center;
            border: 1px solid black!important;
            background-color: rgb(212, 242, 113)!important;
            transition: font-size 0.3s linear;
            overflow: hidden;
        }

        .noteControl__markButton:hover {
           font-size: 16px;
        }
    }
}
</style>
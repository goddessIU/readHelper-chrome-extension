<template>
    <div class="note">
        <textarea name="" placeholder="请将重要内容放在这里" class="note__text"></textarea>
    </div>
</template>

<style scoped>
    .note {
        width: 100%;
        height: 100%;
    }
    .note__text {
        resize: none;
        width: 100%;
        height: 100%;
        max-width: 100%;
        max-height: 100%;
    }
    .note__text::placeholder {
        font: 16px cursive;
    }
</style>
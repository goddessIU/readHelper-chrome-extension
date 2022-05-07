<template>
    <button 
        id="openInterFace"
        @click="sendOpenToPanel"
    >
        打开面板
    </button>
</template>

<script setup>
/**
 * 发送消息
 */
const useSendMessage = () => {
    /**
     * 利用chrome api发送打开面板信息给content script
     */
    const sendOpenToPanel = () => {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            const tab = tabs[0]
            chrome.tabs.sendMessage(tab.id, {
                open: true
            })
            window.close()
        })
    }
    return {
        sendOpenToPanel
    }
}
const {
    sendOpenToPanel
} = useSendMessage()
</script>

<style scoped>
#openInterFace {
    width: 80px;
    height: 30px;
    border: none;
    outline: none;
    background-color: rgb(68, 153, 137);
    overflow: hidden;
    transition: all .3s linear;
    transform: scale(1);
}

#openInterFace:hover {
    color: blue;
    transform: scale(1.2);
}


</style>

import { createApp } from "vue";
import Panel from './Panel.vue'
import '../../styles/reset.css'

/**
 * 使用阿里图标库
 */
// function renderAli(src, cssSrc) {
//     const script = document.createElement('script')
//     script.src = src

//     const link = document.createElement('link')
//     link.rel = 'stylesheet'; 
//     link.type = 'text/css';
//     link.href = cssSrc;
//     document.body.append(css)
//     document.body.append(script)
// }
// renderAli('//at.alicdn.com/t/font_3383490_q4j3n1chum.js', '../../styles/aliFont.css')


const MOUNT_EL_ID = "readerHelper";

let mountEl = document.getElementById(MOUNT_EL_ID);
if (mountEl) {
    mountEl.innerHTML = "";
}
mountEl = document.createElement('div');
mountEl.setAttribute("id", MOUNT_EL_ID);
document.body.append(mountEl)

createApp(Panel).mount(mountEl);

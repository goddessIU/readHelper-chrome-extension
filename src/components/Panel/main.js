import { createApp } from "vue";
import Panel from './Panel.vue'
import '../../styles/reset.css'

const MOUNT_EL_ID = "readerHelper";

let mountEl = document.getElementById(MOUNT_EL_ID);
if (mountEl) {
    mountEl.innerHTML = "";
}
mountEl = document.createElement('div');
mountEl.setAttribute("id", MOUNT_EL_ID);
document.body.append(mountEl)


const vm = createApp(Panel).mount(mountEl);

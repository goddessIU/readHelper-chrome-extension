import { createApp } from "vue";
import Panel from './Panel.vue'
import '../../styles/reset.css'

const MOUNT_EL_ID = "attonex_clipper";

let mountEl = document.getElementById(MOUNT_EL_ID);
if (mountEl) {
    mountEl.innerHTML = "";
}
mountEl = document.createElement("div");
mountEl.setAttribute("id", MOUNT_EL_ID);
document.body.appendChild(mountEl);
const vm = createApp(Panel).mount(mountEl);
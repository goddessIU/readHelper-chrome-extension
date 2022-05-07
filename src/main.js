import { createApp, DefineComponent } from "vue";
import Popup from "./Popup.vue";

const MOUNT_EL_ID = "readHelperPopup";

let mountEl = document.getElementById(MOUNT_EL_ID);

if (mountEl) {
    mountEl.innerHTML = "";
} else if (mountEl === null) {
    mountEl = document.createElement("div");
    mountEl.setAttribute("id", MOUNT_EL_ID);
}

document.body.appendChild(mountEl);

createApp(Popup).mount(mountEl);
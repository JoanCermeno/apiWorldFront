import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/main.css";
import "sweetalert2/dist/sweetalert2.min.css";

const app = createApp(App);

app.use(router).mount("#app");

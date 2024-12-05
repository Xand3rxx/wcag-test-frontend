import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router";
import ApiService from "@/helpers/services/ApiService";
import "./assets/css/style.css";

const app = createApp(App);
ApiService.init(app);

app.use(router);
app.mount("#app");

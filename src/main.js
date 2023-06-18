import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia"
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const pinia = createPinia();

firebase.auth().onAuthStateChanged(()=>{
    createApp(App).use(router).use(pinia).mount("#app");
})


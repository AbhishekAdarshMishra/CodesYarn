import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia"
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import CKEditor from '@ckeditor/ckeditor5-vue';

const pinia = createPinia();

firebase.auth().onAuthStateChanged(()=>{
    createApp(App).use(router).use(pinia).use(CKEditor).mount("#app");
})


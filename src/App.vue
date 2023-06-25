<template>
  <div class="app-wrapper">
    <div class="app">
      <Navigation v-if="route"/>
      <router-view ></router-view>
      <Footer v-if="route"/>

    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import Footer from './components/Footer.vue';
import Navigation from './components/Navigation.vue';
import { useRoute } from 'vue-router'
import {useStore} from './store/store';
import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';
import db from "./firebase/firebaseinit"

const route = computed(()=>{
  if(useRoute().path=='/login' || useRoute().path=='/register' || useRoute().path=='/forgetPassword')
    return false;
  return true;
});

const { updateUser, getCurrentUser, getPost } = useStore();
onMounted(()=>{
  firebase.auth().onAuthStateChanged((user)=> {
    updateUser(user);
    if(user) {
      getCurrentUser();
    }
  });
  getPost();
})
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Roboto+Mono&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Quicksand", sans-serif;
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.container {
  max-width: 1440px;
  margin: 0 auto;
}

.link {
  cursor: pointer;
  text-decoration: none;
  text-transform: uppercase;
  color: black;
}

.link-light {
  color: #fff;
}</style>

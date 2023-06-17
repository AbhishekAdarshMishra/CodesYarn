<template>
  <div class="app-wrapper">
    <div class="app">
      <Navigation/>
      <router-view></router-view>
      <!-- <Home/> -->
      <Footer/>

    </div>
  </div>
</template>

<script setup>
import Footer from './components/Footer.vue';
import Navigation from './components/Navigation.vue';
import Home from './views/Home.vue';
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap");

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

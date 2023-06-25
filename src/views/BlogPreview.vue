<template>
    <div class="post-view">
      <div class="container quillWrapper">
        <h1><b>{{ blogTitle }}</b></h1>
        <img class="img" :src="blogPhotoFileURL" alt="" />
        <div class="post-content ql-editor" v-html="blogHtml"></div>
      </div>
      <CustomButtonBlack class="back" @click="backToPost">Back</CustomButtonBlack>
    </div>
  </template>
  
  <script lang="ts" setup>
  import router from '../router';
import { useStore } from '../store/store';
import { storeToRefs } from 'pinia';
import CustomButtonBlack from '../components/CustomButtonBlack.vue';

    const { blogHtml, blogPhotoFileURL, blogTitle } = storeToRefs(useStore() as any);

    function backToPost() {
        router.push({ path: '/createPost' })
    }
  </script>
  
  <style lang="scss">
  .post-view {
    // text-align: center;
    min-height: 100%;
  
    .container {
      text-align: center;
      max-width: auto;
      padding: 60px 25px;
    }
  
    .ql-editor {
      padding: 0;
      img {
        text-align: initial;
      }
    }
  
    h2 {
      margin-bottom: 16px;
      font-weight: 300;
      font-size: 32px;
    }
  
    .img {
      width: 60%;
      margin-bottom: 32px;
    }
  }
  .back {
    position: absolute;
    top: 80px;
    left: 5px;
  }
  .btn{
        margin-top: 20px;
        width: 130px;
        height: 40px;
        color: #fff;
        border-radius: 5px;
        padding: 10px 25px;
        font-family: 'Lato', sans-serif;
        font-weight: 500;
        background: transparent;
        cursor: pointer;
        transition: all 0.3s ease;
        // position: relative;
        display: inline-block;
        box-shadow:inset .5px .5px .5px 0px rgba(255,255,255,.5),
        3px 3px 10px 0px rgba(0,0,0,.1),
        1px 1px 2px 0px rgba(0,0,0,.1);
        outline: none;
        background: rgb(62, 62, 63);
        background: linear-gradient(0deg, rgb(49, 49, 53) 0%, rgb(57, 58, 59) 100%);
        border: none;
        }
    .btn:hover {
        background: rgb(85, 85, 87);
        background: linear-gradient(0deg, rgb(26, 26, 31) 0%, rgb(15, 15, 17) 100%);
        box-shadow:inset 2px 2px 2px 0px rgba(255,255,255,.5),
        7px 7px 20px 0px rgba(0,0,0,.1),
        4px 4px 5px 0px rgba(0,0,0,.1);
    }
  </style>
  
<template>
    <div class="post-view" v-if="state.currentBlog">
      <div class="container quillWrapper">
        <h1><u>{{ state.currentBlog[0].blogTitle }}</u></h1>
        <h3>Posted on: {{ new Date(state.currentBlog[0].blogDate).toLocaleString("en-us", { dateStyle: "long" }) }}</h3>
        <img :src="state.currentBlog[0].blogCoverPhoto" alt="" />
        <div class="post-content ql-editor" v-html="state.currentBlog[0].blogHtml"></div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
import { onMounted, reactive } from 'vue';
import { useStore } from '../store/store';
import { useRoute } from 'vue-router';
const route = useRoute();
const { allBlogCards } = useStore() as any;
interface State {
    currentBlog: any[]|null;
}
    const state:State = reactive({
        currentBlog: null,
      });

    onMounted(async ()=>{
      state.currentBlog = await allBlogCards.filter((post) => {
        return post.blogID === route.params.blogid;
        });
        console.log(state.currentBlog);
    });
    

  </script>
  
  <style lang="scss">
  .post-view {
    h1{
      font-size: 35px;
    }
    h3 {
      font-weight: 400;
      font-size: 16px;
      margin-bottom: 24px;
    }
    .post-content{
        font-size: 16px;
    }
    .container {
      padding-top: 20px;
      img{
        width: 50%;
      }
    }
  }
  </style>
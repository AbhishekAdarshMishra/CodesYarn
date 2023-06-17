<template>
    <div class="blog-card-wrap">
      <div class="blog-cards container">
        <div v-if="profileAdmin" class="toggle-edit">
          <span>Toggle Editing Post</span>
          <input type="checkbox" v-model="editPost" />
        </div>
        <BlogCard :post="post" v-for="(post, index) in allBlogCards" :key="index" />
      </div>
    </div>
  </template>
<script lang="ts" setup>
import { computed, onBeforeUnmount } from 'vue';
import {useStore} from '../store/store';
import {storeToRefs} from 'pinia';
import BlogCard from '../components/BlogCard.vue';
const { allBlogCards, BlogCardsEdit, isprofileAdmin } = storeToRefs(useStore())
const { toggleBlogCardsEdit } = useStore();
const editPost = computed({
      get() {
        return BlogCardsEdit;
      },
      set(val) {
        toggleBlogCardsEdit(val);
      }
    });

const profileAdmin = computed(()=> {
    return isprofileAdmin;
});
onBeforeUnmount(()=>{
  toggleBlogCardsEdit(false);
  });
</script>
<style lang="scss" scoped>
.blog-card-wrap {
    padding: 20px;
    h3 {
        font-weight: 300;
        font-size: 28px;
        margin-bottom: 32px;
    }
    background-color: rgb(240, 240, 240);
}
.blog-cards {
  position: relative;
  display: flex;
    flex-wrap: wrap;
    gap: 20px;
    align-items: center;
    justify-content: center;
    margin-top: 70px;

  .toggle-edit {
    display: flex;
    align-items: center;
    position: absolute;
    top: -70px;
    right: 0;

    span {
      margin-right: 16px;
    }

    input[type="checkbox"] {
      position: relative;
      border: none;
      appearance: none;
      background: rgb(95, 93, 93);
      outline: none;
      width: 50px;
      height: 20px;
      border-radius: 10px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    input[type="checkbox"]:before {
      content: "";
      position: absolute;
      width: 20px;
      height: 20px;
      border-radius: 10px;
      top: 0px;
      left: 0;
      background: gray;
      transform: scale(1.1);
      transition: 750ms ease all;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    input:checked[type="checkbox"]:before {
      background: #303030;
      left: 29px;
    }
  }
}
</style>
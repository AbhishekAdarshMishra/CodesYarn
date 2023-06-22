<template>
    <div >
        <FrontPage></FrontPage>
        <!-- <BlogPost v-if="!user" :post="state.welcomeScreen" /> -->
        <!-- <BlogPost :post="post" v-for="(post, index) in blogPostsFeed" :key="index" /> -->
        <div class="blog-card-wrap">
            <div class="container">
                <h3>View More Recent Blogs</h3>
                <div class="blog-cards">
                    <BlogCard :post="post" v-for="(post, index) in getBlogPosts" :key="index" />
                </div>
            </div>
        </div>
        <div v-if="!user" class="updates">
            <div class="container">
                <h2>never miss a post. Register for your free account today!</h2>
                <router-link class="router-button" :to="{name: 'Register'}"> 
                    Register for CodesYarn
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import BlogPost from "../components/BlogPost.vue";
import BlogCard from "../components/BlogCard.vue";
import FrontPage from "../components/FrontPage.vue";
import {useStore} from '../store/store';
import {storeToRefs} from 'pinia';

interface State {
    welcomeScreen: {
        title: string,
        blogPost: string,
        welcomeScreen: boolean,
        photo: string
    },
    sampleBlogPost: any[],
}

const state: State = {
    welcomeScreen: {
        title: "Welcome!",
        blogPost:
            "Weekly blog articles with all things programming including HTML, CSS, JavaScript and more. Register today to never miss a post!",
        welcomeScreen: true,
        photo: "a",
    },
    sampleBlogPost: [
        {
            blogTitle:"This is a Filler Title",
            blogHTML:"<div>This is Filler</div>",
            blogCoverPhoto: "../assets/BlogPhotos/a.jpg"
        },
        {
            blogTitle: "This is a Filler Title",
            blogHTML: "<div>This is Filler</div>",
            blogCoverPhoto: "../assets/BlogPhotos/b.png"
        }
    ],
}

const { allBlogCards, user, getBlogPosts } = storeToRefs(useStore() as any);


const blogPostsFeed = computed(() => {
    return state.sampleBlogPost;
});


</script>

<style lang="scss" scoped>
.blog-card-wrap {
    h3 {
        font-weight: 300;
        font-size: 28px;
        margin-bottom: 32px;
    }
    background-color: rgb(240, 240, 240);
    padding: 20px;
}
.blog-cards {
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    align-items: center;
    justify-content: center;
}
.updates {
    .container {
        padding: 100px 25px;
        display: flex;
        flex-direction: column;
        align-items: center;

        @media (min-width: 800px) {
            padding: 125px 25px;
            flex-direction: row;
        }

        .router-button {
            // display: flex;
            font-size: 14px;
            text-decoration: none;
            color: white;
            background-color: rgb(49, 47, 47);
            padding: 10px 25px;
            border-radius: 20px;

            @media (min-width: 800px) {
                margin-left: auto;
            }
        }
        .router-button:hover {
            background: rgb(85, 85, 87);
        }

        h2 {
            font-weight: 300;
            font-size: 32px;
            max-width: 425px;
            width: 100%;
            text-align: center;
            text-transform: uppercase;

            @media (min-width: 800px) {
                text-align: initial;
                font-size: 40px;
            }
        }
    }
}
</style>
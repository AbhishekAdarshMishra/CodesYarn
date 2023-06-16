<template>
    <div class="home">
        <BlogPost v-if="!user" :post="state.welcomeScreen" />
        <BlogPost :post="post" v-for="(post, index) in blogPostsFeed" :key="index" />
        <div class="blog-card-wrap">
            <div class="container">
                <h3>View More Recent Blogs</h3>
                <div class="blog-cards">
                    <BlogCard :post="post" v-for="(post, index) in blogPostsCards" :key="index" />
                </div>
            </div>
        </div>
        <div v-if="!user" class="updates">
            <div class="container">
                <h2>never miss a post. Register for your free account today!</h2>
                <router-link class="router-button" to="#"> Register for FireBlogs
                    <!-- <Arrow class="arrow arrow-light" /> -->
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import BlogPost from "../components/BlogPost.vue";
import BlogCard from "../components/BlogCard.vue";
// import Arrow from "../assets/Icons/arrow-right-light.svg";

interface State {
    welcomeScreen: {
        title: string,
        blogPost: string,
        welcomeScreen: boolean,
        photo: string
    },
    sampleBlogPost: any[],
    sampleCard: any[]
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
            blogHTML:"<div>Hello</div>",
            blogCoverPhoto: "../assets/BlogPhotos/a.jpg"
        },
        {
            blogTitle: "This is a Filler Title",
            blogHTML: "<div>Hello2</div>",
            blogCoverPhoto: "../assets/BlogPhotos/b.png"
        }
    ],
    sampleCard: [
        { blogTitle: "Blog Card #1", blogCoverPhoto: "stock-1", blogDate: "May 1, 2023"},
        { blogTitle: "Blog Card #2", blogCoverPhoto: "stock-2", blogDate: "May 2, 2023" },
        { blogTitle: "Blog Card #3", blogCoverPhoto: "stock-3", blogDate: "May 3, 2023" },
        { blogTitle: "Blog Card #4", blogCoverPhoto: "stock-4", blogDate: "May 4, 2023" },

    ]
}



const blogPostsFeed = computed(() => {
    // return this.$store.getters.blogPostsFeed;
    return state.sampleBlogPost;
});
const blogPostsCards = computed(() => {
    // return this.$store.getters.blogPostsCards;
    return state.sampleCard;
});
const user = computed(() => {
    // return this.$store.state.user;
    return false;
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
    padding: 20px
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
            display: flex;
            font-size: 14px;
            text-decoration: none;

            @media (min-width: 800px) {
                margin-left: auto;
            }
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
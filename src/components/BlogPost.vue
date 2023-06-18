<template>
    <div class="blog-wrapper" :class="{ 'no-user': !user }">
        <div class="blog-content">
            <div>
                <h2 v-if="props.post.welcomeScreen">{{ props.post.title }}</h2>
                <h2 v-else>{{ props.post.blogTitle }}</h2>
                <p v-if="props.post.welcomeScreen">{{ props.post.blogPost }}</p>
                <p class="content-preview" v-else v-html="props.post.blogHTML"></p>
                <router-link class="link link-light" v-if="props.post.welcomeScreen" to="#">
                    Login/Register
                </router-link>
                <!-- <router-link class="link" v-else :to="{ name: 'ViewBlog', params: { blogid: this.post.blogID } }"> -->
                   <div class="link">View The Post</div> 
                <!-- </router-link> -->
            </div>
        </div>
        <div class="blog-photo">
            <!-- <img v-if="props.post.welcomeScreen" :src="require(`../assets/blogPhotos/${props.post.photo}.jpg`)" alt="" /> -->
            <img  src="../assets/BlogPhotos/a.jpg" alt="" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { PropType, computed } from 'vue';
import {useStore} from '../store/store';
import {storeToRefs} from 'pinia';

const {  user } = storeToRefs(useStore())
const props = defineProps({
    post: {
        type: Object as PropType<any>
    }
})


</script>

<style lang="scss" scoped>
.blog-wrapper {
    display: flex;
    flex-direction: column;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

    @media (min-width: 700px) {
        min-height: 650px;
        max-height: 650px;
        flex-direction: row;
    }

    .blog-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 4;
        order: 2;

        @media (min-width: 700px) {
            order: 1;
        }

        @media (min-width: 800px) {
            flex: 3;
        }

        div {
            max-width: 375px;
            padding: 72px 24px;

            @media (min-width: 700px) {
                padding: 0 0px;
            }

            h2 {
                font-size: 32px;
                font-weight: 300;
                text-transform: uppercase;
                margin-bottom: 24px;

                @media (min-width: 700px) {
                    font-size: 40px;
                }
            }

            p {
                font-size: 15px;
                font-weight: 300;
                line-height: 1.7;
            }

            .content-preview {
                font-size: 13px;
                max-height: 24px;
                width: 250px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .link {
                display: inline-flex;
                align-items: center;
                margin-top: 32px;
                padding-bottom: 4px;
                border-bottom: 1px solid transparent;
                transition: 0.5s ease-in all;

                &:hover {
                    border-bottom-color: #303030;
                    cursor: pointer;
                }
            }

            .link-light {
                color: white;
                text-decoration: none;
                &:hover {
                    border-bottom-color: #ffff;
                    cursor: pointer;
                }
            }
        }
    }

    .blog-photo {
        order: 1;
        flex: 3;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

        @media (min-width: 700px) {
            order: 2;
        }

        @media (min-width: 800px) {
            flex: 4;
        }

        img {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    &:nth-child(even) {
        .blog-content {
            order: 2;
        }

        .blog-photo {
            order: 1;
        }
    }
}
.arrow {
    height: 20px;
    width: auto;
    margin-bottom: -4px;
}

.no-user:first-child {
    .blog-content {
        background-color: #303030;
        color: #fff;
    }
}
</style>
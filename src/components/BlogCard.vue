<template>
    <div class="blog-card">
        <div v-show="BlogCardsEdit" class="icons">
            <div @click="editBlog" class="icon">
                <img src="../assets/icons/edit.png" class="edit" />
            </div>
            <div @click="deletePost" class="icon">
                <img src="../assets/icons/delete.png" class="delete" />
            </div>
        </div>
        <router-link class="link" :to="{ name: 'ViewBlog', params: { blogid: props.post.blogID } }">
        <img class="photo" :src="post.blogCoverPhoto" alt="{{ post.blogCoverName }}" />
        </router-link>
        <div class="info">
            <h2>{{ props.post.blogTitle }}</h2>
            <h6>Posted on: {{ new Date(props.post.blogDate).toLocaleString("en-us", { dateStyle: "long" }) }}</h6>
            <router-link class="link" :to="{ name: 'ViewBlog', params: { blogid: props.post.blogID } }">
            View The Post
            <!-- <img src="../assets/icons/arrow.png" class="icon"/> -->
        </router-link>
        </div>
    </div>

</template>

<script lang="ts" setup>
import { PropType, computed } from "vue";
import { useStore } from "../store/store";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const { BlogCardsEdit} = storeToRefs(useStore() as any);
const {deleteBlogPost} = useStore() as any;
const router = useRouter();
const props = defineProps({
    post: {
        type: Object as PropType<any>
    }
})
function deletePost() {
    deleteBlogPost(props.post.blogID);
}
function editBlog() {
    router.push({ name: "EditBlog", params: { blogid: props.post.blogID } });
}

</script>

<style lang="scss" scoped>
.blog-card {
    position: relative;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    background-color: #fff;
    min-height: 420px;
    min-width: 350px;
    transition: 0.5s ease all;

    &:hover {
        transform: rotateZ(-1deg) scale(1.01);
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    .icons {
        display: flex;
        position: absolute;
        top: 10px;
        right: 10px;
        z-index: 99;

        .icon {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 35px;
            height: 35px;
            border-radius: 50%;
            background-color: #fff;
            transition: 0.5s ease all;

            &:hover {
                background-color: #303030;

                .edit,
                .delete {
                    path {
                        fill: #fff;
                    }
                }
            }

            &:nth-child(1) {
                margin-right: 8px;
            }

            .edit,
            .delete {
                pointer-events: none;
                height: 20px;
                width: auto;
            }
        }
    }

    img.photo {
        display: block;
        border-radius: 8px 8px 0 0;
        z-index: 1;
        max-width: 350px;
        min-height: 200px;
        object-fit: cover;
    }

    .info {
        // display: flex;
        // flex-direction: column;
        height: 100%;
        z-index: 3;
        padding: 32px 16px;
        color: #000;
        cursor:auto;
        text-align: center;
        h2 {
            margin: 0;
        }
        h4 {
            padding-bottom: 8px;
            font-size: 20px;
            font-weight: 300;
        }

        h6 {
            margin: 16px 0;
            font-weight: 400;
            font-size: 10px;
            color: gray;
        }

        .link {
            cursor: pointer;
            color: #fff;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            margin-top: auto;
            font-weight: 500;
            font-size: 12px;
            padding-bottom: 4px;
            transition: 0.5s ease-in all;
            background-color: black;
            padding: 8px 14px;
            border-radius: 5px;

            &:hover {
                background-color: rgba(50, 48, 48, 0.8);
                color: white;
            }

            .arrow {
                width: 10px;
            }
        }
    }
}
</style>
<template>
    <div class="page">
        <div class="left">
            <div class="tagline">
                <div class="title">CodesYarn</div>
                <div class="content">Achieve your coding interview related goals with CodesYarn's structured and stremlined resouces.</div>
                <button class="btn" @click="ViewBlog">View Blogs</button>
            </div>
        </div>
        <div class="right">
            <div class="image">
                <img class="img" src="../assets/front.png"/>    
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';


    const router = useRouter();
    function ViewBlog() {
        router.push({ name: "Blogs"});
    }
</script>

<style lang="scss" scoped>
.page {
    
    height: 90vh;
    display: flex;
    flex-direction: row;

    .left {
        .tagline {
            position: relative;
            left: 20%;
            width: 60%;
            top: 35%;
            .title {
                font-weight: 700;
                font-size: 30px;
                margin-bottom: 20px;
            }
            .content {
                font-size: 18px;
                margin-bottom: 40px;
            }
        }
    }

    .right {
        background-color: black;
        margin: 0;
        
        .image {
            position: relative;
        top: 40%;
            text-align: center;
            
            .img {
                width: 40%;
                height: auto;
                border-radius: 20px;
            }
        }
    }
}
</style>
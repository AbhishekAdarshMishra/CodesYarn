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
    width: 100%;
    height: 92.75vh;
    display: flex;
    flex-direction: row;

    .left {
        width:50%;
        .tagline {
            padding-top: 35%;
            padding-left: 15%;
            padding-right: 15%;
            height: inherit;
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
        width: 50%;
        
        .image {
            margin-top: 45%;
            text-align: center;
            
            .img {
                width: 40%;
                height: auto;
                border-radius: 20px;
            }
        }
    }
}
@media (max-width: 760px) {
    .page {
       flex-direction: column; 
       .left {
        width: 100%;
        height: 70vh;
       }
       .right {
        height: 70vh;
        width: 100%;
        .image {
            margin-top: 15%;
            text-align: center;
        }
       }
    }
  }
</style>
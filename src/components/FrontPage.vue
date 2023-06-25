<template>
    <div class="page">
        <div class="left">
            <div class="tagline">
                <div class="title">CodesYarn...</div>
                <div class="content">Achieve your coding interview related goals with CodesYarn's structured and stremlined resouces.</div>
                <button class="btn" @click="ViewBlog">View Blogs</button>
            </div>
        </div>
        <div class="right">
            <div class="image">
                <img class="img" src="../assets/front9.png"/>    
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
                font-size: 40px;
                margin-bottom: 20px;
                overflow: hidden; 
                animation: typing 4s steps(100) infinite; 
                display: inline-block;
            }
            
            @keyframes typing {
                from { width: 0; }
                to { width: 50%; }
            }
            
            .content {
                font-size: 18px;
                margin-bottom: 40px;
            }
        }
    }

    .right {
        background-color: white;
        margin: 0;
        width: 50%;
        
        .image {
            margin-top: 23%;
            text-align: center;
            // margin-left: 10%;
            
            .img {
                width: 100%;
                height: auto;
                border-radius: 20px;
                animation: moveText 2s infinite;
                
            }
            @keyframes moveText {
            0% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-20px);
            }
            100% {
                transform: translateY(0);
            }
            }
        }
    }
}
@media (max-width: 760px) {
    .page {
        height: auto;
       flex-direction: column; 
       .left {
        width: 100%;
        height: 70vh;
       }
       .right {
        height: auto;
        width: 100%;
        display: none;
        .image {
            margin-top: 15%;
            text-align: center; 
            .img {
            height: 50vh;
            
        }
        }
        
       }
    }
  }
</style>
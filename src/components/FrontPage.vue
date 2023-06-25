<template>
    <div class="page">
        <div class="left">
            <div class="tagline">
                <div class="title">CodesYarn </div>
                <h2>Platform to <span class="typed-text wrap"></span><span class="cursor blink">&nbsp;</span></h2>
                <div class="content">Achieve your coding interview related goals with CodesYarn's structured and stremlined resouces.</div>
                <CustomButton @custom-click="ViewBlog"> View Blog</CustomButton>
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
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import CustomButton from '../components/CustomButtonBlack.vue'


const router = useRouter();
function ViewBlog() {
    router.push({ name: "Blogs"});
}


onMounted(()=> {
    const typedText = document.querySelector(".typed-text");
const cursor = document.querySelector(".cursor");

const textArray = ["Explore.","Enhance.", "Execute."];

let textArrayIndex = 0;
let charIndex = 0;

function erase() {
  if (charIndex > 0) {
    cursor?.classList.remove('blink');
    typedText!.textContent = textArray[textArrayIndex].slice(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, 80);
  } else {
    cursor?.classList.add('blink');
    textArrayIndex++;
    if (textArrayIndex > textArray.length - 1) {
      textArrayIndex = 0;
    }
    setTimeout(type, 1000);
  }
}

function type() {
  if (charIndex <= textArray[textArrayIndex].length - 1) {
    cursor?.classList.remove('blink');
    typedText!.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, 120);
  } else {
    cursor?.classList.add('blink');
    setTimeout(erase, 1000);
  }
}
    type();
})
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
                font-size: 50px;
                overflow: hidden; 
                // animation: typing 4s steps(100) infinite; 
                display: inline-block;
                color: #333334;
            }
            
            @keyframes typing {
                from { width: 0; }
                to { width: 50%; }
            }
            .wrap {
                border-bottom: .1em solid;
            }
            
            .content {
                font-size: 18px;
                margin-bottom: 40px;
            }
        }
    }

    .typed-text {
        color: #525FE1;
    }
    .cursor {
        display: inline-block;
        width: 3px;
        margin-left: 4px;
        background: black;
    }

    .cursor.blink {
        animation: blink 0.8s ease-in-out infinite;
    }

    @keyframes blink {
    0%, 100% {
        background: #525FE1;
    }
    40%, 50% {
        background: transparent;
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
        height: 60vh;
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
    .h2 {
        display: block;
        margin-bottom: 0;
    }
  }
</style>
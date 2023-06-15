<template>
    <header>
        <nav class="container">
            <div class="branding">
                <router-link class="header" :to="{ name: 'Home' }"><img src="../assets/codesyarn.png" width="150" height="30"></router-link>
            </div>
            <div class="nav-links">
                <ul><router-link class="link" to="#">Home</router-link>
                    <router-link class="link" to="#">Blogs</router-link>
                    <router-link class="link" to="#">Create Page</router-link>
                    <router-link class="link" to="#">Login/Register</router-link>
                </ul>
            </div>
            <!-- <img src="../assets/icons/menu.svg" class="menu-icon" />
            <transition name="mobile-view">
                <ul><router-link class="link" to="#">Home</router-link>
                        <router-link class="link" to="#">Blogs</router-link>
                        <router-link class="link" to="#">Create Page</router-link>
                        <router-link class="link" to="#">Login/Register</router-link>
                    </ul>
            </transition> -->
        </nav>
    </header>
</template>
<script lang="ts" setup>
</script>

<style lang="scss" scoped>
header {
    background-color: #fff;
    padding: 0 25px;
    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.66);
    z-index: 99;
}
.link {
    font-weight:500;
    padding: 0 8px;
    transition: 0.3s color ease;

    &:hover {
        color: gray;
    }
}

nav {
    display: flex;
    padding: 10px 0;
    .branding {
        display: flex;
        align-items: center;
        .header {
            font-weight: 600;
            font-size: 24px;
            text-decoration: none;
            color: #000;
        }
    }
}
</style>
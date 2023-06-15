<template>
    <header>
        <nav class="container">
            <div class="branding">
                <router-link class="header" :to="{ name: 'Home' }"><img src="../assets/codesyarn.png" width="150"
                        height="30"></router-link>
            </div>
            <div class="nav-links">
                <ul v-show="!state.mobileNav && !state.mobile">
                    <router-link class="link" to="#">Home</router-link>
                    <router-link class="link" to="#">Blogs</router-link>
                    <router-link class="link" to="#">Create Page</router-link>
                    <router-link class="link" to="#">Login/Register</router-link>
                </ul>
            </div>
            <img @click="toggleMobileNav" src="../assets/icons/menu.svg" class="menu-icon" v-show="state.mobile" />
            <transition name="mobile-nav">
                <ul class="mobile-nav" v-show="state.mobileNav">
                    <router-link class="link" to="#">Home</router-link>
                    <router-link class="link" to="#">Blogs</router-link>
                    <router-link class="link" to="#">Create Page</router-link>
                    <router-link class="link" to="#">Login/Register</router-link>
                </ul>
            </transition>
        </nav>
    </header>
</template>
<script lang="ts" setup>
import { getCurrentInstance, reactive } from 'vue';

interface State {
    mobile: boolean|null;
    mobileNav: boolean|null;
    windowWidth: number | null;
}
const state: State = reactive({
    mobile: null,
    mobileNav: null,
    windowWidth: null,
})

// const root = getCurrentInstance();
function checkScreen() {
    state.windowWidth = window.innerWidth;
    if (state.windowWidth <= 750) {
        state.mobile = true;
        return;
    }
    state.mobile = false;
    state.mobileNav = false;
    return;
}

function toggleMobileNav() {
    state.mobileNav = !state.mobileNav;
    console.log(state.mobileNav);
}

window.addEventListener("resize", checkScreen);
checkScreen();

</script>

<style lang="scss" scoped>
header {
    background-color: #fff;
    padding: 0 25px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.66);
    z-index: 99;
}

.link {
    font-weight: 500;
    padding: 0 8px;
    transition: 0.3s color ease;

    &:hover {
        color: gray;
        cursor: pointer;
    }
}

nav {
    display: flex;
    padding: 5px 0;

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

    .nav-links {
        position: relative;
        display: flex;
        flex: 1;
        align-items: center;
        justify-content: flex-end;

        ul {
            margin-right: 22px;

            .link {
                margin-right: 22px;
            }

            .link:last-child {
                margin-right: 0;
            }
        }
    }
}

.menu-icon {
    cursor: pointer;
    position: relative;
    right: 0px;
    height: 25px;
    width: auto;
    margin: 13px
}

.mobile-nav {
    padding: 20px;
    margin-top: 0;
    width: 70%;
    max-width: 250px;
    display: flex;
    flex-direction: column;
    position: fixed;
    height: 100%;
    background-color: #303030;
    top: 0;
    left: 0;

    .link {
        padding: 15px 0;
        color: #fff;

    }

}

.mobile-nav-enter-active,.mobile-nav-leave-active {
    transition: all 1s ease;
}

.mobile-nav-enter {
    transform: translateX(-250px);
}

.mobile-nav-enter-to {
    transform: translate(0);
}

.mobile-nav-leave-to {
    transform: translate(-250px);
}

</style>
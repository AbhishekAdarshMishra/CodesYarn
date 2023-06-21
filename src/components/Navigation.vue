<template>
    <header>
        <nav class="container">
            <div class="branding">
                <router-link class="header" :to="{ name: 'Home' }"><img src="../assets/codesyarn.png" width="150"
                        height="30"></router-link>
            </div>
            <div class="nav-links">
                <ul v-show="!state.mobileNav && !state.mobile">
                    <router-link class="link" :to="{ name: 'Home' }">Home</router-link>
                    <router-link class="link" :to="{ name: 'Blogs' }">Blogs</router-link>
                    <router-link v-if="isprofileAdmin" class="link" :to="{ name: 'CreatePost' }">Create Post</router-link>
                    <router-link v-if="!user" class="link" :to="{ name: 'Login' }">Login/Register</router-link>
                </ul>

                <div v-if="user" :class="{ 'mobile-user-menu': state.mobile }" @click="toggleProfileMenu" class="profile"
                    ref="profile">
                    <span>{{ profileInitials }}</span>
                    <div v-show="state.profileMenu" class="profile-menu">
                        <div class="info">
                            <p class="initials">{{ profileInitials }}</p>
                            <div class="right">
                                <p>{{ profileFirstName }} {{ profileLastName }}</p>
                                <p>{{ profileUsername }}</p>
                                <p>{{ profileEmail }}</p>
                            </div>
                        </div>
                        <div class="options">
                            <div class="option">
                                <router-link class="option" :to="{ name: 'Profile' }">
                                    <img class="icon" src="../assets/icons/user.png"/>
                                    <p>Profile</p>
                                </router-link>
                            </div>
                            <div v-if="isAdmin" class="option">
                                <router-link class="option" :to="{ name: 'Admin' }">
                                    <img class="icon" src="../assets/icons/admin.png"/>
                                    <p>Admin</p>
                                </router-link>
                            </div>
                            <div @click="signOut" class="option">
                                <img class="icon" src="../assets/icons/logout.png"/>
                                <p>Sign Out</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        <img @click="toggleMobileNav" src="../assets/icons/menu.svg" class="menu-icon" v-show="state.mobile" />
        <transition name="mobile-nav">
            <ul class="mobile-nav" v-show="state.mobileNav">
                <router-link class="link" :to="{ name: 'Home' }">Home</router-link>
                <router-link class="link" :to="{ name: 'Blogs' }">Blogs</router-link>
                <router-link v-if="isprofileAdmin" class="link" :to="{ name: 'CreatePost' }">Create Post</router-link>
                <router-link v-if="!user" class="link" :to="{ name: 'Login' }">Login/Register</router-link>
            </ul>
        </transition>

    </header>
</template>
<script lang="ts" setup>
import { getCurrentInstance, reactive, ref } from 'vue';
import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';
import { useStore } from "../store/store"
import { storeToRefs } from 'pinia';

const { isprofileAdmin, user, profileInitials, profileEmail,
    profileFirstName,
    profileLastName,
    profileUsername,
    profileId } = storeToRefs(useStore());

    const {logout, isAdmin} = useStore() as any;

interface State {
    profileMenu: boolean | null,
    mobile: boolean | null;
    mobileNav: boolean | null;
    windowWidth: number | null;
}
const state: State = reactive({
    profileMenu: null,
    mobile: null,
    mobileNav: null,
    windowWidth: null,
})
const profile = ref(null);
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
}

function toggleProfileMenu(e) {
    if (e.target === profile.value) {
        state.profileMenu = !state.profileMenu;
    }
}

function signOut() {
    firebase.auth().signOut();
    window.location.reload();
    logout();
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


    .link {
        font-weight: 500;
        padding: 0 8px;
        transition: 0.3s color ease;

        &:hover {
            color: gray !important;
            ;
            cursor: pointer;
        }
    }

    nav {
        display: flex;
        padding: 5px 0;

        .branding {
            display: flex;
            align-items: center;
            padding: 10px;
            z-index: 0;
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
                    color: #000;
                    text-decoration: none;
                    margin-right: 22px;
                }

                .link:last-child {
                    margin-right: 0;
                }
            }
        }

        .profile {
            position: relative;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            color: #fff;
            background-color: #303030;

            span {
                pointer-events: none;
            }

            .profile-menu {
                position: absolute;
                top: 50px;
                right: 0;
                width: 280px;
                background-color: #303030;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

                .info {
                    display: flex;
                    align-items: center;
                    padding: 10px;
                    border-bottom: 1px solid #fff;

                    .initials {
                        position: initial;
                        padding: 8px;
                        background-color: #fff;
                        color: #303030;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border-radius: 50%;
                    }

                    .right {
                        flex: 1;
                        margin-left: 22px;
                        
                        p:nth-child(1) {
                            font-size: 14px;
                            margin: 5px 0px;
                        }

                        p:nth-child(2),
                        p:nth-child(3) {
                            font-size: 12px;
                            margin: 5px 0px;
                        }
                    }
                }

                .options {
                    padding: 15px;

                    .option {
                        text-decoration: none;
                        color: #fff;
                        display: flex;
                        align-items: center;
                        margin-bottom: 6px;

                        .icon {
                            width: 18px;
                            height: auto;
                            border-radius: 50%;
                            padding: 3px;
                            background-color: #fff;
                        }

                        p {
                            font-size: 12px;
                            margin-left: 12px;
                        }

                        &:last-child {
                            margin-bottom: 0px;
                        }
                    }
                }
            }
        }
    }

    .mobile-user-menu {
        margin-right: 40px;
    }
}

.menu-icon {
    cursor: pointer;
    position: absolute;
    top:0;
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

.mobile-nav-enter-active,
.mobile-nav-leave-active {
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
}</style>
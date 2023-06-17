<template>
    <div class="branding">
        <router-link class="header" :to="{ name: 'Home' }"><img src="../assets/codesyarn.png" width="150"
                height="30"></router-link>
    </div>
    <div class="form-wrap">
        <form class="register">
            <p class="login-register">
                Already have an account?
                <router-link class="router-link" :to="{ name: 'Login' }">Login</router-link>
            </p>
            <h2>Create Account</h2>
            <div class="inputs">
                <div class="input">
                    <input type="text" placeholder="First Name" v-model="state.firstName" />
                    <img src="../assets/icons/user.png" class="icon" />
                </div>
                <div class="input">
                    <input type="text" placeholder="Last Name" v-model="state.lastName" />
                    <img src="../assets/icons/user.png" class="icon" />
                </div>
                <div class="input">
                    <input type="text" placeholder="Username" v-model="state.username" />
                    <img src="../assets/icons/user.png" class="icon" />
                </div>
                <div class="input">
                    <input type="text" placeholder="Email" v-model="state.email" />
                    <img src="../assets/icons/email.png" class="icon" />
                </div>
                <div class="input">
                    <input type="password" placeholder="Password" v-model="state.password" />
                    <img src="../assets/icons/password.png" class="icon" />
                </div>
                <div v-show="state.error" class="error">{{ state.errorMsg }}</div>
            </div>
            <button @click.prevent="register" class="btn">Sign Up</button>
            <div class="angle"></div>
        </form>
        <div class="background"></div>
    </div>
</template>
  
<script lang="ts" setup>
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import db from "../firebase/firebaseinit";
import { reactive } from "vue";
import { useRouter } from 'vue-router';

interface State {
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string,
    error: boolean | null,
    errorMsg: string,
    router: any
}
const state: State = reactive({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    error: null,
    errorMsg: "",
    router: useRouter()
});

async function register() {
    if (
        state.email !== "" &&
        state.password !== "" &&
        state.firstName !== "" &&
        state.lastName !== "" &&
        state.username !== ""
    ) {
        state.error = false;
        state.errorMsg = "";
        const firebaseAuth = await firebase.auth();
        firebaseAuth.createUserWithEmailAndPassword(state.email, state.password)
            .then((result) => {
                db.collection("users").doc(result.user?.uid).set({
                    firstName: state.firstName,
                    lastName: state.lastName,
                    username: state.username,
                    email: state.email,
                });
                console.log("SignedIn");
                state.router.push({ name: "Home" });
            })
            .catch((error) => {
                state.error = true;
                state.errorMsg = error.message;
                return
            });

        return;
    }
    state.error = true;
    state.errorMsg = "Please fill out all the fields!";
    return;
}
</script>
  
<style lang="scss" scoped>
.register {
    h2 {
        max-width: 350px;
    }
}

.btn {
    margin-top: 20px;
    width: 130px;
    height: 40px;
    color: #fff;
    border-radius: 5px;
    padding: 10px 25px;
    font-family: 'Lato', sans-serif;
    font-weight: 500;
    background: transparent;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    display: inline-block;
    box-shadow: inset .5px .5px .5px 0px rgba(255, 255, 255, .5),
        3px 3px 10px 0px rgba(0, 0, 0, .1),
        1px 1px 2px 0px rgba(0, 0, 0, .1);
    outline: none;
    background: rgb(62, 62, 63);
    background: linear-gradient(0deg, rgb(49, 49, 53) 0%, rgb(57, 58, 59) 100%);
    border: none;
}

.btn:hover {
    background: rgb(85, 85, 87);
    background: linear-gradient(0deg, rgb(26, 26, 31) 0%, rgb(15, 15, 17) 100%);
    box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, .5),
        7px 7px 20px 0px rgba(0, 0, 0, .1),
        4px 4px 5px 0px rgba(0, 0, 0, .1);
}

.error {
    color: rgb(226, 67, 67);
}
</style>
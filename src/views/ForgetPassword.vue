<template>
    <div class="branding">
                <router-link class="header" :to="{ name: 'Home' }"><img src="../assets/codesyarn.png" width="150"
                        height="30"></router-link>
            </div>
    <div class="reset-password">
        <Modal v-if="state.modalActive" :modalMessage="state.modalMessage" v-on:close-modal="closeModal" />
        <Loading v-if="state.loading" />
        <div class="form-wrap">
            <form class="reset">
                <p class="login-register">
                    Back to
                    <router-link class="router-link" :to="{ name: 'Login' }">Login</router-link>
                </p>
                <h2>Reset Password</h2>
                <p>Forgot your passowrd? Enter your email to reset it</p>
                <div class="inputs">
                    <div class="input">
                        <input type="text" placeholder="Email" v-model="state.email" />
                        <img class="icon" src="../assets/icons/email.png"/>
                    </div>
                </div>
                <button @click.prevent="resetPassword" class="btn">Reset</button>
                <div class="angle"></div>
            </form>
            <div class="background"></div>
        </div>
    </div>
</template>
  
<script lang="ts" setup>
import Modal from "../components/Modal.vue";
import Loading from "../components/Loading.vue";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { reactive } from "vue";

interface State {
    email: string,
    modalActive: boolean,
    modalMessage: string,
    loading: boolean | null
}
const state: State = reactive({
    email: "",
    modalActive: false,
    modalMessage: "",
    loading: null,
});

function resetPassword() {
    state.loading = true;
    firebase
      .auth()
      .sendPasswordResetEmail(state.email)
      .then(() => {
        state.modalMessage = "If your account exists, you will receive a email";
        state.loading = false;
        state.modalActive = true;
      })
      .catch((err) => {
        state.modalMessage = err.message;
        state.loading = false;
        state.modalActive = true;
      });
}
function closeModal() {
    state.modalActive = !state.modalActive;
    state.email = "";
}
</script>
  
<style lang="scss" scoped>

.reset-password {
    position: relative;

    .form-wrap {
        .reset {
            h2 {
                margin-bottom: 8px;
            }

            p {
                text-align: center;
                margin-bottom: 32px;
            }
        }
    }
}
.btn{
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
        box-shadow:inset .5px .5px .5px 0px rgba(255,255,255,.5),
        3px 3px 10px 0px rgba(0,0,0,.1),
        1px 1px 2px 0px rgba(0,0,0,.1);
        outline: none;
        background: rgb(62, 62, 63);
        background: linear-gradient(0deg, rgb(49, 49, 53) 0%, rgb(57, 58, 59) 100%);
        border: none;
        }
    .btn:hover {
        background: rgb(85, 85, 87);
        background: linear-gradient(0deg, rgb(26, 26, 31) 0%, rgb(15, 15, 17) 100%);
        box-shadow:inset 2px 2px 2px 0px rgba(255,255,255,.5),
        7px 7px 20px 0px rgba(0,0,0,.1),
        4px 4px 5px 0px rgba(0,0,0,.1);
    }
</style>
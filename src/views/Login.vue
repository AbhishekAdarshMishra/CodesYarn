<template>
  <div class="branding">
    <router-link class="header" :to="{ name: 'Home' }"
      ><img src="../assets/codesyarn.png" width="150" height="30"
    /></router-link>
  </div>
  <div class="form-wrap">
    <form class="login">
      <p class="login-register">
        Don't have an account?
        <router-link class="router-link" :to="{ name: 'Register' }">
          Register
        </router-link>
      </p>
      <h2>Login to CodesYarn</h2>
      <div class="inputs">
        <div class="input">
          <input type="text" placeholder="Email" v-model="state.email" />
          <img src="../assets/icons/email.png" class="icon" />
        </div>
        <div class="input">
          <input
            type="password"
            placeholder="Password"
            v-model="state.password"
          />
          <img src="../assets/icons/password.png" class="icon" />
        </div>
        <div v-show="state.error" class="error">{{ state.errorMsg }}</div>
      </div>
      <router-link class="forgot-password" :to="{ name: 'ForgetPassword' }">
        Forgot your password?
      </router-link>
      <button @click.prevent="signIn" class="btn">Sign In</button>
      <div class="angle"></div>
    </form>
    <div class="background"></div>
  </div>
</template>

<script lang="ts" setup>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { reactive } from "vue";
import { useRouter } from "vue-router";

interface State {
  email: string;
  password: string;
  error: boolean | null;
  errorMsg: string;
  router: any;
}

const state: State = reactive({
  email: "",
  password: "",
  error: null,
  errorMsg: "",
  router: useRouter(),
});

function signIn() {
  firebase
    .auth()
    .signInWithEmailAndPassword(state.email, state.password)
    .then(() => {
      state.router.push({ name: "Home" });
      state.error = false;
      state.errorMsg = "";
      console.log(firebase.auth().currentUser?.uid);
    })
    .catch((err) => {
      state.error = true;
      state.errorMsg = err.message;
    });
}
</script>

<style lang="scss">
.error {
  color: rgb(226, 67, 67);
}
.branding {
  padding: 20px;
  position: absolute;
  z-index: 1;
}
.form-wrap {
  overflow: hidden;
  display: flex;
  height: 100vh;
  justify-content: center;
  align-self: center;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 900px) {
    width: 100%;
  }

  .login-register {
    margin-bottom: 32px;

    .router-link {
      color: #000;
    }
  }

  form {
    padding: 0 10px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
    @media (min-width: 900px) {
      padding: 0 50px;
    }

    h2 {
      text-align: center;
      font-size: 32px;
      color: #303030;
      margin-bottom: 40px;
      @media (min-width: 900px) {
        font-size: 40px;
      }
    }

    .inputs {
      width: 100%;
      max-width: 350px;

      .input {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 8px;
        input {
          width: 100%;
          border: none;
          background-color: #f2f7f6;
          padding: 4px 4px 4px 30px;
          height: 50px;

          &:focus {
            outline: none;
          }
        }

        .icon {
          width: 20px;
          position: absolute;
          left: 5px;
        }
      }
    }

    .forgot-password {
      text-decoration: none;
      color: #000;
      cursor: pointer;
      font-size: 14px;
      margin: 16px 0 32px;
      border-bottom: 1px solid transparent;
      transition: 0.5s ease all;

      &:hover {
        border-color: #303030;
      }
    }

    .angle {
      display: none;
      position: absolute;
      background-color: #fff;
      transform: rotateZ(3deg);
      width: 60px;
      right: -30px;
      height: 101%;
      @media (min-width: 900px) {
        display: initial;
      }
    }
  }

  .background {
    display: none;
    flex: 2;
    background-size: cover;
    //   background-image: url("../assets/background.jpg");
    background-color: gray;
    width: 100%;
    height: 100%;
    @media (min-width: 900px) {
      display: initial;
    }
  }

  .btn {
    width: 130px;
    height: 40px;
    color: #fff;
    border-radius: 5px;
    padding: 10px 25px;
    font-family: "Lato", sans-serif;
    font-weight: 500;
    background: transparent;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    display: inline-block;
    box-shadow: inset 0.5px 0.5px 0.5px 0px rgba(255, 255, 255, 0.5),
      3px 3px 10px 0px rgba(0, 0, 0, 0.1), 1px 1px 2px 0px rgba(0, 0, 0, 0.1);
    outline: none;
    background: rgb(62, 62, 63);
    background: linear-gradient(0deg, rgb(49, 49, 53) 0%, rgb(57, 58, 59) 100%);
    border: none;
  }
  .btn:hover {
    background: rgb(85, 85, 87);
    background: linear-gradient(0deg, rgb(26, 26, 31) 0%, rgb(15, 15, 17) 100%);
    box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
      7px 7px 20px 0px rgba(0, 0, 0, 0.1), 4px 4px 5px 0px rgba(0, 0, 0, 0.1);
  }
}
</style>

<template>
    <div class="admin">
        <div class="container">
            <h2>Administration</h2>
            <div class="admin-info">
                <h2>Add Admin</h2>
                <div class="input">
                    <input placeholder="Enter user email to make them an admin" type="text" id="addAdmins"
                        v-model="state.adminEmail" />
                </div>
                <span class="msg">{{ state.functionMsg }}</span>
                <CustomButtonBlack @click="addAdmin" >Submit</CustomButtonBlack>
            </div>
        </div>
    </div>
</template>
  
<script lang="ts" setup>
import firebase from "firebase/compat/app";
import "firebase/compat/functions";
import { reactive } from "vue";
import {useStore} from '../store/store';
import {storeToRefs} from 'pinia';
import CustomButtonBlack from "../components/CustomButtonBlack.vue";

const {updateAdminAccess} = useStore() as any;

const state = reactive({
    adminEmail: "",
    functionMsg: "",
});


async function addAdmin() {
    await updateAdminAccess(state.adminEmail);
    state.functionMsg = "Request Sent";
}
</script>
  
<style lang="scss" scoped>
.admin {
    .container {
        max-width: 1000px;
        padding: 60px 25px;

        h2 {
            text-align: center;
            margin-bottom: 16px;
            font-weight: 300;
            font-size: 32px;
        }

        .admin-info {
            border-radius: 8px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            padding: 32px;
            background-color: #f1f1f1;
            display: flex;
            flex-direction: column;
            max-width: 600px;
            margin: 32px auto;

            span {
                font-size: 14px;
            }

            .input {
                margin: 16px 0;

                label {
                    font-size: 14px;
                    display: block;
                    padding-bottom: 6px;
                }

                input {
                    width: 100%;
                    border: none;
                    background-color: #f2f7f6;
                    padding: 8px;
                    height: 50px;

                    @media (min-width: 900px) {}

                    &:focus {
                        outline: none;
                    }
                }
            }

            button {
                align-self: center;
            }
        }
    }
}
.msg {
    color: rgb(53, 164, 88);
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
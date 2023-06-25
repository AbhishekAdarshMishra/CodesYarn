<template>
    <div class="profile">
        <Modal v-if="state.modalActive" :modalMessage="state.modalMessage" v-on:close-modal="closeModal" />
        <div class="container">
            <h2>Account Settings</h2>
            <div class="profile-info">
                <div class="initials">{{ profileInitials }}</div>
                <div v-if="isprofileAdmin" class="admin-badge">
                    <img src="../assets/icons/admin2.png" class="icon"/>
                    <span>admin</span>
                </div>
                <div class="input">
                    <label for="firstName">First Name:</label>
                    <input type="text" id="firstName" v-model="profileFirstName" />
                </div>
                <div class="input">
                    <label for="lastName">Last Name:</label>
                    <input type="text" id="lastName" v-model="profileLastName" />
                </div>
                <div class="input">
                    <label for="username">Username:</label>
                    <input type="text" id="username" v-model="profileUsername" />
                </div>
                <div class="input">
                    <label for="email">Email:</label>
                    <input disabled type="text" id="email" v-model="profileEmail" />
                </div>
                <CustomButtonBlack @custom-click="updateProfile" >Save Changes</CustomButtonBlack>

            </div>
        </div>
    </div>
</template>
  
<script lang="ts" setup>
import { reactive } from "vue";
import Modal from "../components/Modal.vue";
import { useStore } from '../store/store';
import { storeToRefs } from 'pinia';
import CustomButtonBlack from "../components/CustomButtonBlack.vue";

const { isprofileAdmin, profileInitials, profileEmail, profileFirstName, profileLastName, profileUsername } = storeToRefs(useStore())
const { updateUserSettings } = useStore() as any;

interface State {
    modalMessage: string,
    modalActive: boolean | null,
}
const state: State = reactive({
    modalMessage: "Changes were saved!",
    modalActive: null,
})



function updateProfile() {
    updateUserSettings();
    state.modalActive = !state.modalActive;
}
function closeModal() {
    state.modalActive = !state.modalActive;
}


</script>
<style lang="scss" scoped>
.profile {
    .container {
        max-width: 1000px;
        padding: 60px 25px;

        h2 {
            text-align: center;
            margin-bottom: 16px;
            font-weight: 300;
            font-size: 32px;
        }

        .profile-info {
            border-radius: 8px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            padding: 32px;
            background-color: #f1f1f1;
            display: flex;
            flex-direction: column;
            max-width: 600px;
            margin: 32px auto;

            .initials {
                position: initial;
                width: 80px;
                height: 80px;
                font-size: 32px;
                background-color: #303030;
                color: #fff;
                display: flex;
                align-self: center;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
            }

            .admin-badge {
                display: flex;
                align-self: center;
                color: #fff;
                font-size: 14px;
                padding: 8px 24px;
                border-radius: 8px;
                background-color: #303030;
                margin: 16px 0;
                text-align: center;
                text-transform: capitalize;

                .icon {
                    width: 14px;
                    height: auto;
                    margin-right: 8px;
                }
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
.btn {
    width: 150px;
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
</style>
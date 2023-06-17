<template>
    <div class="modal">
      <div class="modal-content">
        <p>{{ props.modalMessage }}</p>
        <button class="btn" @click="closeModal">Close</button>
      </div>
    </div>
  </template>
  
<script lang="ts" setup>

const emit = defineEmits(['close-modal']);
const props = defineProps({
    modalMessage: {
        type: String
    }
});

function closeModal() {
    emit("close-modal");
}
</script>
  
  <style lang="scss" scoped>
  .modal {
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 101;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    background-color: rgba(0, 0, 0, 0.7);
  
    .modal-content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      border-radius: 8px;
      width: 300px;
      padding: 40px 30px;
      background-color: #fff;
  
      p {
        text-align: center;
      }
  
      button {
        align-self: center;
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
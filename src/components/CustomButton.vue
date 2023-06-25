<template>
    <button :class="{
      'custom-button': !state.isSmall,
      'custom-button-small': state.isSmall,
    }" @click="handleClick">
      <b><slot></slot></b>
    </button>
  </template>
  
  <script setup>
  import { defineEmits, defineProps, onBeforeMount, reactive } from 'vue';
  
  const emit = defineEmits(['custom-click']);

  const state = reactive({
    isSmall: props.btn==='small'? true: false,
  });

  const props = defineProps({
  btn: {
    type: String,
    default: 'large'
  }
})
  const handleClick = () => {
    emit('custom-click');
  };

  </script>
  
  <style >
  :root {
    --primary-color2: #525FE1;
}
  .custom-button {
    background-color: var(--primary-color2);
    border-radius: 5px;
    padding: 12px 25px;
    color: #fff;
    border: 2px solid var(--primary-color2);
    cursor: pointer;
  }
  .custom-button:hover {
    background-color: #fff;
    color: var(--primary-color2);
  }
  .custom-button-small {
    background-color: var(--primary-color2);
    border-radius: 5px;
    padding: 5px 10px;
    color: #fff;
    border: 2px solid var(--primary-color2);
    cursor: pointer;
  }
  .custom-button-small:hover {
    background-color: #fff;
    color: var(--primary-color2);
  }
  </style>
  
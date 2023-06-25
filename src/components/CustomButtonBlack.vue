<template>
    <button :class="{
      'custom-button-black': !state.isSmall,
      'custom-button-black-small': state.isSmall,
    }" @click="handleClick">
      <b><slot></slot></b>
    </button>
  </template>
  
  <script  setup >
  import { defineEmits, defineProps, onBeforeMount, reactive } from 'vue';
  
  const emit = defineEmits(['custom-click']);

  const state = reactive({
    isSmall: props.btn==='small'? true: false,
  });

  const props = defineProps({
  btn: {
    type: String,
    default: 'large'
  },
})
  const handleClick = () => {
    emit('custom-click');
  };

  </script>
  
  <style >
  :root {
    --primary-color: #333334;
}
  .custom-button-black {
    background-color: var(--primary-color);
    border-radius: 5px;
    padding: 12px 25px;
    color: #fff;
    border: 2px solid var(--primary-color);
    cursor: pointer;
  }
  .custom-button-black:hover {
    background-color: #fff;
    color: var(--primary-color);
  }
  .custom-button-black-small {
    background-color: var(--primary-color);
    border-radius: 5px;
    padding: 5px 10px;
    color: #fff;
    border: 2px solid var(--primary-color);
    cursor: pointer;
  }
  .custom-button-black-small:hover {
    background-color: #fff;
    color: var(--primary-color);
  }
  </style>
  
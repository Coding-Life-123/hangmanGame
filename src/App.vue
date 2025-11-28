<script setup>
  
</script>

<template>
  <div class="background-App">
    <router-view />
  </div>
</template>

<style scoped>
  .background-App{
    background: url("/background.png");
    display: flex;
    margin: auto;
    height: 100vh;
    width: 100vw;
    z-index: -2;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    position: absolute;
  }
</style>

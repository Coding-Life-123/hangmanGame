<script setup>

    import { defineProps } from 'vue';

    const props = defineProps({
        class:String,
        title:String
    });
</script>

<template>
    <div class="gradient-button-container">
        <button class="gradient-button">{{props.title}}</button>
    </div>
</template>

<style>
@keyframes rotar {
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.gradient-button-container{
  margin-top: 40vh;
  padding: 5px;
  position: relative;
  width: fit-content;
  overflow: hidden;
  border-radius: 12px;
}

.gradient-button{
  padding: 10px 20px;
  border-radius: 10px;
  border: none;
  font-weight: 700;
  font-size: 16px;
  background-color: rgb(50, 50, 50);
  color: white;
  cursor: pointer;
  z-index: 1;
}

.gradient-button-container::before{
  content: "";
  position: absolute;
  margin-top: -10px;
  margin-left: -420px;
  inset: -4px; /* margen para simular el borde */
  background: conic-gradient(
    #FF4BF4,
    #D44BFF,
    #4B68FF,
    #4BF1FF,
    #4B68FF,
    #D44BFF,
    #FF4BF4,
    #7F4BFF,
    #4B68FF,
    #4BF1FF,
    #4B68FF,
    #7F4BFF,
    #FF4BF4,
    #D44BFF,
    #4B68FF,
    #4BF1FF,
    #4B68FF,
    #D44BFF,
    #FF4BF4
  );
  padding: 3px;
  z-index: -1;
  width: 1000px;
  height: 1000px;
  border-radius: 50%;
  animation: rotar 6s linear infinite;
}


</style>
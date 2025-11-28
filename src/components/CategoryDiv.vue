<script setup>

import { defineProps, computed } from 'vue';

const props = defineProps({
    icon: String,
    title: String,
    bgColor: String,
});


console.log(props.icon, props.title, props.bgColor)

</script>
<template>
    <div class="category-div">
        <img :src="props.icon" :alt="props.title" >
        <h1>{{ props.title }}</h1>
    </div>
</template>
<style>
</style>
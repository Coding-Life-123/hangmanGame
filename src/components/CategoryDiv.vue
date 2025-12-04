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
        <button :style="{backgroundColor:props.bgColor}">
            <span>{{ props.icon }}</span>
            <h1>{{ props.title }}</h1>
        </button>
    </div>
</template>

<style>

    .category-div{
        display: flex;
        justify-content: center;
        transition: scale ease 0.7s;
    }

    .category-div:hover{
        scale: 1.1;
        transition: scale ease 1s;
    }

    .category-div button{
        display: flex;
        border-radius: 10px;
        width: fit-content;
        height: 80px;
        padding: 0px 20px;
        border: 2px solid white ;
        cursor: pointer;
    }    

    .category-div span{
        margin: auto;
        width: 18px;
    }

    .category-div h1{
        margin: auto 0;
        width: 150px;
    }
</style>
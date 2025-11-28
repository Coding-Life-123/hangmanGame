<script setup>
import CategoryDiv from '../components/CategoryDiv.vue';

const categories = [
  { icon:"", type: "Animales", color: "#6B4BFF" },
  { icon:"", type: "Frutas", color: "#FF6FD8" },
  { icon:"", type: "Países", color: "#25D8FF" },
  { icon:"", type: "Películas", color: "#FFB326" },
  { icon:"", type: "Videojuegos", color: "#14FF9E" },
  { icon:"", type: "Deportes", color: "#FF4848" },
  { icon:"", type: "Ciencia", color: "#49E3FF" },
  { icon:"", type: "Comida", color: "#FF8A4B" },
  { icon:"", type: "Historia", color: "#C28BFA" },
  { icon:"", type: "Música", color: "#FF4FA7" }
];

</script>

<template>
    <div class="categories-main">
        <h1>CATEGORÍAS:</h1>
        <div class="categories-list">
            <CategoryDiv v-for="category in categories" :icon="category.icon" :title="category.type" :bgColor="category.color"  />
        </div>
    </div>
</template>

<style>
    .categories-main{
        height: 90vh;
        width: 70vw;
        margin: auto;
        background-color: #101820;
        border-radius: 15px;
        box-shadow: 0 0 5px 5px white;
        display: flex;
        flex-direction: column;
        gap: 30px;
    }

    .categories-main h1{
        margin: 30px auto;
    }

    .categories-list{
        display: grid;
        grid-template-columns: 1fr 1fr;
        width: 80%;
        margin: auto;
    }
</style>
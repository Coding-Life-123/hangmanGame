<script setup>
import { useRoute } from 'vue-router';
import ButtonGradient from '../components/ButtonGradient.vue';
import CategoryDiv from '../components/CategoryDiv.vue';
import { ref } from 'vue';

const categories = [
  { icon:"🦁", type: "Animales", color: "#6B4BFF" },
  { icon:"🍎", type: "Frutas", color: "#FF6FD8" },
  { icon:"🏳️", type: "Países", color: "#25D8FF" },
  { icon:"🎬", type: "Películas", color: "#FFB326" },
  { icon:"🕹️", type: "Videojuegos", color: "#14FF9E" },
  { icon:"⚽", type: "Deportes", color: "#FF4848" },
  { icon:"🔬", type: "Ciencia", color: "#49E3FF" },
  { icon:"🍽️", type: "Comida", color: "#FF8A4B" },
  { icon:"📚", type: "Historia", color: "#C28BFA" },
  { icon:"🎵", type: "Música", color: "#FF4FA7" }
];

const route = useRoute();

const level = route.params.level

console.log(level)

const categoryVar = ref("");

function cambiarCat(newCat){
    categoryVar.value = newCat;
    console.log(categoryVar.value);
}

</script>

<template>
    <div class="categories-main">
        <h1 class="categories-title">CATEGORÍAS:</h1>
        <div class="categories-list">
            <CategoryDiv v-for="(category, index) in categories" :icon="category.icon" :title="category.type" :bgColor="category.color" :key="index" @click="cambiarCat(category.type)"/>
        </div>
        <div class="categories-next-button">
            <router-link :to="{name:'hangman-game', params:{category: categoryVar}}"><ButtonGradient :title="'Continuar'"/></router-link>
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

    .categories-title{
        margin: 30px auto 0px auto;
    }

    .categories-list{
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        width: 80%;
        margin: auto;
        row-gap: 40px;
        column-gap: 20px;
    }

    .categories-next-button{
        height: 100px !important;
        position: fixed;
        align-self: flex-end;
        margin-top: 40vh;
        margin-right: 5vw;
    }

    @media (max-width: 1210px) {
        .categories-list{
            grid-template-columns: repeat(2, 1fr);
        }
    }
</style>
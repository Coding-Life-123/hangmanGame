<script setup>
import ButtonGradient from '../components/ButtonGradient.vue';
import CategoryDiv from '../components/CategoryDiv.vue';
import { ref } from 'vue';

const newLvlVar = ref("facil");

function cambiarLvl(newLvl){
    newLvlVar.value = newLvl;
    console.log(newLvlVar.value);
}

</script>

<template>
    <div class="level-main">
        <h1 class="level-title">DIFICULTAD:</h1>
        <div class="level-list">
            <CategoryDiv :icon="'🔥'" :title="'Fácil'" :bgColor="'#2f2'" @click="cambiarLvl('facil')"/>
            <CategoryDiv :icon="'🔥🔥'" :title="'Media'" :bgColor="'#efef29'" @click="cambiarLvl('medio')"/>
            <CategoryDiv :icon="'🔥🔥🔥'" :title="'Difícil'" :bgColor="'#f22'" @click="cambiarLvl('dificil')"/>
        </div>
        <div class="level-next-button">
        <router-link :to="{name: 'categories', params:{level: newLvlVar}}"><ButtonGradient :title="'Continuar'"/></router-link>
        </div>
    </div>    
</template>

<style>
    .level-main{
        height: 50vh;
        width: 50vw;
        margin: auto;
        padding: 40px 0;
        background-color: #101820;
        border-radius: 15px;
        box-shadow: 0 0 5px 5px white;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .level-title{
        margin: 0px auto -20px auto;
    }

    .level-list{
        display: flex;
        flex-direction: column;
        width: 80%;
        margin: auto;
        row-gap: 40px;
    }

    .level-next-button{
        height: 100px !important;
        position: fixed;
        align-self: flex-end;
        margin-top: 7vh;
        margin-right: 1vw;
    }

</style>
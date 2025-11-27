<script setup>
import { ref } from 'vue';

const word = ref("");

const letters = [
  "a","b","c","d","e","f","g","h","i","j","k","l","m",
  "n","ñ","o","p","q","r","s","t","u","v","w","x","y","z"
];

word.value = "Manzana";
const chars = ref([...word.value.toLowerCase()]);
const display = ref(Array(chars.value.length).fill("_"));
const wrongLetters = ref([]);


function browseChar(letter){

    let acierto = false;

    chars.value.forEach((char, index)=>{
        if(char === letter){
            display.value[index] = letter;
            acierto = true;
        }
    });

    if(!acierto && !wrongLetters.value.includes(letter)){
        wrongLetters.value.push(letter);
    }
}

browseChar("b")

console.log(chars.value, display.value)

</script>

<template>
    <div class="hangman-main">
        <div class="hangman-content">
            <div class="hangman-game">
                <h1 v-for="(char, index) in display" :key="index">{{ char }}</h1>
            </div>
        </div>
    </div>
</template>

<style scoped>

    .hangman-main{
        display: flex;
        width: 100vw;
        height: 100vh;
    }

    .hangman-content{
        height: 90vh;
        width: 70vw;
        background-color: #101820;
        border-radius: 15px;
        box-shadow: 0 0 5px 5px white;
        margin: auto;
    }

    .hangman-game{
        display: flex;
    }

    .hangman-game h1{
        margin: 0 5px;

    }
</style>
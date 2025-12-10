<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const word = ref("");

const letters = [
  "a","b","c","d","e","f","g","h","i","j","k","l","m",
  "n","ñ","o","p","q","r","s","t","u","v","w","x","y","z"
];

const route = useRoute();

const {category, level} = route.params

console.log(category, level)

fetch('https://7mcmw0x3-3005.use.devtunnels.ms/api/product/generate',{
    method: "POST",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify({
        category: category,
        difficulty: level        
    })
})
    .then(res => res.json())
    .then(data => {
        console.log("respuesta:", data.word)
        updateWord(data.word.res)
    })
    .catch(err => console.error("Error:", err))

function updateWord(response){    
    const res = response.split("|n");
    console.log(res[0].trim())
    word.value = res[0].trim()
    definirPalabra()
}

const chars = ref(), displayChars = ref(), display = ref();
const wrongLetters = ref([]);

function definirPalabra(){
    const cleanWord = quitarTildes(word.value);
    console.log(cleanWord);
    chars.value = [...cleanWord.toLowerCase()];
    displayChars.value = [...word.value];
    display.value = Array(displayChars.value.length).fill("_");
}

function quitarTildes(texto) {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
}

function browseChar(letter){

    let acierto = false;

    chars.value.forEach((char, index)=>{
        console.log(char);
        console.log(chars.value[index]);
        console.log(displayChars.value[index]);
        if(char === letter){

            display.value[index] = displayChars.value[index];
            acierto = true;
        }
    });

    if(!acierto && !wrongLetters.value.includes(letter)){
        wrongLetters.value.push(letter);
    }
}

console.log(chars.value, display.value)
console.log(wrongLetters.value);

</script>

<template>
    <div class="hangman-main">
        
        <div class="hangman-content">
            <img class="hangman-image" :src="'./hangman'+wrongLetters.length+'.png'" alt="">
            <div class="hangman-game">
                <h1 v-for="(char, index) in display" :key="index">{{ char }}</h1>
            </div>
            <div class="hangman-keyboard">
                <button v-for="(letter, i) in letters" :key="i" @click="browseChar(letter)">{{ letter }}</button>
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
        display: flex;
        flex-direction: column;
        gap: 30px;
    }

    .hangman-image{
        width: 300px;
        margin: auto auto 0 auto;
    }

    .hangman-game{
        display: flex;
        margin: 0 auto;
        height: fit-content;    
        width: fit-content;
    }

    .hangman-game h1{
        margin: 0 10px;
    }

    .hangman-keyboard{
        margin: auto;
        margin-top: 0;
        width: 60%;
        justify-content: center;
        text-align: center;
    }

    .hangman-keyboard button{
        padding: 10px;
        font-size: 18px;
        position: relative;
        border-radius: 10px;
        background-color: gray;
        margin: 5px;
        border: none;
        width: 40px;
        cursor: pointer;
        z-index: 1;
        overflow: hidden;
    }

    .hangman-keyboard button::before{
        content: "";
        position: absolute;
        background-color: rgb(32, 32, 32);
        inset: 0;
        opacity: 0;
        transition: opacity 0.2s ease;
        z-index: -1;
    }

    .hangman-keyboard button:hover::before{
        opacity: 0.3;
    }
</style>
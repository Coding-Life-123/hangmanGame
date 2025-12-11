<script setup>
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Loading from '../components/Loading.vue';

const word = ref("");

const letters = [
  "a","b","c","d","e","f","g","h","i","j","k","l","m",
  "n","ñ","o","p","q","r","s","t","u","v","w","x","y","z","-"
];

const route = useRoute();
const router = useRouter();

const {category, level} = route.params

const avance = ref(0);
const wrong = ref(0);

switch(true){
    case level === "facil":
        wrong.value = 0;
        avance.value = 1;
        break;

    case level === "medio":
        wrong.value = 2;
        avance.value = 1;
        break;
        
    case level === "dificil":
        wrong.value = 3;
        avance.value = 1;
        break;

    case level === "hardcore":
        wrong.value = 0;
        avance.value = 4;
        break;
}

function startGame(){        
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
}


startGame()

function updateWord(response){    
    const res = response.split("|n");
    console.log(res[0].trim())
    word.value = res[0].trim()
    definirPalabra()
}

const chars = ref(), displayChars = ref(), display = ref();
const wrongLetters = ref([]), pressedLetters = ref([]);
const gameStatus = ref("loading");


watch(gameStatus, (nuevo)=>{
    if (nuevo === "won" || nuevo === "lost") {
        setTimeout(() => {
            router.push("/levels");
        }, 10000);
    }
})
//updateWord("putos |n hola")

function definirPalabra(){
    const cleanWord = quitarTildes(word.value);
    chars.value = [...cleanWord.toLowerCase()];
    displayChars.value = [...word.value];
    display.value = Array(displayChars.value.length).fill("_");
    gameStatus.value = 'playing';
}

function quitarTildes(texto) {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
}

function browseChar(letter){

    if (pressedLetters.value.includes(letter)) return;

    let acierto = false;

    chars.value.forEach((char, index)=>{
        if(char === letter){
            display.value[index] = displayChars.value[index];
            acierto = true;
        }
    });

    if(!acierto && !wrongLetters.value.includes(letter)){
        wrongLetters.value.push(letter);
        wrong.value = wrong.value + avance.value;
        console.log(wrong.value);
    }

    pressedLetters.value.push(letter);

    if (!display.value.includes("_")) {
        gameStatus.value = "won";
        return;
    }

    if (wrong.value >= 8) {
        gameStatus.value = "lost";
        return;
    }
    
}

console.log(chars.value, display.value)
console.log(wrongLetters.value);

</script>

<template>
    <div class="hangman-main">        
        <Loading v-show="gameStatus==='loading'"/>
        <div v-show="gameStatus === 'playing'" class="hangman-content">
            <img class="hangman-image" :src="'./hangman'+wrong+'.png'" alt="">
            <div class="hangman-game">
                <h1 v-for="(char, index) in display" :key="index">{{ char }}</h1>
            </div>
            <div class="hangman-keyboard">
                <button 
                    v-for="(letter, i) in letters" 
                    :key="i" 
                    @click="browseChar(letter)" 
                    :disabled="pressedLetters.includes(letter) || gameStatus !== 'playing'" 
                    :class="{pressed: pressedLetters.includes(letter) || gameStatus !== 'playing'}"
                >
                    {{ letter }}
                </button>
            </div>
        </div>
        <div v-show="gameStatus === 'won'" class="result-container">
            <h1 class="win-text">¡GANASTE!</h1>
            <button class="return-btn" @click="$router.push('/levels')">
                Volver a elegir nivel
            </button>
        </div>

        <!-- PERDISTE -->
        <div v-show="gameStatus === 'lost'" class="result-container">
            <img src="/hangman8.png" class="lost-img" alt="Ahorcado completo">
            <h1 class="lose-text">PERDISTE</h1>
            <button class="return-btn" @click="$router.push('/levels')">
                Volver a elegir nivel
            </button>
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

    .hangman-keyboard button.pressed{
        background-color: #4b4b4b; /* más oscuro */
        color: #cfcfcf;
        cursor: not-allowed;
        transform: scale(0.98);
        box-shadow: none;
    }

    .hangman-keyboard button:disabled{
        opacity: 0.8;
        pointer-events: none;
    }

    .result-container {
        width: 100vw;
        height: 100vh;
        color: white;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .win-text {
        font-size: 60px;
        font-weight: bold;
        color: #7CFC00; /* verde brillante */
    }

    .lose-text {
        font-size: 60px;
        font-weight: bold;
        color: #ff4c4c; /* rojo */
    }

    .lost-img {
        width: 350px;
        margin-bottom: 20px;
    }

    .return-btn {
        margin-top: 20px;
        padding: 12px 25px;
        font-size: 20px;
        border-radius: 10px;
        background-color: #444;
        color: white;
        border: none;
        cursor: pointer;
    }
    .return-btn:hover {
        background-color: #666;
    }
</style>
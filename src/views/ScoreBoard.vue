<script setup>
import { ref, onMounted } from "vue";

const SERVER = 'https://7mcmw0x3-3005.use.devtunnels.ms';

const scores = ref([]);
const loading = ref(false);
const error = ref("");

// --- FETCHERS ---

const fetchAllScores = async () => {
    loading.value = true;
    error.value = "";
    try {
        const res = await fetch(`${SERVER}/api/scores`);
        const data = await res.json();
        scores.value = data;
    } catch (err) {
        error.value = "Error al cargar puntajes";
    } finally {
        loading.value = false;
    }
};

const fetchScoresByDifficulty = async (level) => {
    loading.value = true;
    error.value = "";
    try {
        const res = await fetch(`${SERVER}/api/scores/difficulty/${level}`);
        const data = await res.json();
        scores.value = data;
    } catch (err) {
        error.value = "Error al cargar puntajes";
    } finally {
        loading.value = false;
    }
};

// --- INIT ---
onMounted(() => {
    fetchAllScores();
});
</script>

<template>
    <div class="scoreboard-container">
        <div class="scoreboard-box">

            <h1 class="title">🏆 Puntajes</h1>

            <!-- BOTONES -->
            <div class="filters">
                <button class="btn" @click="fetchAllScores">Generales</button>
                <button class="btn" @click="fetchScoresByDifficulty('facil')">Fácil</button>
                <button class="btn" @click="fetchScoresByDifficulty('medio')">Medio</button>
                <button class="btn" @click="fetchScoresByDifficulty('dificil')">Difícil</button>
                <button class="btn" @click="fetchScoresByDifficulty('hardcore')">Hardcore</button>
            </div>

            <!-- ESTADOS -->
            <p v-if="loading" class="info">Cargando...</p>
            <p v-if="error" class="error">{{ error }}</p>
            <p v-if="!loading && scores.length === 0" class="info">
                No hay puntajes registrados
            </p>

            <!-- TABLA -->
            <table v-if="scores.length > 0 && !loading">
                <thead>
                    <tr>
                        <th>Usuario</th>
                        <th>Puntaje</th>
                        <th>Dificultad</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="score in scores" :key="score.id">
                        <td>{{ score.username }}</td>
                        <td>{{ score.score }}</td>
                        <td>{{ score.difficulty }}</td>
                        <td>{{ new Date(score.created_at).toLocaleDateString() }}</td>
                    </tr>
                </tbody>
            </table>

        </div>
    </div>
</template>

<style scoped>
.scoreboard-container {
    width: 100vw;
    height: 100vh;
    background-color: #101820;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
}

.scoreboard-box {
    width: 80%;
    max-width: 900px;
    background: #1c1f26;
    padding: 25px;
    border-radius: 15px;
    text-align: center;
}

.title {
    margin-bottom: 20px;
}

.filters {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 20px;
    flex-wrap: wrap;
}

.btn {
    padding: 10px 15px;
    background: #7c1ee3;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    color: white;
    font-size: 15px;
}

.btn:hover {
    opacity: 0.9;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 15px;
}

th, td {
    padding: 10px;
    border-bottom: 1px solid #333;
}

th {
    background: #2a2e36;
}

.info {
    margin-top: 15px;
    color: #cfcfcf;
}

.error {
    margin-top: 15px;
    color: #ff6b6b;
}
</style>

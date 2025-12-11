<script setup>
</script>

<template>
    <div class="home-container">

        <div class="account-btn-wrapper">
            <router-link to="/account" class="account-btn">
                Cuenta
            </router-link>
        </div>

        <div class="center-content">

            <router-link to="/levels" class="main-btn play-btn">
                Jugar
            </router-link>

            <router-link to="/scores" class="main-btn score-btn">
                Puntajes
            </router-link>

        </div>

    </div>
</template>

<style scoped>
.home-container {
    width: 60vw;
    height: 70vh;
    background-color: #101820;
    color: white;
    display: flex;
    flex-direction: column;
    position: relative;
    margin: auto;
    border-radius: 20px;
    box-shadow: 0 0 20px 10px white;
}

.account-btn-wrapper {
    width: 94%;
    display: flex;
    justify-content: flex-end;
    padding: 20px;
}

.account-btn {
    background-color: #4b4b4b;
    padding: 10px 18px;
    font-size: 18px;
    border-radius: 10px;
    text-decoration: none;
    color: white;
    transition: 0.2s;
}
.account-btn:hover {
    background-color: #666;
}

.center-content {
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 25px;
}

.main-btn {
    text-decoration: none;
    background-color: #6a0dad; 
    padding: 18px 45px;
    font-size: 28px;
    border-radius: 15px;
    color: white;
    font-weight: bold;
    transition: 0.25s ease;
    box-shadow: 0 0 10px #6a0dad;
}
.main-btn:hover {
    background-color: #7c1ee3;
    transform: scale(1.05);
    box-shadow: 0 0 18px #7c1ee3;
}

.play-btn {
    background-color: #8224e3;
}
.play-btn:hover {
    background-color: #9d4cff;
}

.score-btn {
    background-color: #444;
    box-shadow: 0 0 10px #444;
}
.score-btn:hover {
    background-color: #666;
    box-shadow: 0 0 18px #666;
}
</style>

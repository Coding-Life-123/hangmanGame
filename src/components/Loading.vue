<script setup>

</script>

<template>
    <div class="loading-background">
        <div class="loading-container">
            <div class="spinner"></div>
            <p>Cargando...</p>
        </div>
    </div>
</template>

<style>

    .loading-background{
        background-color: #101820;
        width: 400px;
        height: 400px;
        margin: auto;
        border-radius: 20px;
    }

    .loading-container {
        display: flex;
        position: absolute;
        top: 0;
        left: 0;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100vw;
        height: 100vh;
        color: white;
        font-size: 24px;
    }

    .spinner {
        border: 6px  #fff;
        border-bottom: 6px  violet;
        border-radius: 50% 50%;
        width: 70px;
        height: 70px;
        margin-bottom: 20px;
    }

    @keyframes spin {
        to { transform: rotate(360deg); }
    }

</style>

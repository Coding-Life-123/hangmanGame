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
        border: 6px solid #white;
        border-top: 6px solid rgb(247, 36, 247);
        border-radius: 50% 50%;
        width: 70px;
        height: 70px;
        margin-bottom: 20px;
        animation: spin 0.8s linear infinite;
    }

    p{
        color: rgb(247, 36, 247);
        text-shadow: white 0px 0px 20px;
    }

    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }

</style>

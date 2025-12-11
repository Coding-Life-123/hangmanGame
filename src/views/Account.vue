<script setup>
import { ref, onMounted } from 'vue';

const username = ref("");
const password = ref("");

const cuenta = ref("none");     
const cuentaId = ref(null);     
const loginError = ref("");
const registerError = ref("");
const successMessage = ref("");

const showRegister = ref(false);  // alternar login/registro

onMounted(() => {
    const savedUser = localStorage.getItem("username");
    const savedId = localStorage.getItem("userId");
    
    if (savedUser && savedId) {
        cuenta.value = savedUser;
        cuentaId.value = savedId;
    }
});

// REGISTRO
async function register() {
    registerError.value = "";
    successMessage.value = "";

    if (!username.value || !password.value) {
        registerError.value = "Debes ingresar un usuario y una contraseña.";
        return;
    }

    try {
        const res = await fetch("https://7mcmw0x3-3005.use.devtunnels.ms/api/users/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: username.value,
                password: password.value
            })
        });

        const data = await res.json();

        if (!res.ok) {
            registerError.value = data.message || "Error en el registro.";
            return;
        }

        successMessage.value = "Registrado correctamente. Ahora puedes iniciar sesión.";
        showRegister.value = false;

    } catch {
        registerError.value = "Error de conexión con el servidor.";
    }
}

// LOGIN
async function login() {
    loginError.value = "";
    successMessage.value = "";

    if (!username.value || !password.value) {
        loginError.value = "Ingresa tu usuario y contraseña.";
        return;
    }

    try {
        const res = await fetch("https://7mcmw0x3-3005.use.devtunnels.ms/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: username.value,
                password: password.value
            })
        });

        const data = await res.json();
        console.log(data)
        if (!res.ok) {
            loginError.value = data.message || "Credenciales incorrectas.";
            return;
        }

        cuenta.value = data.username;
        cuentaId.value = data.id;

        localStorage.setItem("username", data.username);
        localStorage.setItem("userId", data.id);

        successMessage.value = "Has iniciado sesión.";

    } catch {
        loginError.value = "Error de conexión con el servidor.";
    }
}

// LOGOUT
function logout() {
    cuenta.value = "none";
    cuentaId.value = null;

    localStorage.removeItem("username");
    localStorage.removeItem("userId");
}
</script>

<template>
    <div class="account-container">

        <!-- VISTA CUANDO ESTÁ LOGUEADO -->
        <div v-if="cuenta !== 'none'" class="form-box">
            <h2>Bienvenido</h2>
            <h1>{{ cuenta }}</h1>

            <p>ID de usuario: {{ cuentaId }}</p>

            <button class="btn logout" @click="logout">Cerrar sesión</button>

            <h3 style="margin-top: 20px;">Tus puntajes</h3>
            <ul>
                <li>No implementado aún</li>
            </ul>
        </div>

        <!-- VISTA LOGIN / REGISTRO -->
        <div v-else class="form-box">
            <h2>{{ showRegister ? "Registro" : "Iniciar Sesión" }}</h2>

            <input 
                type="text" 
                placeholder="Usuario"
                v-model="username" 
            />

            <input 
                type="password" 
                placeholder="Contraseña"
                v-model="password" 
            />

            <button v-if="!showRegister" class="btn" @click="login">Iniciar Sesión</button>
            <button v-if="showRegister" class="btn" @click="register">Registrarse</button>

            <!-- Mensajes -->
            <p v-if="loginError" class="error">{{ loginError }}</p>
            <p v-if="registerError" class="error">{{ registerError }}</p>
            <p v-if="successMessage" class="success">{{ successMessage }}</p>

            <!-- Cambiar entre login y register -->
            <p class="toggle" @click="showRegister = !showRegister">
                {{ showRegister ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes cuenta? Regístrate" }}
            </p>
        </div>
    </div>
</template>

<style scoped>
.account-container {
    width: 100vw;
    height: 100vh;
    background-color: #101820;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
}

.form-box {
    width: 320px;
    padding: 25px;
    background: #1c1f26;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    text-align: center;
}

input {
    margin-bottom: 15px;
    padding: 12px;
    border-radius: 8px;
    border: none;
    background: #2a2e36;
    color: white;
    font-size: 16px;
}

.btn {
    padding: 12px;
    background: #7c1ee3;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    margin-top: 10px;
    color: white;
    font-size: 17px;
}

.logout {
    background: #e64545;
}

.error {
    color: #ff6b6b;
    font-size: 14px;
}

.success {
    color: lightgreen;
    font-size: 14px;
}

.toggle {
    margin-top: 12px;
    cursor: pointer;
    text-decoration: underline;
    font-size: 14px;
}
</style>

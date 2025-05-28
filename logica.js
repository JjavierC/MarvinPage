import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider
} from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCns8e09byvN6hi6GHOzfuOePqc9gKk54k",
  authDomain: "marvincurseregistrousuariosweb.firebaseapp.com",
  projectId: "marvincurseregistrousuariosweb",
  storageBucket: "marvincurseregistrousuariosweb.firebasestorage.app",
  messagingSenderId: "919067442146",
  appId: "1:919067442146:web:8b8598c4598d29080217bb",
  measurementId: "G-S24KJJJC03"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Elementos
const contenedor = document.getElementById("contenedor");
const formRegistro = document.getElementById("form-registro");
const formLogin = document.getElementById("form-login");
const mensaje = document.getElementById("mensaje");

// Mostrar formularios y cambiar fondo

document.getElementById("btn-registrarse").addEventListener("click", () => {
  formRegistro.classList.remove("hidden");
  formLogin.classList.add("hidden");

  contenedor.classList.remove("bg-[#1e293b]", "bg-gradient-to-br", "from-purple-800", "to-black");
  contenedor.classList.add("bg-gradient-to-br", "from-black", "to-purple-800");
});

document.getElementById("btn-login").addEventListener("click", () => {
  formLogin.classList.remove("hidden");
  formRegistro.classList.add("hidden");

  contenedor.classList.remove("bg-[#1e293b]", "bg-gradient-to-br", "from-black", "to-purple-800");
  contenedor.classList.add("bg-gradient-to-br", "from-purple-800", "to-black");
});

// Registro con correo
formRegistro.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("registro-email").value;
  const password = document.getElementById("registro-password").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => mensaje.textContent = "✅ Registro exitoso")
    .catch(error => mensaje.textContent = "❌ " + error.message);
});

// Inicio de sesión con correo
formLogin.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => mensaje.textContent = "✅ Inicio de sesión exitoso")
    .catch(error => mensaje.textContent = "❌ " + error.message);
});

// Inicio con Google
document.getElementById("google-login").addEventListener("click", () => {
  signInWithPopup(auth, provider)
    .then(result => {
      const user = result.user;
      mensaje.textContent = "✅ Bienvenido " + user.displayName;
    })
    .catch(error => mensaje.textContent = "❌ " + error.message);
});

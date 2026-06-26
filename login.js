import { auth } from "./firebase-config.js"; // শেয়ার্ড কনফিগ ইমপোর্ট করা হলো
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

document.getElementById('btnLogin').addEventListener('click', () => {
    const email = emailInput.value;
    const password = passwordInput.value;
    
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("লগইন সফল হয়েছে!");
            window.location.href = "dashboard.html";
        })
        .catch((error) => {
            alert("ভুল ইমেইল বা পাসওয়ার্ড! " + error.message);
        });
});

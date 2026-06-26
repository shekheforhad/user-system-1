import { auth } from "./firebase-config.js"; // শেয়ার্ড কনফিগ ইমপোর্ট করা হলো
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

document.getElementById('btnSignup').addEventListener('click', () => {
    const email = emailInput.value;
    const password = passwordInput.value;
    
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("রেজিস্ট্রেশন সফল হয়েছে! এবার লগইন করুন।");
            window.location.href = "index.html"; // সফল রেজিস্ট্রেশনের পর লগইন পেজে (index.html) নিয়ে যাবে
        })
        .catch((error) => {
            alert("রেজিস্ট্রেশন ব্যর্থ হয়েছে: " + error.message);
        });
});

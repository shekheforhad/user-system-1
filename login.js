import { auth } from "./firebase-config.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const btnLogin = document.getElementById('btnLogin');
const togglePassword = document.getElementById('togglePassword'); // চোখ সিলেক্ট করা হলো

// লগইন লজিক
btnLogin.addEventListener('click', () => {
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!email || !password) {
        alert("অনুগ্রহ করে ইমেইল ও পাসওয়ার্ড লিখুন!");
        return;
    }

    btnLogin.innerText = "লগইন হচ্ছে...";
    btnLogin.disabled = true;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            window.location.href = "dashboard.html";
        })
        .catch((error) => {
            btnLogin.innerText = "Log In";
            btnLogin.disabled = false;
            alert("ভুল ইমেইল বা পাসওয়ার্ড! অনুগ্রহ করে আবার চেষ্টা করুন।");
        });
});

// চোখের আইকনের লজিক (পুনরায় const ঘোষণা ছাড়া)
togglePassword.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    togglePassword.innerText = type === 'password' ? '👁️' : '🙈';
});

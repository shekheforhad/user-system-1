import { auth } from "./firebase-config.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const btnLogin = document.getElementById('btnLogin');

btnLogin.addEventListener('click', () => {
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!email || !password) {
        alert("অনুগ্রহ করে ইমেইল ও পাসওয়ার্ড লিখুন!");
        return;
    }

    // ১. বোতামটি ডিজেবল করা এবং টেক্সট পরিবর্তন করা (যাতে বারবার ক্লিক না করা যায়)
    btnLogin.innerText = "লগইন হচ্ছে...";
    btnLogin.disabled = true;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // ২. কোনো বিরক্তিকর অ্যালার্ট ছাড়াই সরাসরি ড্যাশবোর্ডে নিয়ে যাওয়া
            window.location.href = "dashboard.html";
        })
        .catch((error) => {
            // ভুল হলে বোতাম আবার স্বাভাবিক করা
            btnLogin.innerText = "Log In";
            btnLogin.disabled = false;
            alert("ভুল ইমেইল বা পাসওয়ার্ড! অনুগ্রহ করে আবার চেষ্টা করুন।");
        });
});

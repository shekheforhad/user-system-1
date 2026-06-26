import { auth } from "./firebase-config.js"; // সেই আগের শেয়ার্ড কনফিগ ফাইলটি এখানেও ব্যবহার করছি
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// ইউজার আসলেই লগইন অবস্থায় আছে কিনা তা চেক করা
onAuthStateChanged(auth, (user) => {
    if (!user) {
        // লগইন না থাকলে আবার লগইন পেজে (index.html) পাঠিয়ে দেবে
        window.location.href = "index.html";
    }
});

// লগআউট ফাংশন
document.getElementById('btnLogout').addEventListener('click', () => {
    signOut(auth)
        .then(() => {
            alert("লগআউট সফল হয়েছে!");
            window.location.href = "index.html";
        })
        .catch((error) => {
            alert("লগআউট ব্যর্থ হয়েছে: " + error.message);
        });
});

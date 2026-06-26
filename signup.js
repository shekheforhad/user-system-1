import { auth, db } from "./firebase-config.js";
import { createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const fullNameInput = document.getElementById('fullName');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const genderInput = document.getElementById('gender');
const dobInput = document.getElementById('dob');
const profilePicInput = document.getElementById('profilePic');

const togglePassword = document.getElementById('togglePassword');
const toggleConfirmPassword = document.getElementById('toggleConfirmPassword'); // ২য় চোখের বাটন

document.getElementById('btnSignup').addEventListener('click', () => {
    const fullName = fullNameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    const gender = genderInput.value;
    const dob = dobInput.value;
    const profilePicUrl = profilePicInput.value.trim() || "https://picsum.photos/150";

    if (!fullName || !email || !password || !confirmPassword || !gender || !dob) {
        alert("অনুগ্রহ করে সব তথ্য সঠিকভাবে পূরণ করুন!");
        return;
    }

    // পাসওয়ার্ড দুটি মিলেছে কিনা তা পরীক্ষা করা
    if (password !== confirmPassword) {
        alert("পাসওয়ার্ড দুটি মেলেনি! অনুগ্রহ করে আবার চেক করুন।");
        return;
    }

    createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            const user = userCredential.user;
            try {
                await updateProfile(user, {
                    displayName: fullName,
                    photoURL: profilePicUrl
                });
                await setDoc(doc(db, "users", user.uid), {
                    uid: user.uid,
                    fullName: fullName,
                    email: email,
                    gender: gender,
                    dob: dob,
                    profilePicUrl: profilePicUrl,
                    createdAt: new Date().toISOString()
                });
                alert("রেজিস্ট্রেশন সফল হয়েছে!");
                window.location.href = "index.html";
            } catch (dbError) {
                alert("ডাটাবেজে সমস্যা: " + dbError.message);
            }
        })
        .catch((error) => {
            alert("রেজিস্ট্রেশন ব্যর্থ হয়েছে: " + error.message);
        });
});

// ১ম পাসওয়ার্ড ফিল্ডের চোখ টগল
togglePassword.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    togglePassword.innerText = type === 'password' ? '👁️' : '🙈';
});

// ২য় পাসওয়ার্ড ফিল্ডের চোখ টগল
toggleConfirmPassword.addEventListener('click', () => {
    const type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    confirmPasswordInput.setAttribute('type', type);
    toggleConfirmPassword.innerText = type === 'password' ? '👁️' : '🙈';
});

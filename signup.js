import { auth, db } from "./firebase-config.js";
import { createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// ইনপুট এলিমেন্টগুলো সিলেক্ট করা
const fullNameInput = document.getElementById('fullName');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const genderInput = document.getElementById('gender');
const dobInput = document.getElementById('dob');
const profilePicInput = document.getElementById('profilePic');

document.getElementById('btnSignup').addEventListener('click', () => {
    const fullName = fullNameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const gender = genderInput.value;
    const dob = dobInput.value;
    const profilePicUrl = profilePicInput.value.trim() || "https://picsum.photos/150"; // ছবি না দিলে একটি ডেমো ছবি সেট হবে

    // ফর্ম ভ্যালিডেশন (কোনো ইনপুট খালি আছে কিনা চেক করা)
    if (!fullName || !email || !password || !gender || !dob) {
        alert("অনুগ্রহ করে সব তথ্য সঠিকভাবে পূরণ করুন!");
        return;
    }

    // ফায়ারবেস অথেনটিকেশনে ইউজার তৈরি করা
    createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            const user = userCredential.user;

            try {
                // ১. ফায়ারবেস প্রোফাইলে নাম ও ছবি আপডেট করা
                await updateProfile(user, {
                    displayName: fullName,
                    photoURL: profilePicUrl
                });

                // ২. ক্লাউড ফায়ারস্টোরে জেন্ডার ও জন্মতারিখসহ অতিরিক্ত ডাটা সেভ করা
                await setDoc(doc(db, "users", user.uid), {
                    uid: user.uid,
                    fullName: fullName,
                    email: email,
                    gender: gender,
                    dob: dob,
                    profilePicUrl: profilePicUrl,
                    createdAt: new Date().toISOString()
                });

                alert("রেজিস্ট্রেশন এবং ডাটাবেজে প্রোফাইল সংরক্ষণ সফল হয়েছে!");
                window.location.href = "index.html"; // সফল হলে লগইন পেজে নিয়ে যাবে
            } catch (dbError) {
                alert("ডাটাবেজে তথ্য সংরক্ষণ করতে সমস্যা হয়েছে: " + dbError.message);
            }
        })
        .catch((error) => {
            alert("রেজিস্ট্রেশন ব্যর্থ হয়েছে: " + error.message);
        });
});

import { auth, db } from "./firebase-config.js";
import { onAuthStateChanged, signOut, updateProfile } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const spinner = document.getElementById('loadingSpinner');
const content = document.getElementById('dashboardContent');
const userPicImg = document.getElementById('userPic');

const logoutModal = document.getElementById('logoutModal');
const btnLogout = document.getElementById('btnLogout');
const btnConfirmLogout = document.getElementById('btnConfirmLogout');
const btnCancelLogout = document.getElementById('btnCancelLogout');

let currentUser = null;

onAuthStateChanged(auth, async (user) => {
    if (user) {
        currentUser = user;
        try {
            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (userDoc.exists()) {
                const userData = userDoc.data();
                document.getElementById('userGreeting').innerText = `স্বাগতম, ${userData.fullName}!`;
                document.getElementById('userDob').innerText = `জন্মতারিখ: ${userData.dob}`;
                document.getElementById('userGender').innerText = `জেন্ডার: ${userData.gender}`;
                userPicImg.src = userData.profilePicUrl || "https://picsum.photos/150";

                spinner.style.display = 'none';
                content.classList.remove('hidden');
            } else {
                alert("ইউজার তথ্য পাওয়া যায়নি!");
                spinner.style.display = 'none';
            }
        } catch (error) {
            console.error(error);
            spinner.style.display = 'none';
        }
    } else {
        window.location.href = "index.html";
    }
});

userPicImg.addEventListener('click', async () => {
    if (!currentUser) return;
    const newPicUrl = prompt("নতুন প্রোফাইল ছবির লিংক (URL) পেস্ট করুন:");
    if (newPicUrl && newPicUrl.trim() !== "") {
        try {
            spinner.style.display = 'block';
            content.classList.add('hidden');

            await updateDoc(doc(db, "users", currentUser.uid), {
                profilePicUrl: newPicUrl.trim()
            });
            await updateProfile(currentUser, {
                photoURL: newPicUrl.trim()
            });

            userPicImg.src = newPicUrl.trim();
            alert("ছবি সফলভাবে পরিবর্তন হয়েছে!");
        } catch (error) {
            alert("ব্যর্থ: " + error.message);
        } finally {
            spinner.style.display = 'none';
            content.classList.remove('hidden');
        }
    }
});

btnLogout.addEventListener('click', () => {
    logoutModal.style.display = 'flex';
});

btnCancelLogout.addEventListener('click', () => {
    logoutModal.style.display = 'none';
});

// লগআউট কনফার্ম করার লজিক (অ্যালার্ট ছাড়া)
btnConfirmLogout.addEventListener('click', () => {
    // বোতামের লেখা পরিবর্তন ও ডিজেবল করা
    btnConfirmLogout.innerText = "লগআউট হচ্ছে...";
    btnConfirmLogout.disabled = true;

    signOut(auth)
        .then(() => {
            logoutModal.style.display = 'none';
            window.location.href = "index.html"; // কোনো বিরক্তিকর অ্যালার্ট ছাড়া সরাসরি চলে যাবে
        })
        .catch((error) => {
            btnConfirmLogout.innerText = "হ্যাঁ, লগআউট করুন";
            btnConfirmLogout.disabled = false;
            alert("লগআউট ব্যর্থ হয়েছে: " + error.message);
        });
});

window.addEventListener('click', (e) => {
    if (e.target === logoutModal) {
        logoutModal.style.display = 'none';
    }
});

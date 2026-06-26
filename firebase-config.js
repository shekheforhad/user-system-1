import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDl82HFBHboD6dxY1z2ezGnaCk9E42vDTU",
    authDomain: "user-system-1.firebaseapp.com",
    projectId: "user-system-1",
    storageBucket: "user-system-1.firebasestorage.app",
    messagingSenderId: "549621842960",
    appId: "1:549621842960:web:f8a5367172715411af7695"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // auth এক্সপোর্ট করা হলো

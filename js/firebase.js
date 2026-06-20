import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import { getFirestore }
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBnzm4u-CFYCXRygYvXe01U9VmgnqovW_Y",
    authDomain: "pendaftaran-qurban-eeb04.firebaseapp.com",
    projectId: "pendaftaran-qurban-eeb04",
    storageBucket: "pendaftaran-qurban-eeb04.firebasestorage.app",
    messagingSenderId: "1051194139758",
    appId: "1:1051194139758:web:9e35697393bb5da6df727f"
  };

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
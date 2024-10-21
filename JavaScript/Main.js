// Firebase

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBJft09DwFK1UPkqAW_S9k-TXTb0PnrzRE",
    authDomain: "aleka-be469.firebaseapp.com",
    projectId: "aleka-be469",
    storageBucket: "aleka-be469.appspot.com",
    messagingSenderId: "404498275934",
    appId: "1:404498275934:web:e065a5169a4cabee551ecf",
    measurementId: "G-2LB8TTXY9S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

onAuthStateChanged(auth, (user) => {
    const loggedInUserId = localStorage.getItem('loggedInUserId');
    if (loggedInUserId) {
        console.log(user);
        const docRef = doc(db, "users", loggedInUserId);
        getDoc(docRef)
            .then((docSnap) => {
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    // Set the last name to signUpName
                    document.getElementById('signUpName').innerText = userData.lastName;
                    // Make the signUpText visible
                    document.getElementById('signUpText').style.display = 'block';
                } else {
                    console.log("No document found matching id");
                }
            })
            .catch((error) => {
                console.log("Error getting document", error);
            });
    } else {
        console.log("User Id not Found in Local storage");
    }
});

// Logout functionality
const logoutButton = document.getElementById('logout');
logoutButton.addEventListener('click', () => {
    localStorage.removeItem('loggedInUserId');
    signOut(auth)
        .then(() => {
            window.location.href = 'index.html';
        })
        .catch((error) => {
            console.error('Error Signing out:', error);
        });
});

  // Main

function YouTube() {
    window.open("")
}

function Discord() {
    window.open("https://discord.gg/F6Qh7wmjNk")
}

function TikTok() {
    window.open("")
}

function Twitter() {
    window.open("https://x.com/Aleka_2024")
}


function Join() {
    window.open("https://www.roblox.com/groups/3812713/Aleka#!/about")
}

document.addEventListener("DOMContentLoaded", function() {
    // Array med bakgrunnsbilder
    const backgrounds = [
        '/Main/Images/Background1.png',
        '/Main/Images/Background2.png',
        '/Main/Images/Background3.png'
    ];

    // Forhåndslaste alle bakgrunnsbilder
    backgrounds.forEach(function(image) {
        const img = new Image();
        img.src = image;
    });

    // Velg et tilfeldig bilde fra arrayen
    const randomIndex = Math.floor(Math.random() * backgrounds.length);

    // Sett bakgrunnsbildet på body-elementet
    document.body.style.backgroundImage = `url(${backgrounds[randomIndex]})`;
});
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
                    document.getElementById('signUpName').innerText = userData.firstName;

                    document.getElementById('signUpName').style.display = 'block';
                    document.getElementById('logout').style.display = 'block';
                    document.getElementById('navBarSignIn').style.display = 'none';
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
            window.location.href = 'Signin.html';
            document.getElementById('signUpName').style.display = 'none';
            document.getElementById('logout').style.display = 'none';
            document.getElementById('navBarSignIn').style.display = 'block';
        })
        .catch((error) => {
            console.error('Error Signing out:', error);
        });
});
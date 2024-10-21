// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBJft09DwFK1UPkqAW_S9k-TXTb0PnrzRE",
    authDomain: "aleka-be469.firebaseapp.com",
    projectId: "aleka-be469",
    storageBucket: "aleka-be469.appspot.com",
    messagingSenderId: "404498275934",
    appId: "1:404498275934:web:e065a5169a4cabee551ecf",
    measurementId: "G-2LB8TTXY9S"
};

const app = initializeApp(firebaseConfig);

const forgotPassword = document.getElementById("forgotPassword");
const forgotEmail = document.getElementById("resetEmail");

// Email validation function
function isValidEmail(email) {
    // Regular expression for validating an Email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

forgotPassword.addEventListener("click", () => {
    const auth = getAuth(app);
    const email = forgotEmail.value;

    // Check if the email is valid
    if (!isValidEmail(email)) {
        return; // Exit the function if the email is invalid
    }

    sendPasswordResetEmail(auth, email)
        .then(() => {
            forgotEmail.value = ""; // Clear the email input
            window.location.href = "Signin.html";
            alert("A password reset link has been sent to the email.");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            alert("Error: " + errorMessage); // Display the error message
        });
});

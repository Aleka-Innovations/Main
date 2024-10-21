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

    // Clear any previous messages or states
    forgotPassword.textContent = "Sending..."; // Show sending state
    forgotPassword.disabled = true;  // Disable button to prevent multiple clicks

    // Check if the email is valid
    if (!isValidEmail(email)) {
        alert("Please enter a valid email address.");
        forgotPassword.textContent = "Reset"; // Reset button text
        forgotPassword.disabled = false;  // Enable button again
        return;
    }

    // Send the password reset email
    sendPasswordResetEmail(auth, email)
        .then(() => {
            // Success: Email has been sent
            forgotEmail.value = ""; // Clear the email input field
            forgotPassword.textContent = "Sent"; // Change the button text to "Sent"

            alert("A password reset link has been sent to the provided email address.");

            // Redirect after a short delay to give the user feedback
            setTimeout(() => {
                window.location.href = "Signin.html";
            }, 1000);
        })
        .catch((error) => {
            // Handle errors here
            const errorCode = error.code;
            const errorMessage = error.message;

            // Check if the error is related to a network failure
            if (errorCode === 'auth/network-request-failed') {
                alert("Network error. Please check your connection and try again.");
            } else if (errorCode === 'auth/user-not-found') {
                alert("There is no user with that email address.");
            } else {
                alert("Error: " + errorMessage);
            }

            // Revert button state back to "Reset" in case of any error
            forgotPassword.textContent = "Reset";
            forgotPassword.disabled = false;  // Re-enable the button
        });
});

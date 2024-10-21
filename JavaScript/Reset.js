// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, sendPasswordResetEmail, getUserByEmail } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
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

function showMessage(message, divId) {
    var messageDiv = document.getElementById(divId);

    // Apply styles for visibility, color, and font weight
    messageDiv.style.display = "block";
    messageDiv.style.color = "#7fcaec";  // Light blue color
    messageDiv.style.fontWeight = "bold"; // Bold font
    messageDiv.style.transition = "opacity 1s"; // Smooth fade transition
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;

    // Hide message after 5 seconds with fade out effect
    setTimeout(function () {
        messageDiv.style.opacity = 0;
    }, 5000);
}

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
    forgotPassword.textContent = "Checking..."; // Show checking state
    forgotPassword.disabled = true;  // Disable button to prevent multiple clicks

    // Check if the email is valid
    if (!isValidEmail(email)) {
        showMessage("Please enter a valid email address.", "signUpMessage");
        forgotPassword.textContent = "Reset"; // Reset button text
        forgotPassword.disabled = false;  // Enable button again
        return;
    }

    // Check if the user exists
    getUserByEmail(auth, email)
        .then((userRecord) => {
            // User exists, proceed to send password reset email
            sendPasswordResetEmail(auth, email)
                .then(() => {
                    // Success: Email has been sent
                    forgotEmail.value = ""; // Clear the email input field
                    forgotPassword.textContent = "Sent"; // Change the button text to "Sent"

                    showMessage("A password reset link has been sent to the provided email address.", "signUpMessage");

                    // Redirect after a short delay to give the user feedback
                    setTimeout(() => {
                        forgotPassword.textContent = "Reset"; // Reset button text
                        window.location.href = "Signin.html";
                    }, 1000);
                })
                .catch((error) => {
                    // Handle errors while sending email
                    console.error("Error sending password reset email:", error);
                    showMessage("Error: " + error.message, "signUpMessage");
                    forgotPassword.textContent = "Reset"; // Reset button text
                    forgotPassword.disabled = false;  // Re-enable the button
                });
        })
        .catch((error) => {
            console.error("Error fetching user data:", error);
            if (error.code === 'auth/user-not-found') {
                showMessage("There is no user with that email address.", "signUpMessage");
            } else {
                showMessage("Error fetching user data: " + error.message, "signUpMessage");
            }
            forgotPassword.textContent = "Reset"; // Reset button text
            forgotPassword.disabled = false;  // Re-enable the button
        });
});

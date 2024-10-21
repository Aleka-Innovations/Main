// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
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

// Initialize Firebase
function showMessage(message, divId) {
    var messageDiv = document.getElementById(divId);
    messageDiv.style.display = "block";
    messageDiv.style.color = "#7fcaec";  // Light blue color
    messageDiv.style.fontWeight = "bold"; // Bold font
    messageDiv.style.transition = "opacity 1s"; // Smooth fade transition
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;

    setTimeout(function () {
        messageDiv.style.opacity = 0;
    }, 5000);
}

// Email validation function
function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

const signUp = document.getElementById('submitSignUp');
signUp.addEventListener('click', (event) => {
    event.preventDefault();
    const email = document.getElementById('rEmail').value;
    const password = document.getElementById('rPassword').value;
    const firstName = document.getElementById('fName').value;
    const lastName = document.getElementById('lName').value;

    // Check if the email is valid
    if (!isValidEmail(email)) {
        showMessage('Please enter a valid email address!', 'signUpMessage');
        return; // Exit the function if the email is invalid
    }

    const auth = getAuth(app);
    const db = getFirestore();

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const userData = {
                email: email,
                firstName: firstName,
                lastName: lastName
            };
            showMessage('Account was created successfully! A verification email has been sent.', 'signUpMessage');
            
            // Send email verification
            sendEmailVerification(user)
                .then(() => {
                    // Verification email sent. You can log user out or keep them logged in.
                    // For example, you might want to redirect to a "check your email" page.
                    const docRef = doc(db, "users", user.uid);
                    setDoc(docRef, userData)
                        .then(() => {
                            // Optionally log out the user if you want them to verify before logging in
                            // auth.signOut();
                            // window.location.href = "Signin.html"; // Redirect to sign-in page
                        })
                        .catch((error) => {
                            console.error("Error writing document", error);
                        });
                })
                .catch((error) => {
                    console.error("Error sending email verification", error);
                });
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode === 'auth/email-already-in-use') {
                showMessage('Email already exists!', 'signUpMessage');
            } else {
                showMessage('Unable to create User.', 'signUpMessage');
            }
        });
});

const signIn = document.getElementById('submitSignIn');
signIn.addEventListener('click', (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const auth = getAuth(app);

    // Check if the email is valid
    if (!email && !password) {
        showMessage('Please enter both email and password!', 'signInMessage');
        return; // Exit the function if both fields are empty
    } else if (!email) {
        showMessage('Please enter your email address!', 'signInMessage');
        return; // Exit the function if email is empty
    } else if (!password) {
        showMessage('Please enter your password!', 'signInMessage');
        return; // Exit the function if password is empty
    } else if (!isValidEmail(email)) {
        showMessage('Please enter a valid email address!', 'signInMessage');
        return; // Exit the function if the email is invalid
    }
    
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            if (user.emailVerified) {
                showMessage('Login is successful', 'signInMessage');
                localStorage.setItem('loggedInUserId', user.uid);
                window.location.href = 'Home.html';
            } else {
                showMessage('Please verify your email before logging in.', 'signInMessage');
            }
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode === 'auth/invalid-credential') {
                showMessage('Incorrect Email or Password', 'signInMessage');
            } else {
                showMessage('Account does not Exist', 'signInMessage');
            }
        });
});

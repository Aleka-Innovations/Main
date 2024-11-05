import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyBJft09DwFK1UPkqAW_S9k-TXTb0PnrzRE",
    authDomain: "aleka-be469.firebaseapp.com",
    projectId: "aleka-be469",
    storageBucket: "aleka-be469.appspot.com",
    messagingSenderId: "404498275934",
    appId: "1:404498275934:web:e065a5169a4cabee551ecf",
    measurementId: "G-2LB8TTXY9S",
    databaseURL: "https://aleka-be469-default-rtdb.europe-west1.firebasedatabase.app"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();
const realtimeDB = getDatabase(app); // Initialize Realtime Database

function showMessage(message, divId) {
    var messageDiv = document.getElementById(divId);
    messageDiv.style.display = "block";
    messageDiv.style.color = "#7fcaec";
    messageDiv.style.fontWeight = "bold";
    messageDiv.style.transition = "opacity 1s";
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

// Helper function to format email as a valid Firebase key
function formatEmailKey(email) {
    return email.replace(/\./g, '_'); // Replace "." with "_"
}

const signUp = document.getElementById('submitSignUp');
const MIN_PASSWORD_LENGTH = 6;

signUp.addEventListener('click', (event) => {
    event.preventDefault();
    const email = document.getElementById('rEmail').value;
    const password = document.getElementById('rPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value; // New confirm password field
    const firstName = document.getElementById('fName').value;
    const lastName = document.getElementById('lName').value;

    if (!isValidEmail(email)) {
        showMessage('Please enter a valid email address!', 'signUpMessage');
        return; 
    }
    if (!firstName || !password || !confirmPassword) {
        showMessage('Please fill out the required details.', 'signUpMessage');
        return; 
    }
    if (password.length < MIN_PASSWORD_LENGTH) {
        const remainingChars = MIN_PASSWORD_LENGTH - password.length;
        showMessage(`Your password is too short. You need ${remainingChars} more ${remainingChars > 1 ? 'letters' : 'letter'} in your password.`, 'signUpMessage');
        return;
    }
    if (password !== confirmPassword) {
        showMessage('Passwords do not match. Please try again.', 'signUpMessage');
        return;
    }

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const userData = {
                email: email,
                firstName: firstName,
                lastName: lastName
            };
            showMessage('A verification email has been sent to your E-Mail.', 'signUpMessage');
            
            // Send email verification
            sendEmailVerification(user)
                .then(() => {
                    // Store data in Firestore
                    const docRef = doc(db, "users", user.uid);
                    setDoc(docRef, userData)
                        .then(() => {
                            const emailKey = formatEmailKey(email);
                            const verifiedRef = ref(realtimeDB, `Users/${user.uid}`);
                            
                            // Set data in the Realtime Database
                            set(verifiedRef, {
                                Details: {
                                    FirstName: firstName,
                                    LastName: lastName,
                                    Email: email
                                },
                                Roblox: {
                                    Name: "",
                                    UserId: ""
                                }
                            })
                            .then(() => {
                                auth.signOut();
                                window.location.href = "Signin.html";
                            })
                            .catch((error) => {
                                console.error("Error writing to Realtime Database", error);
                            });
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

    // Check if the email and password fields are filled
    if (!email && !password) {
        showMessage('Please enter both email and password!', 'signInMessage');
        return; 
    } 
    if (!email) {
        showMessage('Please enter your email address!', 'signInMessage');
        return; 
    } 
    if (!password) {
        showMessage('Please enter your password!', 'signInMessage');
        return; 
    } 
    if (!isValidEmail(email)) {
        showMessage('Please enter a valid email address!', 'signInMessage');
        return; 
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
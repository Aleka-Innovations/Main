 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
 import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
 import{getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js"
 
 const firebaseConfig = {
    apiKey: "AIzaSyAKUpKJ3TBR3-fIM-kEJ6_pSSGTVxZnZVQ",
    authDomain: "aleka-c4790.firebaseapp.com",
    projectId: "aleka-c4790",
    storageBucket: "aleka-c4790.appspot.com",
    messagingSenderId: "358857680130",
    appId: "1:358857680130:web:159848807539e8d5480e1b",
    measurementId: "G-ZSBSF9DP0P"
  };

  const app = initializeApp(firebaseConfig);

 // Initialize Firebase
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
    setTimeout(function() {
        messageDiv.style.opacity = 0;
    }, 5000);
}

 const forgotPassword = document.getElementById("forgotPassword");
 const forgotEmail = document.getElementById("resetEmail");
 
 forgotPassword.addEventListener("click", () => {
     const auth = getAuth(app);
     sendPasswordResetEmail(auth, forgotEmail.value)
     .then(() => {
         forgotEmail.value = "";
 
         alert("A password reset link has been sent to the email.");
     })
     .catch((error) => {
         const errorCode = error.code;
         const errorMessage = error.message;
         
         alert("Please enter the correct email.");
     });
 }); 
 
 const signUp=document.getElementById('submitSignUp');
 signUp.addEventListener('click', (event)=>{
    event.preventDefault();
    const email=document.getElementById('rEmail').value;
    const password=document.getElementById('rPassword').value;
    const firstName=document.getElementById('fName').value;
    const lastName=document.getElementById('lName').value;

    const auth=getAuth(app);
    const db=getFirestore();

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential)=>{
        const user=userCredential.user;
        const userData={
            email: email,
            firstName: firstName,
            lastName:lastName
        };
        showMessage('Account was created successfully!', 'signUpMessage');
        const docRef=doc(db, "users", user.uid);
        setDoc(docRef,userData)
        .then(()=>{
            window.location.href='Main/Home.html';
        })
        .catch((error)=>{
            console.error("error writing document", error);

        });
    })
    .catch((error)=>{
        const errorCode=error.code;
        if(errorCode=='auth/email-already-in-use'){
            showMessage('Email already exists!', 'signUpMessage');
        }
        else{
            showMessage('Unable to create User.', 'signUpMessage');
        }
    })
 });

 const signIn=document.getElementById('submitSignIn');
 signIn.addEventListener('click', (event)=>{
    event.preventDefault();
    const email=document.getElementById('email').value;
    const password=document.getElementById('password').value;
    const auth=getAuth(app);

    signInWithEmailAndPassword(auth, email,password)
    .then((userCredential)=>{
        showMessage('login is successful', 'signInMessage');
        const user=userCredential.user;
        localStorage.setItem('loggedInUserId', user.uid);
        window.location.href='Main/Home.html';
    })
    .catch((error)=>{
        const errorCode=error.code;
        if(errorCode==='auth/invalid-credential'){
            showMessage('Incorrect Email or Password', 'signInMessage');
        }
        else{
            showMessage('Account does not Exist', 'signInMessage');
        }
    })
 })
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

const signUp=document.getElementById('submitSignUp');
signUp.addEventListener('click', (event)=>{
   event.preventDefault();
   const email=document.getElementById('rEmail').value;
   const password=document.getElementById('rPassword').value;
   const firstName=document.getElementById('fName').value;
   const lastName=document.getElementById('lName').value;

   const auth=getAuth();
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
           window.location.href = "Signin.html";
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
   const auth=getAuth();

   signInWithEmailAndPassword(auth, email,password)
   .then((userCredential)=>{
       showMessage('login is successful', 'signInMessage');
       const user=userCredential.user;
       localStorage.setItem('loggedInUserId', user.uid);
       window.location.href='Home.html';
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

// Switch

const signUpButton=document.getElementById('signUpButton');
const signInButton=document.getElementById('signInButton');
const signInForm=document.getElementById('signIn');
const signUpForm=document.getElementById('signUp');

signUpButton.addEventListener('click',function(){
   signInForm.style.display="none";
   signUpForm.style.display="block";
})
signInButton.addEventListener('click', function(){
   signInForm.style.display="block";
   signUpForm.style.display="none";
})

// Toggle

function togglePassword(inputId, button) {
   const passwordInput = document.getElementById(inputId);
   const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
   passwordInput.setAttribute('type', type);
   
   button.innerHTML = type === 'password' 
       ? '<i class="fas fa-eye"></i>' 
       : '<i class="fas fa-eye-slash"></i>';
}
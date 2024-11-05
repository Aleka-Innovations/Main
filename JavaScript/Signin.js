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
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
    measurementId: "G-2LB8TTXY9S",
    databaseURL: "https://aleka-be469-default-rtdb.europe-west1.firebasedatabase.app"
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

                    const newsText = document.getElementById('newsText');
                    const signText = document.getElementById('signText');

                    // Vis nyhetsmeldingen
                    if (newsText && signText) {
                        newsText.style.display = "block";
                        signText.style.display = "none";
                        
                        // Dynamisk oppretting av newsDisplay-elementet
                        const newsDisplay = document.createElement('div');
                        newsDisplay.id = 'newsDisplay';
                        newsDisplay.className = 'news-container';

                        // Legger til nyhetsinnhold
                        const newsItem = `
                            <div class="news-item">
                                <h3 class="news-title">New Game: "2 Player Obby Race"</h3>
                                <p class="news-date">October 21, 2024</p>
                                <img src="Images/Obby.png" alt="Build Assistant Tool" class="news-image">
                                <p class="news-description">We're excited to announce the release of our new game. It is still in early stages and the picture is just a snippet of what is to come, and so far only the coding is done, so interfaces and map are still in the works.</p>
                                <a href="Error.html" class="read-more">Read More</a>
                            </div>
                        `;
                        
                        newsDisplay.innerHTML = newsItem;
                        document.getElementById('main').appendChild(newsDisplay); // Legger til newsDisplay i main-seksjonen

                        newsDisplay.style.display = "flex"; // Viser newsDisplay
                    }
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
if (logoutButton) {
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('loggedInUserId');
        signOut(auth)
            .then(() => {
                window.location.href = window.location.href;
                document.getElementById('signUpName').style.display = 'none';
                document.getElementById('logout').style.display = 'none';
                document.getElementById('navBarSignIn').style.display = 'block';

                const newsText = document.getElementById('newsText');
                const signText = document.getElementById('signText');
                if (newsText && signText) {
                    newsText.style.display = "none";
                    signText.style.display = "block";
                    const existingNewsDisplay = document.getElementById('newsDisplay');
                    if (existingNewsDisplay) {
                        existingNewsDisplay.remove();
                    }
                }
            })
            .catch((error) => {
                console.error('Error Signing out:', error);
            });
    });
}
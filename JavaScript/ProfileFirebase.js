import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";

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
const realtimeDB = getDatabase(app);  // Initialize Realtime Database

// Listen for auth state changes
onAuthStateChanged(auth, (user) => {
    const loggedInUserId = localStorage.getItem('loggedInUserId');
    if (loggedInUserId) {
        const docRef = doc(db, "users", loggedInUserId);
        getDoc(docRef)
            .then((docSnap) => {
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    const firstNameElement = document.getElementById('loggedUserFName');
                    const emailElement = document.getElementById('loggedUserEmail');
                    const lastNameElement = document.getElementById('loggedUserLName');
                    const useridElement = document.getElementById('loggedUserID');
                    const robloxElement = document.getElementById('loggedRoblox');

                    firstNameElement.innerText = userData.firstName;  // Set new value
                    emailElement.innerText = userData.email;  // Set new value
                    lastNameElement.innerText = userData.lastName;  // Set new value
                    useridElement.innerText = loggedInUserId;

                    // Reference to the user's roblox value in the Realtime Database
                    const robloxRef = ref(realtimeDB, `Users/${loggedInUserId}/Roblox/Name`);
                    get(robloxRef)
                    .then((snapshot) => {
                        const robloxValue = snapshot.val();
                        if (robloxValue) {
                            robloxElement.innerText = robloxValue;  // Set roblox value
                        } else {
                            robloxElement.innerText = "Not linked yet!";  // Default message
                            console.log("No roblox data found for this user at path:", robloxRef.toString());
                        }
                    })
                    .catch((error) => {
                        console.error("Error retrieving roblox data:", error);
                        robloxElement.innerText = "Error retrieving data!";  // Inform user of error
                    });
                         
                } else {
                    console.log("No document found matching ID");
                }
            })
            .catch((error) => {
                console.log("Error getting document:", error);
            });
    } else {
        console.log("User ID not found in local storage");
    }
});

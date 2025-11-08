import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAkDznWz6eGV1ccnzmhFK3Ou4PyL3X_68s",
  authDomain: "mindful-new-paltz.firebaseapp.com",
  projectId: "mindful-new-paltz",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.addEventListener('DOMContentLoaded', () => {
  const logoutBtn = document.getElementById('logoutBtn');

  if (!logoutBtn) {
    console.error("Logout button not found!");
    return;
  }

  // Logout button
  logoutBtn.addEventListener('click', async () => {
    try {
      await signOut(auth);
      window.location.href = '../index.html';
    } catch (error) {
      console.error("Logout error:", error);
      alert("An error occurred while logging out. Please try again.");
    }
  });

  // Auth state check: redirect if user not logged in
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      // User is not signed in, redirect to landing/login page
      window.location.href = '../index.html';
    }
  });
});

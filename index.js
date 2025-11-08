// Firebase v9 modular imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

// TODO: Replace with your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAkDznWz6eGV1ccnzmhFK3Ou4PyL3X_68s",
  authDomain: "mindful-new-paltz.firebaseapp.com",
  projectId: "mindful-new-paltz",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Modal logic
const openModal = document.getElementById('openModal');
const closeModal = document.getElementById('closeModal');
const modal = document.getElementById('loginModal');
const loginBtn = document.getElementById('loginBtn');
const errorMsg = document.getElementById('errorMsg');

openModal.addEventListener('click', () => { modal.style.display = 'flex'; });
closeModal.addEventListener('click', () => { modal.style.display = 'none'; errorMsg.textContent = ''; });
window.addEventListener('click', e => { if(e.target === modal) { modal.style.display = 'none'; errorMsg.textContent = ''; }});

// Firebase login
loginBtn.addEventListener('click', async () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  try {
    await signInWithEmailAndPassword(auth, email, password);
    // Redirect on success
    window.location.href = 'dashboard/dash.html';
  } catch (error) {
    console.error(error);
    errorMsg.textContent = error.message;
  }
});

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAkDznWz6eGV1ccnzmhFK3Ou4PyL3X_68s",
  authDomain: "mindful-new-paltz.firebaseapp.com",
  projectId: "mindful-new-paltz",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Modal elements
const modal = document.getElementById('authModal');
const openModal = document.getElementById('openModal');
const closeModal = document.getElementById('closeModal');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const authBtn = document.getElementById('authBtn');
const errorMsg = document.getElementById('errorMsg');
const modalTitle = document.getElementById('modalTitle');
const toggleLink = document.getElementById('toggleLink');

let isLogin = true; // toggle state

// Open/close modal
openModal.addEventListener('click', () => { modal.style.display = 'flex'; });
closeModal.addEventListener('click', () => { modal.style.display = 'none'; errorMsg.textContent = ''; });
window.addEventListener('click', e => { if(e.target === modal) { modal.style.display = 'none'; errorMsg.textContent = ''; }});

// Toggle between Login and Signup
toggleLink.addEventListener('click', () => {
  isLogin = !isLogin;
  if(isLogin){
    modalTitle.textContent = "Login";
    authBtn.textContent = "Login";
    toggleLink.textContent = "Sign up";
    toggleLink.parentElement.firstChild.textContent = "Don't have an account? ";
  } else {
    modalTitle.textContent = "Sign Up";
    authBtn.textContent = "Sign Up";
    toggleLink.textContent = "Login";
    toggleLink.parentElement.firstChild.textContent = "Already have an account? ";
  }
});

// Handle Login / Signup
authBtn.addEventListener('click', async () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if(!email || !password) {
    errorMsg.textContent = "Please enter email and password.";
    return;
  }

  try {
    if(isLogin){
      await signInWithEmailAndPassword(auth, email, password);
    } else {
      await createUserWithEmailAndPassword(auth, email, password);
    }
    window.location.href = 'index.html'; // redirect after login/signup
  } catch (error) {
    console.error(error);
    errorMsg.textContent = error.message;
  }
});
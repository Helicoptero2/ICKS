import { supabase } from './supabase.js';

const loginForm = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

loginForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
        alert('Correo o contraseña incorrectos');
        return;
    }
    // Redirige según el usuario
    if (email.toLowerCase() === 'admin@gmail.com') {
        window.location.href = 'dashboard.html';
    } else {
        window.location.href = 'users.html';
    }
});
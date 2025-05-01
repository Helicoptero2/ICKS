import { authModule } from './supabase.js';

// ALERTA MODERNA Y CENTRADA FEDERACIÓN COLOMBIANA DE TAEKWONDO
function showTailwindAlert(message, isError = false) {
    // Elimina alertas previas si existen
    let oldAlert = document.getElementById('tailwind-alert');
    if (oldAlert) oldAlert.remove();

    // Crea el nuevo alert
    const alert = document.createElement('div');
    alert.id = 'tailwind-alert';
    alert.innerHTML = `
        <div class="flex items-center gap-4">
            <div class="flex items-center justify-center w-12 h-12 rounded-full shadow-lg
                ${isError 
                    ? 'bg-gradient-to-br from-red-600 via-yellow-400 to-red-700'
                    : 'bg-gradient-to-br from-yellow-400 via-blue-700 to-red-600'}">
                <i class="fas ${
                    isError 
                        ? 'fa-exclamation-circle text-white'
                        : 'fa-check-circle text-white'
                } text-3xl"></i>
            </div>
            <span id="tailwind-alert-message" class="flex-1 text-base font-semibold text-blue-900">${message}</span>
        </div>
    `;
    // Cambia el centrado: usa flex y justify-center para asegurar el centrado absoluto
    alert.className =
        'fixed inset-0 flex items-start justify-center z-50 pointer-events-none';
    
    // Contenedor interno para el alert visual
    const inner = document.createElement('div');
    inner.className =
        'mt-12 w-full max-w-md px-8 py-5 rounded-2xl shadow-2xl bg-white text-center border-t-8 border-blue-800 animate__animated animate__fadeInDown pointer-events-auto';
    inner.appendChild(alert.firstElementChild);
    alert.innerHTML = '';
    alert.appendChild(inner);

    document.body.appendChild(alert);

    setTimeout(() => {
        alert.style.opacity = '0';
        setTimeout(() => alert.remove(), 300);
    }, 3000);
}

// --- LOGIN ---
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const { error } = await authModule.login(email, password);
            if (error) throw error;
            showTailwindAlert('¡Bienvenido!', false);
            setTimeout(() => {
                window.location.href = "dashboard.html";
            }, 1200);
        } catch (error) {
            showTailwindAlert('Credenciales incorrectas o usuario no existe.', true);
        }
    });
}

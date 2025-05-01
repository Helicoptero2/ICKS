import { saveClubWithMembers, getClubs, getMembersByClub, getTorneos, getMembersByTorneo } from './postgres.js';
import { insertTorneo, supabase } from './supabase.js';

// Tabs
const tabInscripcionBtn = document.getElementById('tab-inscripcion-btn');
const tabInscritosBtn = document.getElementById('tab-inscritos-btn');
const tabTorneosBtn = document.getElementById('tab-torneos-btn');
const tabInscripcion = document.getElementById('tab-inscripcion');
const tabInscritos = document.getElementById('tab-inscritos');
const tabTorneos = document.getElementById('tab-torneos');
const clubsList = document.getElementById('clubsList');
const torneosList = document.getElementById('torneosList');

tabInscripcionBtn.addEventListener('click', (e) => {
    e.preventDefault();
    tabInscripcion.classList.remove('hidden');
    tabInscritos.classList.add('hidden');
    tabTorneos.classList.add('hidden');
    tabInscripcionBtn.classList.add('active-tab');
    tabInscritosBtn.classList.remove('active-tab');
    tabTorneosBtn.classList.remove('active-tab');
});

tabInscritosBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    tabInscripcion.classList.add('hidden');
    tabInscritos.classList.remove('hidden');
    tabTorneos.classList.add('hidden');
    tabInscripcionBtn.classList.remove('active-tab');
    tabInscritosBtn.classList.add('active-tab');
    tabTorneosBtn.classList.remove('active-tab');
    await loadClubs();
});

tabTorneosBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    tabInscripcion.classList.add('hidden');
    tabInscritos.classList.add('hidden');
    tabTorneos.classList.remove('hidden');
    tabInscripcionBtn.classList.remove('active-tab');
    tabInscritosBtn.classList.remove('active-tab');
    tabTorneosBtn.classList.add('active-tab');
    await loadTorneos();
});

// Manejo de miembros dinámicos
const members = [];
const memberFirstName = document.getElementById('memberFirstName');
const memberLastName = document.getElementById('memberLastName');
const memberId = document.getElementById('memberId');
const memberSex = document.getElementById('memberSex');
const memberPhone = document.getElementById('memberPhone');
const memberAddress = document.getElementById('memberAddress');
const memberEmail = document.getElementById('memberEmail');
const memberBelt = document.getElementById('memberBelt');
const memberCategory = document.getElementById('memberCategory');
const memberWeight = document.getElementById('memberWeight');
const memberHeight = document.getElementById('memberHeight');
const addMemberBtn = document.getElementById('addMemberBtn');
const membersList = document.getElementById('membersList');

function renderMembers() {
    membersList.innerHTML = '';
    if (members.length === 0) {
        membersList.innerHTML = `<li class="text-gray-400 text-center py-2">No hay miembros agregados.</li>`;
        return;
    }
    members.forEach((member, idx) => {
        const li = document.createElement('li');
        li.className = 'flex flex-col md:flex-row flex-wrap items-start md:items-center justify-between bg-gradient-to-r from-yellow-100 via-blue-50 to-white border-l-8 border-yellow-300 rounded-xl px-4 py-3 shadow gap-2 min-w-[340px] transition-all hover:shadow-lg';
        li.innerHTML = `
            <div class="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-1 flex-1 text-xs md:text-base w-full">
                <span><b>${member.nombre} ${member.apellido}</b></span>
                <span>Cédula: <span class="font-medium">${member.cedula}</span></span>
                <span>Sexo: <span class="font-medium">${member.sexo}</span></span>
                <span>Celular: <span class="font-medium">${member.celular}</span></span>
                <span>Dirección: <span class="font-medium">${member.direccion}</span></span>
                <span>Correo: <span class="font-medium">${member.correo}</span></span>
                <span>Cinturón: <span class="font-medium">${member.cinturon}</span></span>
                <span>Categoría: <span class="font-medium">${member.categoria}</span></span>
                <span>Peso: <span class="font-medium">${member.peso} kg</span></span>
                <span>Talla: <span class="font-medium">${member.talla} cm</span></span>
            </div>
            <button type="button" class="text-red-500 hover:text-red-700 remove-member-btn ml-2 mt-2 md:mt-0" data-idx="${idx}" title="Eliminar">
                <i class="fas fa-trash"></i>
            </button>
        `;
        membersList.appendChild(li);
    });
    document.querySelectorAll('.remove-member-btn').forEach(btn => {
        btn.onclick = function() {
            const idx = parseInt(this.getAttribute('data-idx'));
            members.splice(idx, 1);
            renderMembers();
        };
    });
}

addMemberBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const firstName = memberFirstName.value.trim();
    const lastName = memberLastName.value.trim();
    const id = memberId.value.trim();
    const sex = memberSex.value;
    const phone = memberPhone.value.trim();
    const address = memberAddress.value.trim();
    const email = memberEmail.value.trim();
    const belt = memberBelt.value.trim();
    const category = memberCategory.value;
    const weight = memberWeight.value.trim();
    const height = memberHeight.value.trim();
    if (
        firstName && lastName && id && sex && phone && address &&
        email && belt && category && weight && height
    ) {
        members.push({
            nombre: firstName,
            apellido: lastName,
            cedula: id,
            sexo: sex,
            celular: phone,
            direccion: address,
            correo: email,
            cinturon: belt,
            categoria: category,
            peso: weight,
            talla: height
        });
        memberFirstName.value = '';
        memberLastName.value = '';
        memberId.value = '';
        memberSex.value = '';
        memberPhone.value = '';
        memberAddress.value = '';
        memberEmail.value = '';
        memberBelt.value = '';
        memberCategory.value = '';
        memberWeight.value = '';
        memberHeight.value = '';
        renderMembers();
    }
});

[
    memberFirstName, memberLastName, memberId, memberSex, memberPhone,
    memberAddress, memberEmail, memberBelt, memberCategory, memberWeight, memberHeight
].forEach(input => {
    input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            addMemberBtn.click();
        }
    });
});

// Manejo de clubes
const clubForm = document.getElementById('club-form');
const clubSuccess = document.getElementById('club-success');

// Generar clave aleatoria segura
function generateRandomPassword(length = 10) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
}

// Registrar usuario en Supabase Auth
async function registerSupabaseUser(email, password) {
    return await supabase.auth.signUp({
        email,
        password
    });
}

clubForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const clubName = document.getElementById('clubName').value.trim();
    const clubEmail = document.getElementById('clubEmail').value.trim();
    const senseiName = document.getElementById('senseiName').value.trim();
    if (!clubName || !clubEmail || !senseiName || members.length === 0) return;

    // 1. Generar clave random y registrar usuario en Supabase Auth
    const randomPassword = generateRandomPassword();
    const { error: authError } = await registerSupabaseUser(clubEmail, randomPassword);
    if (authError) {
        alert('Error al registrar usuario: ' + authError.message);
        return;
    }

    // 2. Guardar club y miembros en la base de datos
    console.log(members); // <-- Agrega esto para ver la estructura
    const { error } = await saveClubWithMembers(
        { nombre: clubName, correo: clubEmail, sensei: senseiName },
        members
    );

    if (error) {
        alert('Error al registrar: ' + error.message);
        return;
    }

    alert(`Club registrado. Usuario: ${clubEmail}\nContraseña: ${randomPassword}`);

    clubForm.reset();
    members.length = 0;
    renderMembers();
    clubSuccess.classList.remove('hidden');
    setTimeout(() => clubSuccess.classList.add('hidden'), 2000);
});

// Mostrar clubes inscritos en la pestaña "Inscritos"
async function loadClubs() {
    clubsList.innerHTML = `<div class="text-gray-400 text-center py-6">Cargando clubes...</div>`;
    const { data: clubs, error } = await getClubs();
    if (error) {
        clubsList.innerHTML = `<div class="text-red-500 text-center py-6">Error al obtener clubes.</div>`;
        return;
    }
    if (!clubs || clubs.length === 0) {
        clubsList.innerHTML = `<div class="text-gray-400 text-center py-6">No hay clubes inscritos aún.</div>`;
        return;
    }
    // Renderizar clubes y sus miembros
    clubsList.innerHTML = '';
    for (const club of clubs) {
        const { data: members, error: membersError } = await getMembersByClub(club.id);
        const membersHtml = (members && members.length > 0)
            ? members.map(m => `
                <li class="ml-4 text-gray-700">
                    <b>${m.nombre} ${m.apellido}</b>
                    | Cédula: ${m.cedula}
                    | Sexo: ${m.sexo}
                    | Celular: ${m.celular}
                    | Dirección: ${m.direccion}
                    | Correo: ${m.correo}
                    | Categoría: ${m.categoria}
                    | Cinturón: ${m.cinturon}
                    | Peso: ${m.peso} kg
                    | Talla: ${m.talla} cm
                </li>
            `).join('')
            : '<li class="ml-4 text-gray-400">Sin miembros registrados</li>';
        clubsList.innerHTML += `
            <div class="mb-8 border-b pb-4">
                <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div>
                        <span class="font-bold text-blue-900 text-lg">${club.nombre}</span>
                        <span class="ml-2 text-gray-500 text-sm">Sensei: ${club.sensei}</span>
                        <span class="ml-2 text-gray-500 text-sm">Correo: ${club.correo}</span>
                    </div>
                </div>
                <ul class="mt-2">${membersHtml}</ul>
            </div>
        `;
    }
}

// Torneos
const torneoForm = document.getElementById('torneo-form');
const torneoSuccess = document.getElementById('torneo-success');

torneoForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const torneoName = document.getElementById('torneoName').value.trim();
    const torneoDate = document.getElementById('torneoDate').value;
    if (!torneoName || !torneoDate) return;

    const { error } = await insertTorneo({ nombre: torneoName, fecha: torneoDate });
    if (error) {
        alert('Error al crear torneo: ' + error.message);
        return;
    }
    torneoForm.reset();
    torneoSuccess.classList.remove('hidden');
    setTimeout(() => torneoSuccess.classList.add('hidden'), 2000);
    await loadTorneos();
});

async function loadTorneos() {
    torneosList.innerHTML = `<div class="text-gray-400 text-center py-6">Cargando torneos...</div>`;
    const { data: torneos, error } = await getTorneos();
    if (error) {
        torneosList.innerHTML = `<div class="text-red-500 text-center py-6">Error al obtener torneos.</div>`;
        return;
    }
    if (!torneos || torneos.length === 0) {
        torneosList.innerHTML = `<div class="text-gray-400 text-center py-6">No hay torneos creados aún.</div>`;
        return;
    }
    torneosList.innerHTML = '';
    for (const torneo of torneos) {
        // Obtener miembros inscritos a este torneo
        const { data: inscritos, error: inscritosError } = await getMembersByTorneo(torneo.id);
        let inscritosHtml = '';
        if (inscritosError) {
            inscritosHtml = `<div class="text-red-500 text-sm">Error al obtener inscritos.</div>`;
        } else if (!inscritos || inscritos.length === 0) {
            inscritosHtml = `<div class="text-gray-400 text-sm ml-4">No hay miembros inscritos.</div>`;
        } else {
            inscritosHtml = `
                <ul class="ml-4 mt-2">
                    ${inscritos.map(i => `
                        <li class="text-gray-700">
                            <b>${i.members?.nombre || ''} ${i.members?.apellido || ''}</b>
                            | Cédula: ${i.members?.cedula || ''}
                            | Sexo: ${i.members?.sexo || ''}
                            | Celular: ${i.members?.celular || ''}
                            | Dirección: ${i.members?.direccion || ''}
                            | Correo: ${i.members?.correo || ''}
                            | Categoría: ${i.members?.categoria || ''}
                            | Cinturón: ${i.members?.cinturon || ''}
                            | Peso: ${i.members?.peso || ''} kg
                            | Talla: ${i.members?.talla || ''} cm
                        </li>
                    `).join('')}
                </ul>
            `;
        }
        torneosList.innerHTML += `
            <div class="mb-6 border-b pb-4">
                <div>
                    <span class="font-bold text-red-700 text-lg">${torneo.nombre}</span>
                    <span class="ml-2 text-gray-500 text-sm">Fecha: ${torneo.fecha}</span>
                </div>
                <div class="mt-2">
                    <span class="font-semibold text-blue-900">Miembros inscritos:</span>
                    ${inscritosHtml}
                </div>
            </div>
        `;
    }
}

renderMembers();
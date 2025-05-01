import { insertClub, insertMembers, supabase } from './supabase.js';

/**
 * Inserta un club y sus miembros en Supabase.
 * @param {Object} clubData { nombre, correo, sensei }
 * @param {Array} membersData [{ nombre, apellido, cedula, sexo, celular, direccion, correo, cinturon, categoria, peso, talla }]
 * @returns {Promise<{club, members, error}>}
 */
export async function saveClubWithMembers(clubData, membersData) {
    // 1. Insertar el club
    const { data: club, error: clubError } = await insertClub({
        nombre: clubData.nombre,
        correo: clubData.correo,
        sensei: clubData.sensei
    });

    if (clubError) {
        return { club: null, members: null, error: clubError };
    }

    // 2. Preparar miembros con el club_id y todos los campos nuevos
    const membersToInsert = membersData.map(m => ({
        nombre: m.nombre,
        apellido: m.apellido,
        cedula: m.cedula,
        sexo: m.sexo,
        celular: m.celular,
        direccion: m.direccion,
        correo: m.correo,
        cinturon: m.cinturon,
        categoria: m.categoria,
        peso: m.peso,
        talla: m.talla,
        club_id: club.id
    }));

    // 3. Insertar miembros
    const { data: members, error: membersError } = await insertMembers(membersToInsert);

    if (membersError) {
        return { club, members: null, error: membersError };
    }

    return { club, members, error: null };
}

/**
 * Obtiene todos los clubes
 * @returns {Promise<{data, error}>}
 */
export async function getClubs() {
    return await supabase
        .from('clubs')
        .select('*')
        .order('id', { ascending: true });
}

/**
 * Obtiene todos los miembros de un club
 * @param {number} club_id
 * @returns {Promise<{data, error}>}
 */
export async function getMembersByClub(club_id) {
    return await supabase
        .from('members')
        .select('*')
        .eq('club_id', club_id)
        .order('id', { ascending: true });
}

/**
 * Obtiene todos los torneos
 * @returns {Promise<{data, error}>}
 */
export async function getTorneos() {
    return await supabase
        .from('torneos')
        .select('*')
        .order('fecha', { ascending: false });
}

/**
 * Obtiene todos los miembros inscritos a un torneo
 * @param {number} torneo_id
 * @returns {Promise<{data, error}>}
 */
export async function getMembersByTorneo(torneo_id) {
    return await supabase
        .from('members_torneo')
        .select('*, members(*), torneos(*)')
        .eq('torneo_id', torneo_id);
}
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = 'https://qwxprwxgcvohticlbnmo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF3eHByd3hnY3ZvaHRpY2xibm1vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU3OTk3NjAsImV4cCI6MjA2MTM3NTc2MH0.gXs2_Nt2Vs76HUuI52s-OuoPrhWdCbXtvsWYTGpJ1CU';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const authModule = {
    login(email, password) {
        return supabase.auth.signInWithPassword({ email, password });
    },
    logout() {
        return supabase.auth.signOut();
    },
    onAuthStateChanged(callback) {
        supabase.auth.onAuthStateChange((event, session) => {
            callback(session?.user || null);
        });
    }
};

// --- MÉTODOS DE INSERCIÓN PARA EL DASHBOARD Y POSTGRES ---

/**
 * Inserta un club en la tabla 'clubs'
 * @param {Object} club { nombre, correo, sensei }
 * @returns {Promise<{data, error}>}
 */
export async function insertClub(club) {
    return await supabase
        .from('clubs')
        .insert([club])
        .select()
        .single();
}

/**
 * Inserta varios miembros en la tabla 'members'
 * @param {Array} members [{ nombre, cedula, categoria, cinturon, peso, club_id }]
 * @returns {Promise<{data, error}>}
 */
export async function insertMembers(members) {
    return await supabase
        .from('members')
        .insert(members);
}

/**
 * Inserta un torneo en la tabla 'torneos'
 * @param {Object} torneo { nombre, fecha }
 * @returns {Promise<{data, error}>}
 */
export async function insertTorneo(torneo) {
    return await supabase
        .from('torneos')
        .insert([torneo])
        .select()
        .single();
}

/**
 * Inserta inscripciones de miembros a torneos en la tabla 'members_torneo'
 * @param {Array} inscripciones [{ member_id, torneo_id }]
 * @returns {Promise<{data, error}>}
 */
export async function insertMembersTorneo(inscripciones) {
    return await supabase
        .from('members_torneo')
        .insert(inscripciones);
}
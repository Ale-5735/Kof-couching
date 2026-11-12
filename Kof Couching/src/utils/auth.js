// Local Authentication System for KOF '98 Coaching Lab
// Stores accounts and session in localStorage for seamless persistence

const USERS_STORAGE_KEY = 'kof98_registered_users';
const CURRENT_USER_KEY = 'kof98_current_session';

// Pre-seeded default demonstration users
const INITIAL_DEMO_USERS = [
  {
    id: 'user_master98',
    gamertag: 'KOF_Master98',
    email: 'demo@kof98.com',
    password: 'kof98password',
    mainChar: 'iori',
    rank: 'Rank S',
    joinedDate: '2026-01-15',
  },
  {
    id: 'user_daimon_cl',
    gamertag: 'DaimonMaster_CL',
    email: 'daimon@kof98.com',
    password: 'kof98password',
    mainChar: 'daimon',
    rank: 'Rank A',
    joinedDate: '2026-02-10',
  },
];

// Initialize storage if empty
export function initAuthStorage() {
  if (typeof window === 'undefined') return;
  const existing = localStorage.getItem(USERS_STORAGE_KEY);
  if (!existing) {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(INITIAL_DEMO_USERS));
  }
}

// Get currently logged-in user
export function getLoggedInUser() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(CURRENT_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

// Get all registered users
export function getRegisteredUsers() {
  if (typeof window === 'undefined') return INITIAL_DEMO_USERS;
  try {
    const raw = localStorage.getItem(USERS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : INITIAL_DEMO_USERS;
  } catch {
    return INITIAL_DEMO_USERS;
  }
}

// Login with email or gamertag + password
export function login(identifier, password) {
  initAuthStorage();
  const users = getRegisteredUsers();
  const cleanId = identifier.trim().toLowerCase();
  const cleanPass = password.trim();

  const user = users.find(
    (u) =>
      (u.email.toLowerCase() === cleanId || u.gamertag.toLowerCase() === cleanId) &&
      u.password === cleanPass
  );

  if (!user) {
    return {
      success: false,
      error: 'Credenciales inválidas. Verifica tu correo/gamertag y contraseña.',
    };
  }

  // Create sanitized session (omit password)
  const sessionUser = {
    id: user.id,
    gamertag: user.gamertag,
    email: user.email,
    mainChar: user.mainChar || 'iori',
    rank: user.rank || 'Rank B',
  };

  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(sessionUser));
  return { success: true, user: sessionUser };
}

// Register new account
export function register({ gamertag, email, password, mainChar }) {
  initAuthStorage();
  const users = getRegisteredUsers();
  const cleanGamertag = gamertag.trim();
  const cleanEmail = email.trim().toLowerCase();
  const cleanPass = password.trim();

  if (cleanGamertag.length < 3) {
    return { success: false, error: 'El Gamertag debe tener al menos 3 caracteres.' };
  }
  if (!cleanEmail.includes('@') || !cleanEmail.includes('.')) {
    return { success: false, error: 'Por favor ingresa un correo electrónico válido.' };
  }
  if (cleanPass.length < 4) {
    return { success: false, error: 'La contraseña debe tener al menos 4 caracteres.' };
  }

  // Check duplicates
  const emailExists = users.some((u) => u.email.toLowerCase() === cleanEmail);
  if (emailExists) {
    return { success: false, error: 'Ya existe una cuenta registrada con este correo.' };
  }

  const gamertagExists = users.some(
    (u) => u.gamertag.toLowerCase() === cleanGamertag.toLowerCase()
  );
  if (gamertagExists) {
    return { success: false, error: 'Este Gamertag ya está en uso. Elige otro nombre.' };
  }

  const newUser = {
    id: `user_${Date.now()}`,
    gamertag: cleanGamertag,
    email: cleanEmail,
    password: cleanPass,
    mainChar: mainChar || 'iori',
    rank: 'Rank C (Nuevo Alumno)',
    joinedDate: new Date().toISOString(),
  };

  users.push(newUser);
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));

  // Automatically log in the user
  const sessionUser = {
    id: newUser.id,
    gamertag: newUser.gamertag,
    email: newUser.email,
    mainChar: newUser.mainChar,
    rank: newUser.rank,
  };
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(sessionUser));

  return { success: true, user: sessionUser };
}

// Logout
export function logout() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(CURRENT_USER_KEY);
}


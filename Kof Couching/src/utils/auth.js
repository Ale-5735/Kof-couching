// Local Authentication & User Management System for KOF '98 Coaching Lab
// Stores accounts and session in localStorage for seamless persistence

const USERS_STORAGE_KEY = 'kof98_registered_users';
const CURRENT_USER_KEY = 'kof98_current_session';

// Official Administrator Account
export const ADMIN_USER = {
  id: 'user_admin98',
  gamertag: 'KOF_Admin',
  email: 'admin@kof98.com',
  password: 'admin98',
  role: 'admin',
  mainChar: 'rugal',
  rank: 'System Operator (Admin)',
  joinedDate: '1998-07-23',
};

// Pre-seeded default users
const INITIAL_DEMO_USERS = [
  ADMIN_USER,
  {
    id: 'user_master98',
    gamertag: 'KOF_Master98',
    email: 'demo@kof98.com',
    password: 'kof98password',
    role: 'user',
    mainChar: 'iori',
    rank: 'Rank S',
    joinedDate: '2026-01-15',
  },
  {
    id: 'user_daimon_cl',
    gamertag: 'DaimonMaster_CL',
    email: 'daimon@kof98.com',
    password: 'kof98password',
    role: 'user',
    mainChar: 'daimon',
    rank: 'Rank A',
    joinedDate: '2026-02-10',
  },
];

// Initialize storage and guarantee the Admin account is always present
export function initAuthStorage() {
  if (typeof window === 'undefined') return;
  try {
    const existingRaw = localStorage.getItem(USERS_STORAGE_KEY);
    if (!existingRaw) {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(INITIAL_DEMO_USERS));
    } else {
      const users = JSON.parse(existingRaw);
      // Guarantee the admin account exists
      const hasAdmin = users.some(
        (u) => u.email.toLowerCase() === ADMIN_USER.email.toLowerCase() || u.id === ADMIN_USER.id
      );
      if (!hasAdmin) {
        users.unshift(ADMIN_USER);
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
      }
    }
  } catch {
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
    initAuthStorage();
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

  // Determine role (default to 'admin' if email matches ADMIN_USER)
  const role = user.role || (user.email.toLowerCase() === ADMIN_USER.email.toLowerCase() ? 'admin' : 'user');

  // Create sanitized session (omit password)
  const sessionUser = {
    id: user.id,
    gamertag: user.gamertag,
    email: user.email,
    role: role,
    mainChar: user.mainChar || 'iori',
    rank: user.rank || (role === 'admin' ? 'System Operator (Admin)' : 'Rank B'),
  };

  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(sessionUser));
  return { success: true, user: sessionUser };
}

// Register new account (student)
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
    role: 'user',
    mainChar: mainChar || 'iori',
    rank: 'Rank C (Nuevo Alumno)',
    joinedDate: new Date().toISOString().split('T')[0],
  };

  users.push(newUser);
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));

  // Automatically log in the user
  const sessionUser = {
    id: newUser.id,
    gamertag: newUser.gamertag,
    email: newUser.email,
    role: newUser.role,
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

// ============================================================================
// ADMINISTRATOR ACCOUNT CONTROL FUNCTIONS
// ============================================================================

// Admin: Update user account (Gamertag, Email, MainChar, Rank, Role, Password)
export function adminUpdateUser(userId, updatedFields) {
  initAuthStorage();
  const users = getRegisteredUsers();
  const index = users.findIndex((u) => u.id === userId);

  if (index === -1) {
    return { success: false, error: 'Usuario no encontrado.' };
  }

  // Prevent changing email/gamertag to an existing one
  if (updatedFields.email) {
    const cleanEmail = updatedFields.email.trim().toLowerCase();
    const emailConflict = users.some(
      (u, idx) => idx !== index && u.email.toLowerCase() === cleanEmail
    );
    if (emailConflict) {
      return { success: false, error: 'El correo ya está en uso por otra cuenta.' };
    }
  }

  if (updatedFields.gamertag) {
    const cleanGamertag = updatedFields.gamertag.trim().toLowerCase();
    const tagConflict = users.some(
      (u, idx) => idx !== index && u.gamertag.toLowerCase() === cleanGamertag
    );
    if (tagConflict) {
      return { success: false, error: 'El Gamertag ya está en uso por otra cuenta.' };
    }
  }

  const existingUser = users[index];
  const merged = {
    ...existingUser,
    ...updatedFields,
    email: updatedFields.email ? updatedFields.email.trim().toLowerCase() : existingUser.email,
    gamertag: updatedFields.gamertag ? updatedFields.gamertag.trim() : existingUser.gamertag,
    password: updatedFields.password ? updatedFields.password.trim() : existingUser.password,
  };

  users[index] = merged;
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));

  // If the updated user is currently logged in, update the session
  const current = getLoggedInUser();
  if (current && current.id === userId) {
    const updatedSession = {
      id: merged.id,
      gamertag: merged.gamertag,
      email: merged.email,
      role: merged.role || 'user',
      mainChar: merged.mainChar,
      rank: merged.rank,
    };
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedSession));
  }

  return { success: true, user: merged };
}

// Admin: Delete user account
export function adminDeleteUser(userId) {
  initAuthStorage();
  const users = getRegisteredUsers();
  const target = users.find((u) => u.id === userId);

  if (!target) {
    return { success: false, error: 'Usuario no encontrado.' };
  }

  // Safety: Prevent deleting the primary admin account
  if (target.email.toLowerCase() === ADMIN_USER.email.toLowerCase() || target.id === ADMIN_USER.id) {
    return { success: false, error: 'No es posible eliminar la cuenta principal de Administrador.' };
  }

  const filtered = users.filter((u) => u.id !== userId);
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(filtered));

  return { success: true };
}

// Admin: Create user account manually
export function adminCreateUser({ gamertag, email, password, mainChar, rank, role }) {
  initAuthStorage();
  const users = getRegisteredUsers();
  const cleanGamertag = (gamertag || '').trim();
  const cleanEmail = (email || '').trim().toLowerCase();
  const cleanPass = (password || '').trim();

  if (cleanGamertag.length < 3) {
    return { success: false, error: 'El Gamertag debe tener al menos 3 caracteres.' };
  }
  if (!cleanEmail.includes('@') || !cleanEmail.includes('.')) {
    return { success: false, error: 'Ingresa un correo electrónico válido.' };
  }
  if (cleanPass.length < 4) {
    return { success: false, error: 'La contraseña debe tener al menos 4 caracteres.' };
  }

  if (users.some((u) => u.email.toLowerCase() === cleanEmail)) {
    return { success: false, error: 'Ya existe una cuenta con este correo.' };
  }
  if (users.some((u) => u.gamertag.toLowerCase() === cleanGamertag.toLowerCase())) {
    return { success: false, error: 'Este Gamertag ya está en uso.' };
  }

  const newUser = {
    id: `user_${Date.now()}`,
    gamertag: cleanGamertag,
    email: cleanEmail,
    password: cleanPass,
    role: role || 'user',
    mainChar: mainChar || 'iori',
    rank: rank || (role === 'admin' ? 'System Operator (Admin)' : 'Rank B'),
    joinedDate: new Date().toISOString().split('T')[0],
  };

  users.push(newUser);
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));

  return { success: true, user: newUser };
}

// Admin: Quick password reset
export function adminResetPassword(userId, newPassword) {
  initAuthStorage();
  const cleanPass = (newPassword || '').trim();
  if (cleanPass.length < 4) {
    return { success: false, error: 'La nueva contraseña debe tener al menos 4 caracteres.' };
  }
  return adminUpdateUser(userId, { password: cleanPass });
}

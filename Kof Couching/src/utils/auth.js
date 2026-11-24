// Local & Cloud Authentication System for KOF '98 Coaching Lab
// Communicates with PHP / MySQL API with seamless fallback to localStorage

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

// Official Demo Student Account
export const DEMO_STUDENT_USER = {
  id: 'user_master98',
  gamertag: 'KOF_Master98',
  email: 'demo@kof98.com',
  password: 'kof98password',
  role: 'user',
  mainChar: 'iori',
  rank: 'Rank S (Alumno Élite)',
  joinedDate: '2026-01-15',
};

// Pre-seeded default users
const INITIAL_DEMO_USERS = [
  ADMIN_USER,
  DEMO_STUDENT_USER,
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

// Helper to make API calls to PHP backend
async function fetchAuthApi(action, method = 'GET', body = null) {
  try {
    const opts = {
      method,
      headers: { 'Content-Type': 'application/json' }
    };
    if (body) opts.body = JSON.stringify(body);
    const res = await fetch(`/api/auth.php?action=${action}`, opts);
    if (!res.ok) {
      const errData = await res.json().catch(() => null);
      if (errData && errData.error) {
        return { success: false, error: errData.error };
      }
      return null;
    }
    return await res.json();
  } catch (err) {
    return null;
  }
}

// Initialize storage and guarantee Admin and Demo Student (KOF_Master98) are always present
export function initAuthStorage() {
  if (typeof window === 'undefined') return;
  try {
    const existingRaw = localStorage.getItem(USERS_STORAGE_KEY);
    if (!existingRaw) {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(INITIAL_DEMO_USERS));
    } else {
      let users = JSON.parse(existingRaw);
      let modified = false;

      const hasAdmin = users.some(
        (u) => u.email.toLowerCase() === ADMIN_USER.email.toLowerCase() || u.id === ADMIN_USER.id
      );
      if (!hasAdmin) {
        users.unshift(ADMIN_USER);
        modified = true;
      }

      const hasDemoStudent = users.some(
        (u) =>
          u.email.toLowerCase() === DEMO_STUDENT_USER.email.toLowerCase() ||
          u.gamertag.toLowerCase() === DEMO_STUDENT_USER.gamertag.toLowerCase()
      );
      if (!hasDemoStudent) {
        users.push(DEMO_STUDENT_USER);
        modified = true;
      }

      if (modified) {
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
      }
    }
  } catch {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(INITIAL_DEMO_USERS));
  }
}

// Explicitly restore all default demonstration accounts
export async function restoreDefaultUsers() {
  const apiRes = await fetchAuthApi('restore_default_users', 'POST');
  if (apiRes && apiRes.success) {
    initAuthStorage();
    return { success: true, count: INITIAL_DEMO_USERS.length };
  }

  // Fallback to localStorage
  if (typeof window === 'undefined') return { success: false };
  try {
    const currentUsers = getLocalUsers();
    let countRestored = 0;

    INITIAL_DEMO_USERS.forEach((defaultUser) => {
      const exists = currentUsers.some(
        (u) =>
          u.id === defaultUser.id ||
          u.email.toLowerCase() === defaultUser.email.toLowerCase() ||
          u.gamertag.toLowerCase() === defaultUser.gamertag.toLowerCase()
      );
      if (!exists) {
        currentUsers.push(defaultUser);
        countRestored++;
      }
    });

    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(currentUsers));
    return { success: true, count: countRestored };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

// Get the currently authenticated user session (synchronous for initial React load)
export function getLoggedInUser() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(CURRENT_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function getLocalUsers() {
  try {
    initAuthStorage();
    const raw = localStorage.getItem(USERS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : INITIAL_DEMO_USERS;
  } catch {
    return INITIAL_DEMO_USERS;
  }
}

// Get all registered users (async with API + localStorage fallback)
export async function getRegisteredUsers() {
  const apiRes = await fetchAuthApi('users');
  if (apiRes && apiRes.success && Array.isArray(apiRes.users)) {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(apiRes.users));
    return apiRes.users;
  }
  return getLocalUsers();
}

// Login with email or gamertag + password
export async function login(identifier, password) {
  // 1. Try PHP / MySQL API
  const apiRes = await fetchAuthApi('login', 'POST', { identifier, password });
  if (apiRes) {
    if (apiRes.success && apiRes.user) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(apiRes.user));
      return { success: true, user: apiRes.user };
    }
    if (apiRes.error) {
      return { success: false, error: apiRes.error };
    }
  }

  // 2. Fallback to localStorage
  initAuthStorage();
  const users = getLocalUsers();
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

  const role = user.role || (user.email.toLowerCase() === ADMIN_USER.email.toLowerCase() ? 'admin' : 'user');

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
export async function register({ gamertag, email, password, mainChar }) {
  // 1. Try PHP / MySQL API
  const apiRes = await fetchAuthApi('register', 'POST', { gamertag, email, password, mainChar });
  if (apiRes) {
    if (apiRes.success && apiRes.user) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(apiRes.user));
      return { success: true, user: apiRes.user };
    }
    if (apiRes.error) {
      return { success: false, error: apiRes.error };
    }
  }

  // 2. Fallback to localStorage
  initAuthStorage();
  const users = getLocalUsers();
  const cleanGamertag = gamertag.trim();
  const cleanEmail = email.trim().toLowerCase();
  const cleanPass = password.trim();

  if (cleanGamertag.length < 3) {
    return { success: false, error: 'El Gamertag debe tener al menos 3 caracteres.' };
  }
  if (!cleanEmail.includes('@') || !cleanEmail.includes('.')) {
    return { success: false, error: 'Ingresa un correo electrónico válido.' };
  }
  if (cleanPass.length < 4) {
    return { success: false, error: 'La contraseña debe tener al menos 4 caracteres.' };
  }

  const existsGamertag = users.some((u) => u.gamertag.toLowerCase() === cleanGamertag.toLowerCase());
  if (existsGamertag) {
    return { success: false, error: `El Gamertag "${cleanGamertag}" ya está en uso.` };
  }

  const existsEmail = users.some((u) => u.email.toLowerCase() === cleanEmail);
  if (existsEmail) {
    return { success: false, error: `El correo "${cleanEmail}" ya está registrado.` };
  }

  const newUser = {
    id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
    gamertag: cleanGamertag,
    email: cleanEmail,
    password: cleanPass,
    role: 'user',
    mainChar: mainChar || 'iori',
    rank: 'Rank B',
    joinedDate: new Date().toISOString().split('T')[0],
  };

  users.push(newUser);
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));

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

// Logout currently authenticated user
export function logout() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(CURRENT_USER_KEY);
}

// Admin: Update user properties
export async function adminUpdateUser(userId, updatedFields) {
  const apiRes = await fetchAuthApi('update_user', 'POST', { id: userId, ...updatedFields });
  if (apiRes && apiRes.success) {
    return { success: true, user: apiRes.user };
  }

  // Fallback to localStorage
  initAuthStorage();
  const users = getLocalUsers();
  const idx = users.findIndex((u) => u.id === userId);
  if (idx === -1) {
    return { success: false, error: 'Usuario no encontrado.' };
  }

  const cleanGamertag = updatedFields.gamertag?.trim();
  const cleanEmail = updatedFields.email?.trim().toLowerCase();

  if (cleanGamertag) {
    const duplicate = users.some(
      (u) => u.id !== userId && u.gamertag.toLowerCase() === cleanGamertag.toLowerCase()
    );
    if (duplicate) {
      return { success: false, error: `El gamertag "${cleanGamertag}" ya está en uso por otra cuenta.` };
    }
  }

  if (cleanEmail) {
    const duplicate = users.some(
      (u) => u.id !== userId && u.email.toLowerCase() === cleanEmail
    );
    if (duplicate) {
      return { success: false, error: `El email "${cleanEmail}" ya pertenece a otra cuenta.` };
    }
  }

  users[idx] = {
    ...users[idx],
    ...updatedFields,
    gamertag: cleanGamertag || users[idx].gamertag,
    email: cleanEmail || users[idx].email,
  };

  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));

  const currentSession = getLoggedInUser();
  if (currentSession && currentSession.id === userId) {
    const updatedSession = {
      ...currentSession,
      gamertag: users[idx].gamertag,
      email: users[idx].email,
      rank: users[idx].rank,
      mainChar: users[idx].mainChar,
      role: users[idx].role,
    };
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedSession));
    return { success: true, user: updatedSession };
  }

  return { success: true, user: users[idx] };
}

// Admin: Delete a user
export async function adminDeleteUser(userId) {
  if (userId === ADMIN_USER.id) {
    return { success: false, error: 'No es posible eliminar la cuenta del Administrador Raíz.' };
  }

  const apiRes = await fetchAuthApi('delete_user', 'POST', { id: userId });
  if (apiRes && apiRes.success) {
    const users = getLocalUsers().filter((u) => u.id !== userId);
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    return { success: true };
  }

  // Fallback to localStorage
  initAuthStorage();
  const users = getLocalUsers();
  const user = users.find((u) => u.id === userId);
  if (!user) {
    return { success: false, error: 'Usuario no encontrado.' };
  }

  const updatedUsers = users.filter((u) => u.id !== userId);
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
  return { success: true };
}

// Admin: Create an arbitrary user
export async function adminCreateUser({ gamertag, email, password, mainChar, rank, role }) {
  const apiRes = await fetchAuthApi('create_user', 'POST', { gamertag, email, password, mainChar, rank, role });
  if (apiRes && apiRes.success) {
    return { success: true, user: apiRes.user };
  }

  // Fallback to localStorage
  initAuthStorage();
  const users = getLocalUsers();
  const cleanGamertag = gamertag.trim();
  const cleanEmail = email.trim().toLowerCase();
  const cleanPass = password.trim();

  if (cleanGamertag.length < 3) {
    return { success: false, error: 'El Gamertag debe tener al menos 3 caracteres.' };
  }
  if (!cleanEmail.includes('@') || !cleanEmail.includes('.')) {
    return { success: false, error: 'Ingresa un correo electrónico válido.' };
  }
  if (cleanPass.length < 4) {
    return { success: false, error: 'La contraseña debe tener al menos 4 caracteres.' };
  }

  const existsGamertag = users.some((u) => u.gamertag.toLowerCase() === cleanGamertag.toLowerCase());
  if (existsGamertag) {
    return { success: false, error: `El Gamertag "${cleanGamertag}" ya está en uso.` };
  }

  const existsEmail = users.some((u) => u.email.toLowerCase() === cleanEmail);
  if (existsEmail) {
    return { success: false, error: `El correo "${cleanEmail}" ya está registrado.` };
  }

  const newUser = {
    id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
    gamertag: cleanGamertag,
    email: cleanEmail,
    password: cleanPass,
    role: role || 'user',
    mainChar: mainChar || 'iori',
    rank: rank || 'Rank B',
    joinedDate: new Date().toISOString().split('T')[0],
  };

  users.push(newUser);
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));

  return { success: true, user: newUser };
}

// Admin: Reset password
export async function adminResetPassword(userId, newPassword) {
  const apiRes = await fetchAuthApi('reset_password', 'POST', { id: userId, newPassword });
  if (apiRes && apiRes.success) {
    return { success: true };
  }

  // Fallback to localStorage
  initAuthStorage();
  const users = getLocalUsers();
  const idx = users.findIndex((u) => u.id === userId);
  if (idx === -1) {
    return { success: false, error: 'Usuario no encontrado.' };
  }

  const cleanPass = newPassword.trim();
  if (cleanPass.length < 4) {
    return { success: false, error: 'La nueva contraseña debe tener al menos 4 caracteres.' };
  }

  users[idx].password = cleanPass;
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));

  return { success: true };
}

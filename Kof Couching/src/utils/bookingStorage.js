// Sistema de Gestión y Persistencia de Solicitudes de Clases (KOF '98 Coaching Lab)
// Almacena en PHP/MySQL con sincronización y fallback automático en localStorage

const BOOKINGS_STORAGE_KEY = 'kof98_class_bookings';

const INITIAL_DEMO_BOOKINGS = [
  {
    id: 'booking_demo_1',
    userId: 'user_master98',
    userGamertag: 'KOF_Master98',
    userEmail: 'demo@kof98.com',
    userRank: 'Rank S (Alumno Élite)',
    userMainChar: 'iori',
    name: 'KOF_Master98',
    discord: 'Master98#4582',
    platform: 'Fightcade 2',
    level: 'Avanzado (Rank A/S)',
    plan: {
      id: 'mastery',
      name: 'Matchup Mastery & Sparring Lab',
      price: '$85 USD',
      duration: '4 Sesiones (1 mes)',
      tag: 'MÁS POPULAR • 4 SESIONES',
      badgeColor: '#ff2e43'
    },
    team: 'Iori • Orochi Chris • Daimon',
    goals: 'Perfeccionar el neutral contra Daimons defensivos y optimizar las confirmaciones de 1-hit con Iori en situaciones de presión de esquina.',
    status: 'in_progress',
    requestedAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString()
  },
  {
    id: 'booking_demo_2',
    userId: 'user_daimon_cl',
    userGamertag: 'DaimonMaster_CL',
    userEmail: 'daimon@kof98.com',
    userRank: 'Rank A',
    userMainChar: 'daimon',
    name: 'DaimonMaster_CL',
    discord: 'daimon_cl_oficial',
    platform: 'Fightcade 2',
    level: 'Intermedio (Rank C/B)',
    plan: {
      id: 'bootcamp',
      name: 'Pro Tournament Boot Camp',
      price: '$160 USD',
      duration: '8 Sesiones + Acompañamiento',
      tag: 'COMPETITIVO TOTAL',
      badgeColor: '#f59e0b'
    },
    team: 'Daimon • O. Yashiro • Ralf',
    goals: 'Aprender la ejecución consistente del Roll Cancel Bug de Daimon y cómo safear saltos contra zoneo pesado de Athena y Chris.',
    status: 'pending',
    requestedAt: new Date(Date.now() - 1000 * 60 * 60 * 22).toISOString()
  }
];

async function fetchBookingApi(action, method = 'GET', body = null) {
  try {
    const opts = {
      method,
      headers: { 'Content-Type': 'application/json' }
    };
    if (body) opts.body = JSON.stringify(body);
    const res = await fetch(`/api/bookings.php?action=${action}`, opts);
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    return null;
  }
}

export function initBookingsStorage() {
  if (typeof window === 'undefined') return;
  const existing = localStorage.getItem(BOOKINGS_STORAGE_KEY);
  if (!existing) {
    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(INITIAL_DEMO_BOOKINGS));
  }
}

function getLocalBookings() {
  try {
    initBookingsStorage();
    const raw = localStorage.getItem(BOOKINGS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : INITIAL_DEMO_BOOKINGS;
  } catch {
    return INITIAL_DEMO_BOOKINGS;
  }
}

export async function getBookingRequests() {
  const apiRes = await fetchBookingApi('list');
  if (apiRes && apiRes.success && Array.isArray(apiRes.bookings)) {
    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(apiRes.bookings));
    return apiRes.bookings;
  }
  return getLocalBookings();
}

export async function saveBookingRequest(bookingData) {
  const newEntry = {
    id: bookingData.id || `booking_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    status: bookingData.status || 'pending',
    requestedAt: bookingData.requestedAt || new Date().toISOString(),
    ...bookingData
  };

  const apiRes = await fetchBookingApi('create', 'POST', newEntry);
  if (apiRes && apiRes.success) {
    const local = getLocalBookings();
    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify([apiRes.booking || newEntry, ...local]));
    return { success: true, booking: apiRes.booking || newEntry };
  }

  // Fallback to localStorage
  try {
    const currentList = getLocalBookings();
    const updated = [newEntry, ...currentList];
    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(updated));
    return { success: true, booking: newEntry };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

export async function updateBookingStatus(bookingId, newStatus) {
  const apiRes = await fetchBookingApi('update_status', 'POST', { id: bookingId, status: newStatus });
  if (apiRes && apiRes.success) {
    const list = getLocalBookings();
    const idx = list.findIndex(b => b.id === bookingId);
    if (idx !== -1) {
      list[idx].status = newStatus;
      localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(list));
    }
    return { success: true };
  }

  // Fallback
  try {
    const currentList = getLocalBookings();
    const idx = currentList.findIndex(b => b.id === bookingId);
    if (idx === -1) return { success: false, error: 'Solicitud no encontrada' };
    currentList[idx].status = newStatus;
    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(currentList));
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

export async function deleteBookingRequest(bookingId) {
  const apiRes = await fetchBookingApi('delete', 'POST', { id: bookingId });
  if (apiRes && apiRes.success) {
    const list = getLocalBookings().filter(b => b.id !== bookingId);
    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(list));
    return { success: true };
  }

  // Fallback
  try {
    const currentList = getLocalBookings();
    const filtered = currentList.filter(b => b.id !== bookingId);
    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(filtered));
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

export async function restoreDefaultBookings() {
  const apiRes = await fetchBookingApi('restore_default_bookings', 'POST');
  if (apiRes && apiRes.success) {
    return { success: true, count: INITIAL_DEMO_BOOKINGS.length };
  }

  // Fallback
  try {
    const currentList = getLocalBookings();
    const missing = INITIAL_DEMO_BOOKINGS.filter(d => !currentList.some(b => b.id === d.id));
    const updated = [...missing, ...currentList];
    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(updated));
    return { success: true, count: missing.length };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

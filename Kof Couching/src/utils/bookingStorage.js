// Sistema de Gestión y Persistencia de Solicitudes de Clases (KOF '98 Coaching Lab)
// Almacena en localStorage las reservas vinculando al usuario registrado y el plan solicitado.

const BOOKINGS_STORAGE_KEY = 'kof98_class_bookings';

// Solicitudes iniciales de demostración
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
    status: 'in_progress', // 'pending' | 'in_progress' | 'completed' | 'cancelled'
    requestedAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString() // hace 6 horas
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
    requestedAt: new Date(Date.now() - 1000 * 60 * 60 * 22).toISOString() // hace 22 horas
  },
  {
    id: 'booking_demo_3',
    userId: 'user_guest_99',
    userGamertag: 'TerryBuster_ARG',
    userEmail: 'terry.arg@gmail.com',
    userRank: 'Rank C',
    userMainChar: 'terry',
    name: 'TerryBuster_ARG',
    discord: '+5491145892301',
    platform: 'Steam KOF 98 UM FE',
    level: 'Principiante / Intermedio',
    plan: {
      id: 'diagnostic',
      name: 'VOD Review & Diagnóstico Táctico',
      price: '$25 USD',
      duration: '75 Minutos',
      tag: '1 SESIÓN INTENSIVA',
      badgeColor: '#38bdf8'
    },
    team: 'Terry • Mary • Kyo',
    goals: 'Tengo muchas dudas sobre por qué me castigan tanto al saltar con Terry. Quiero que revisen mis replays para corregir vicios de salto.',
    status: 'pending',
    requestedAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString() // hace 2 días
  }
];

export function initBookingsStorage() {
  if (typeof window === 'undefined') return;
  const existing = localStorage.getItem(BOOKINGS_STORAGE_KEY);
  if (!existing) {
    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(INITIAL_DEMO_BOOKINGS));
  }
}

export function getBookingRequests() {
  if (typeof window === 'undefined') return INITIAL_DEMO_BOOKINGS;
  try {
    const raw = localStorage.getItem(BOOKINGS_STORAGE_KEY);
    if (!raw) {
      initBookingsStorage();
      return INITIAL_DEMO_BOOKINGS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : INITIAL_DEMO_BOOKINGS;
  } catch (err) {
    console.error('Error reading bookings from localStorage:', err);
    return INITIAL_DEMO_BOOKINGS;
  }
}

export function saveBookingRequest(bookingData) {
  if (typeof window === 'undefined') return { success: false, error: 'No storage available' };
  try {
    const currentList = getBookingRequests();
    const newEntry = {
      id: bookingData.id || `booking_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      status: bookingData.status || 'pending',
      requestedAt: bookingData.requestedAt || new Date().toISOString(),
      ...bookingData
    };

    const updated = [newEntry, ...currentList];
    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(updated));
    return { success: true, booking: newEntry };
  } catch (err) {
    console.error('Error saving booking to localStorage:', err);
    return { success: false, error: err.message };
  }
}

export function updateBookingStatus(bookingId, newStatus) {
  if (typeof window === 'undefined') return { success: false, error: 'No storage available' };
  try {
    const currentList = getBookingRequests();
    const idx = currentList.findIndex(b => b.id === bookingId);
    if (idx === -1) {
      return { success: false, error: 'Solicitud no encontrada' };
    }

    currentList[idx] = {
      ...currentList[idx],
      status: newStatus,
      updatedAt: new Date().toISOString()
    };

    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(currentList));
    return { success: true, booking: currentList[idx] };
  } catch (err) {
    console.error('Error updating booking status:', err);
    return { success: false, error: err.message };
  }
}

export function deleteBookingRequest(bookingId) {
  if (typeof window === 'undefined') return { success: false, error: 'No storage available' };
  try {
    const currentList = getBookingRequests();
    const filtered = currentList.filter(b => b.id !== bookingId);
    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(filtered));
    return { success: true };
  } catch (err) {
    console.error('Error deleting booking:', err);
    return { success: false, error: err.message };
  }
}

export function restoreDefaultBookings() {
  if (typeof window === 'undefined') return { success: false, count: 0 };
  try {
    const currentList = getBookingRequests();
    const missing = INITIAL_DEMO_BOOKINGS.filter(
      demo => !currentList.some(b => b.id === demo.id)
    );
    const updated = [...missing, ...currentList];
    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(updated));
    return { success: true, count: missing.length };
  } catch (err) {
    return { success: false, error: err.message };
  }
}


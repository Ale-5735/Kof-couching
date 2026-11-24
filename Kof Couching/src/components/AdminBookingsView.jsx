import React, { useState, useEffect, useMemo } from 'react';
import {
  Calendar,
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  Copy,
  Check,
  Trash2,
  Trophy,
  Gamepad2,
  User,
  RotateCcw,
  Sparkles,
  ExternalLink,
  Flame,
  ShieldAlert,
  ChevronRight,
  Send
} from 'lucide-react';
import {
  getBookingRequests,
  updateBookingStatus,
  deleteBookingRequest,
  restoreDefaultBookings
} from '../utils/bookingStorage';
import { CHARACTER_IMAGES } from '../assets/characterImages';
import { CHARACTERS } from '../data/characters';
import { arcadeAudio } from '../utils/audio';

export function AdminBookingsView({ showToast }) {
  const [bookings, setBookings] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL'); // 'ALL' | 'pending' | 'in_progress' | 'completed' | 'cancelled'
  const [planFilter, setPlanFilter] = useState('ALL');
  const [copiedId, setCopiedId] = useState(null);
  const [deleteConfirmBooking, setDeleteConfirmBooking] = useState(null);

  const refreshList = () => {
    setBookings(getBookingRequests());
  };

  useEffect(() => {
    refreshList();
  }, []);

  // Format date relative or full
  const formatDate = (isoString) => {
    if (!isoString) return 'Fecha desconocida';
    try {
      const date = new Date(isoString);
      const diffMs = Date.now() - date.getTime();
      const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
      const diffDays = Math.floor(diffHrs / 24);

      if (diffHrs < 1) {
        const diffMins = Math.max(1, Math.floor(diffMs / (1000 * 60)));
        return `Hace ${diffMins} min`;
      }
      if (diffHrs < 24) return `Hace ${diffHrs} horas`;
      if (diffDays === 1) return `Ayer a las ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
      return `${date.toLocaleDateString([], { day: '2-digit', month: '2-digit', year: 'numeric' })} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } catch {
      return isoString;
    }
  };

  // Metrics
  const totalCount = bookings.length;
  const pendingCount = bookings.filter((b) => b.status === 'pending').length;
  const inProgressCount = bookings.filter((b) => b.status === 'in_progress').length;
  const completedCount = bookings.filter((b) => b.status === 'completed').length;

  // Most requested plan
  const planCounts = bookings.reduce((acc, b) => {
    const name = b.plan?.name || 'Otro';
    acc[name] = (acc[name] || 0) + 1;
    return acc;
  }, {});
  const topPlanName = Object.keys(planCounts).sort((a, b) => planCounts[b] - planCounts[a])[0] || 'Ninguno';

  // Available unique plans for filter
  const uniquePlans = useMemo(() => {
    const map = new Map();
    bookings.forEach((b) => {
      if (b.plan?.id && b.plan?.name) {
        map.set(b.plan.id, b.plan.name);
      }
    });
    return Array.from(map.entries()).map(([id, name]) => ({ id, name }));
  }, [bookings]);

  // Filtered list
  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        b.userGamertag?.toLowerCase().includes(q) ||
        b.userEmail?.toLowerCase().includes(q) ||
        b.name?.toLowerCase().includes(q) ||
        b.discord?.toLowerCase().includes(q) ||
        b.platform?.toLowerCase().includes(q) ||
        b.team?.toLowerCase().includes(q) ||
        b.goals?.toLowerCase().includes(q) ||
        b.plan?.name?.toLowerCase().includes(q);

      const matchesStatus = statusFilter === 'ALL' || b.status === statusFilter;
      const matchesPlan = planFilter === 'ALL' || b.plan?.id === planFilter;

      return matchesSearch && matchesStatus && matchesPlan;
    });
  }, [bookings, searchQuery, statusFilter, planFilter]);

  // Actions
  const handleStatusChange = (bookingId, newStatus) => {
    arcadeAudio.playCoin();
    const res = updateBookingStatus(bookingId, newStatus);
    if (res.success) {
      refreshList();
      const statusLabels = {
        pending: 'Pendiente',
        in_progress: 'En Coordinación',
        completed: 'Completada',
        cancelled: 'Cancelada'
      };
      showToast(`Estado actualizado a "${statusLabels[newStatus] || newStatus}"`);
    } else {
      showToast(res.error, true);
    }
  };

  const handleCopyContact = (id, text) => {
    arcadeAudio.playHover();
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    showToast(`Contacto copiado: "${text}"`);
    setTimeout(() => {
      setCopiedId(null);
    }, 2500);
  };

  const handleConfirmDelete = () => {
    if (!deleteConfirmBooking) return;
    arcadeAudio.playDeselect();
    const res = deleteBookingRequest(deleteConfirmBooking.id);
    if (res.success) {
      showToast(`Solicitud de ${deleteConfirmBooking.userGamertag || deleteConfirmBooking.name} eliminada.`);
      refreshList();
      setDeleteConfirmBooking(null);
    } else {
      showToast(res.error, true);
    }
  };

  const handleRestoreDemos = () => {
    arcadeAudio.playFight();
    const res = restoreDefaultBookings();
    if (res.success) {
      refreshList();
      showToast(
        res.count > 0
          ? `Se restauraron ${res.count} solicitudes de demostración.`
          : 'Todas las solicitudes demo ya están presentes.'
      );
    }
  };

  return (
    <div>
      {/* Quick Stats Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '1.5rem',
        }}
      >
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '8px',
            padding: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <Calendar size={28} color="#38bdf8" />
          <div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase' }}>
              Total Solicitudes
            </div>
            <div className="font-neogeo" style={{ fontSize: '1.9rem', color: '#fff', lineHeight: 1 }}>
              {totalCount}
            </div>
          </div>
        </div>

        <div
          style={{
            background: pendingCount > 0 ? 'rgba(255, 46, 67, 0.12)' : 'rgba(255, 255, 255, 0.03)',
            border: pendingCount > 0 ? '1px solid rgba(255, 46, 67, 0.4)' : '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '8px',
            padding: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <Clock size={28} color={pendingCount > 0 ? '#ff2e43' : '#94a3b8'} />
          <div>
            <div style={{ fontSize: '0.75rem', color: pendingCount > 0 ? '#f87171' : '#94a3b8', textTransform: 'uppercase' }}>
              Pendientes de Contacto
            </div>
            <div className="font-neogeo" style={{ fontSize: '1.9rem', color: pendingCount > 0 ? '#ff2e43' : '#cbd5e1', lineHeight: 1 }}>
              {pendingCount}
            </div>
          </div>
        </div>

        <div
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(0, 240, 255, 0.25)',
            borderRadius: '8px',
            padding: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <Gamepad2 size={28} color="#00f0ff" />
          <div>
            <div style={{ fontSize: '0.75rem', color: '#00f0ff', textTransform: 'uppercase' }}>
              En Coordinación / Sparring
            </div>
            <div className="font-neogeo" style={{ fontSize: '1.9rem', color: '#00f0ff', lineHeight: 1 }}>
              {inProgressCount}
            </div>
          </div>
        </div>

        <div
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(16, 185, 129, 0.25)',
            borderRadius: '8px',
            padding: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <CheckCircle2 size={28} color="#10b981" />
          <div>
            <div style={{ fontSize: '0.75rem', color: '#34d399', textTransform: 'uppercase' }}>
              Clases Completadas
            </div>
            <div className="font-neogeo" style={{ fontSize: '1.9rem', color: '#34d399', lineHeight: 1 }}>
              {completedCount}
            </div>
          </div>
        </div>
      </div>

      {/* Action & Filter Bar */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.75rem',
          marginBottom: '1.25rem',
          paddingBottom: '1rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.6rem', flex: '1 1 auto' }}>
          {/* Search Box */}
          <div style={{ position: 'relative', minWidth: '240px', flex: '1 1 auto', maxWidth: '320px' }}>
            <Search size={15} color="#94a3b8" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Buscar por alumno, correo, Discord..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(0, 0, 0, 0.5)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '6px',
                padding: '0.5rem 0.75rem 0.5rem 2.2rem',
                color: '#fff',
                fontSize: '0.82rem',
                outline: 'none',
              }}
            />
          </div>

          {/* Status Filter Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
            {[
              { id: 'ALL', label: 'Todas' },
              { id: 'pending', label: 'Pendientes' },
              { id: 'in_progress', label: 'En Proceso' },
              { id: 'completed', label: 'Completadas' },
              { id: 'cancelled', label: 'Canceladas' }
            ].map((tab) => {
              const isActive = statusFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    arcadeAudio.playHover();
                    setStatusFilter(tab.id);
                  }}
                  style={{
                    background: isActive ? 'rgba(255, 46, 67, 0.25)' : 'rgba(255, 255, 255, 0.04)',
                    border: isActive ? '1px solid #ff2e43' : '1px solid rgba(255, 255, 255, 0.1)',
                    color: isActive ? '#fff' : '#94a3b8',
                    borderRadius: '5px',
                    padding: '0.4rem 0.75rem',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Plan Dropdown Filter */}
          {uniquePlans.length > 0 && (
            <select
              value={planFilter}
              onChange={(e) => setPlanFilter(e.target.value)}
              style={{
                background: 'rgba(0, 0, 0, 0.5)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '6px',
                padding: '0.45rem 0.7rem',
                color: '#cbd5e1',
                fontSize: '0.78rem',
                cursor: 'pointer',
              }}
            >
              <option value="ALL">Todos los planes</option>
              {uniquePlans.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Restore Demo Bookings Button */}
        <button
          type="button"
          onClick={handleRestoreDemos}
          className="btn-ghost"
          style={{
            fontSize: '0.75rem',
            padding: '0.45rem 0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            color: '#fbbf24',
            borderColor: 'rgba(245, 158, 11, 0.3)',
          }}
          title="Restaura solicitudes de prueba si fueron borradas"
        >
          <RotateCcw size={13} />
          <span>Restaurar Solicitudes Demo</span>
        </button>
      </div>

      {/* Bookings List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filteredBookings.map((b) => {
          const mainCharId = b.userMainChar || 'iori';
          const mainChar = CHARACTERS.find((c) => c.id === mainCharId);
          const isCopied = copiedId === b.id;

          const statusBadge = {
            pending: { label: 'PENDIENTE', color: '#ff2e43', bg: 'rgba(255, 46, 67, 0.15)', border: 'rgba(255, 46, 67, 0.4)' },
            in_progress: { label: 'EN COORDINACIÓN', color: '#00f0ff', bg: 'rgba(0, 240, 255, 0.15)', border: 'rgba(0, 240, 255, 0.4)' },
            completed: { label: 'COMPLETADA', color: '#10b981', bg: 'rgba(16, 185, 129, 0.15)', border: 'rgba(16, 185, 129, 0.4)' },
            cancelled: { label: 'CANCELADA', color: '#94a3b8', bg: 'rgba(148, 163, 184, 0.1)', border: 'rgba(148, 163, 184, 0.3)' }
          }[b.status] || { label: b.status, color: '#fff', bg: 'rgba(255,255,255,0.1)', border: 'rgba(255,255,255,0.2)' };

          return (
            <div
              key={b.id}
              style={{
                background: 'rgba(0, 0, 0, 0.55)',
                border: b.status === 'pending' ? '1px solid rgba(255, 46, 67, 0.35)' : '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '8px',
                padding: '1.25rem',
                boxShadow: b.status === 'pending' ? '0 0 15px rgba(255, 46, 67, 0.15)' : 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                transition: 'all 0.2s ease',
              }}
            >
              {/* Header: Student Account info + Date + Status Badge */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  gap: '0.75rem',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                  paddingBottom: '0.85rem',
                }}
              >
                {/* Registered User Profile */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                      flexShrink: 0,
                    }}
                  >
                    <img
                      src={CHARACTER_IMAGES[mainCharId] || CHARACTER_IMAGES.iori}
                      alt={mainChar?.name || 'Main'}
                      style={{ width: '36px', height: '36px', objectFit: 'contain', imageRendering: 'pixelated' }}
                    />
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <span className="font-tech" style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 700 }}>
                        {b.userGamertag || b.name}
                      </span>
                      <span className="badge-cyan" style={{ fontSize: '0.68rem', padding: '0.1rem 0.4rem' }}>
                        {b.userRank || 'Alumno'}
                      </span>
                      {b.userId && b.userId !== 'guest' && (
                        <span style={{ fontSize: '0.68rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                          <CheckCircle2 size={12} /> Cuenta Registrada
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                      Email: <span style={{ color: '#cbd5e1' }}>{b.userEmail}</span> • Nombre en solicitud: <strong style={{ color: '#e2e8f0' }}>{b.name}</strong>
                    </div>
                  </div>
                </div>

                {/* Right: Date and Status pill */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ textAlign: 'right', fontSize: '0.75rem', color: '#94a3b8' }}>
                    <div style={{ color: '#cbd5e1', fontWeight: 600 }}>{formatDate(b.requestedAt)}</div>
                    <div>ID: {b.id.substring(0, 14)}</div>
                  </div>
                  <span
                    style={{
                      background: statusBadge.bg,
                      border: `1px solid ${statusBadge.border}`,
                      color: statusBadge.color,
                      borderRadius: '5px',
                      padding: '0.3rem 0.65rem',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      letterSpacing: '0.04em',
                    }}
                  >
                    {statusBadge.label}
                  </span>
                </div>
              </div>

              {/* Middle: Plan Requested Banner + Specs */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '1rem',
                }}
              >
                {/* Plan Requested Card */}
                <div
                  style={{
                    background: 'linear-gradient(135deg, rgba(20, 25, 46, 0.8) 0%, rgba(10, 12, 20, 0.9) 100%)',
                    border: `1px solid ${b.plan?.badgeColor ? `${b.plan.badgeColor}55` : 'rgba(255, 46, 67, 0.3)'}`,
                    borderRadius: '6px',
                    padding: '0.9rem 1rem',
                    position: 'relative',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                    <span
                      style={{
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        color: b.plan?.badgeColor || '#fbbf24',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {b.plan?.tag || 'PROGRAMA SELECCIONADO'}
                    </span>
                    <span className="font-neogeo" style={{ fontSize: '1.35rem', color: '#10b981', lineHeight: 1 }}>
                      {b.plan?.price || '$-- USD'}
                    </span>
                  </div>
                  <h4 className="font-tech" style={{ color: '#fff', fontSize: '1.05rem', margin: '0 0 0.25rem 0' }}>
                    {b.plan?.name || 'Clase Personalizada'}
                  </h4>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                    Modalidad: <strong style={{ color: '#cbd5e1' }}>{b.plan?.duration || '1 Sesión'}</strong>
                  </div>
                </div>

                {/* Combat & Contact Info */}
                <div
                  style={{
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    borderRadius: '6px',
                    padding: '0.85rem 1rem',
                    fontSize: '0.8rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.4rem',
                    justifyContent: 'center',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ color: '#94a3b8' }}>Discord / Contacto:</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <strong style={{ color: '#00f0ff' }}>{b.discord}</strong>
                      <button
                        type="button"
                        onClick={() => handleCopyContact(b.id, b.discord)}
                        style={{
                          background: isCopied ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.08)',
                          border: isCopied ? '1px solid #10b981' : '1px solid rgba(255, 255, 255, 0.15)',
                          color: isCopied ? '#34d399' : '#cbd5e1',
                          borderRadius: '4px',
                          padding: '0.15rem 0.45rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.2rem',
                          fontSize: '0.7rem',
                        }}
                        title="Copiar contacto al portapapeles"
                      >
                        {isCopied ? <Check size={11} /> : <Copy size={11} />}
                        <span>{isCopied ? 'Copiado' : 'Copiar'}</span>
                      </button>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ color: '#94a3b8' }}>Plataforma:</span>
                    <strong style={{ color: '#fff' }}>{b.platform}</strong>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ color: '#94a3b8' }}>Equipo (Trio):</span>
                    <span style={{ color: '#fbbf24', fontWeight: 600 }}>{b.team}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ color: '#94a3b8' }}>Nivel del Alumno:</span>
                    <span style={{ color: '#cbd5e1' }}>{b.level}</span>
                  </div>
                </div>
              </div>

              {/* Student Goals / Difficulties */}
              {b.goals && (
                <div
                  style={{
                    background: 'rgba(2, 4, 10, 0.75)',
                    borderLeft: '3px solid #f59e0b',
                    padding: '0.65rem 0.9rem',
                    borderRadius: '0 6px 6px 0',
                    fontSize: '0.8rem',
                    color: '#fed7aa',
                    lineHeight: 1.5,
                  }}
                >
                  <strong style={{ color: '#fbbf24', fontSize: '0.72rem', display: 'block', marginBottom: '0.2rem', letterSpacing: '0.04em' }}>
                    🎯 METAS O DIFICULTADES DECLARADAS POR EL ALUMNO:
                  </strong>
                  "{b.goals}"
                </div>
              )}

              {/* Bottom Actions Bar */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '0.75rem',
                  paddingTop: '0.5rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                }}
              >
                {/* Status Switcher */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Cambiar Estado:</span>
                  {b.status !== 'in_progress' && (
                    <button
                      type="button"
                      onClick={() => handleStatusChange(b.id, 'in_progress')}
                      style={{
                        background: 'rgba(0, 240, 255, 0.1)',
                        border: '1px solid rgba(0, 240, 255, 0.3)',
                        color: '#00f0ff',
                        borderRadius: '4px',
                        padding: '0.25rem 0.6rem',
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      ▶ Iniciar Coordinación
                    </button>
                  )}

                  {b.status !== 'completed' && (
                    <button
                      type="button"
                      onClick={() => handleStatusChange(b.id, 'completed')}
                      style={{
                        background: 'rgba(16, 185, 129, 0.1)',
                        border: '1px solid rgba(16, 185, 129, 0.3)',
                        color: '#34d399',
                        borderRadius: '4px',
                        padding: '0.25rem 0.6rem',
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      ✓ Marcar Completada
                    </button>
                  )}

                  {b.status !== 'pending' && (
                    <button
                      type="button"
                      onClick={() => handleStatusChange(b.id, 'pending')}
                      style={{
                        background: 'rgba(245, 158, 11, 0.1)',
                        border: '1px solid rgba(245, 158, 11, 0.3)',
                        color: '#fbbf24',
                        borderRadius: '4px',
                        padding: '0.25rem 0.6rem',
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      ↺ Volver a Pendiente
                    </button>
                  )}

                  {b.status !== 'cancelled' && (
                    <button
                      type="button"
                      onClick={() => handleStatusChange(b.id, 'cancelled')}
                      style={{
                        background: 'rgba(148, 163, 184, 0.08)',
                        border: '1px solid rgba(148, 163, 184, 0.2)',
                        color: '#94a3b8',
                        borderRadius: '4px',
                        padding: '0.25rem 0.6rem',
                        fontSize: '0.72rem',
                        cursor: 'pointer',
                      }}
                    >
                      ✕ Cancelar
                    </button>
                  )}
                </div>

                {/* Delete Booking Button */}
                <button
                  type="button"
                  onClick={() => setDeleteConfirmBooking(b)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#f87171',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    fontSize: '0.72rem',
                    padding: '0.25rem 0.5rem',
                  }}
                  title="Eliminar esta solicitud"
                >
                  <Trash2 size={13} />
                  <span>Eliminar Registro</span>
                </button>
              </div>
            </div>
          );
        })}

        {filteredBookings.length === 0 && (
          <div
            style={{
              textAlign: 'center',
              padding: '3rem 1.5rem',
              background: 'rgba(0, 0, 0, 0.3)',
              borderRadius: '8px',
              border: '1px dashed rgba(255, 255, 255, 0.1)',
            }}
          >
            <Calendar size={36} color="#94a3b8" style={{ margin: '0 auto 0.75rem auto', opacity: 0.5 }} />
            <h4 className="font-tech" style={{ color: '#cbd5e1', fontSize: '1.1rem', marginBottom: '0.35rem' }}>
              No se encontraron solicitudes de clases
            </h4>
            <p style={{ color: '#94a3b8', fontSize: '0.82rem', marginBottom: '1.25rem' }}>
              {searchQuery || statusFilter !== 'ALL' || planFilter !== 'ALL'
                ? 'Prueba modificando tus filtros o término de búsqueda.'
                : 'Aún no hay reservas registradas por los alumnos.'}
            </p>
            <button
              type="button"
              onClick={handleRestoreDemos}
              className="btn-advanced"
              style={{ padding: '0.5rem 1.25rem', fontSize: '0.9rem' }}
            >
              <span>Cargar Solicitudes de Ejemplo</span>
            </button>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal for Booking */}
      {deleteConfirmBooking && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 600,
            background: 'rgba(0, 0, 0, 0.88)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
          }}
        >
          <div
            className="glass-panel"
            style={{
              width: '100%',
              maxWidth: '440px',
              padding: '1.75rem',
              border: '2px solid rgba(239, 68, 68, 0.6)',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: 'rgba(239, 68, 68, 0.15)',
                border: '2px solid #ef4444',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem auto',
              }}
            >
              <Trash2 size={28} color="#ef4444" />
            </div>

            <h3 className="font-neogeo" style={{ fontSize: '1.6rem', color: '#fff', marginBottom: '0.5rem' }}>
              ¿ELIMINAR ESTA SOLICITUD?
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.5, marginBottom: '1.5rem' }}>
              Estás a punto de borrar la solicitud de clase de{' '}
              <strong style={{ color: '#f87171' }}>{deleteConfirmBooking.userGamertag || deleteConfirmBooking.name}</strong> para el programa{' '}
              <strong>{deleteConfirmBooking.plan?.name}</strong> ({deleteConfirmBooking.plan?.price}).
            </p>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                type="button"
                onClick={() => setDeleteConfirmBooking(null)}
                className="btn-ghost"
                style={{ flex: 1, padding: '0.6rem' }}
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                style={{
                  flex: 1,
                  background: '#ef4444',
                  border: '1px solid #b91c1c',
                  color: '#fff',
                  borderRadius: '6px',
                  fontFamily: 'var(--font-neogeo)',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Sí, Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


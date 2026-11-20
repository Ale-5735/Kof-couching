import React, { useState, useEffect } from 'react';
import {
  X,
  ShieldAlert,
  ShieldCheck,
  UserCheck,
  UserX,
  Search,
  Plus,
  Edit2,
  Trash2,
  Key,
  Users,
  Award,
  Crown,
  Check,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Lock,
} from 'lucide-react';
import {
  getRegisteredUsers,
  adminUpdateUser,
  adminDeleteUser,
  adminCreateUser,
  adminResetPassword,
  restoreDefaultUsers,
  ADMIN_USER,
  DEMO_STUDENT_USER,
} from '../utils/auth';
import { CHARACTERS } from '../data/characters';
import { CHARACTER_IMAGES } from '../assets/characterImages';
import { arcadeAudio } from '../utils/audio';

export function AdminPanelModal({ isOpen, onClose, currentUser, onSessionUpdated }) {
  if (!isOpen || currentUser?.role !== 'admin') return null;

  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL'); // 'ALL' | 'admin' | 'user'
  const [toast, setToast] = useState(null);

  // Modal Sub-states
  const [editingUser, setEditingUser] = useState(null);
  const [passwordModalUser, setPasswordModalUser] = useState(null);
  const [newPasswordVal, setNewPasswordVal] = useState('');
  const [deleteConfirmUser, setDeleteConfirmUser] = useState(null);
  const [isCreatingUser, setIsCreatingUser] = useState(false);

  // New user form state
  const [newUserData, setNewUserData] = useState({
    gamertag: '',
    email: '',
    password: '',
    mainChar: 'iori',
    rank: 'Rank B',
    role: 'user',
  });

  const [formError, setFormError] = useState(null);

  // Load all users
  const refreshUsersList = () => {
    const list = getRegisteredUsers();
    setUsers(list);
  };

  useEffect(() => {
    refreshUsersList();
  }, [isOpen]);

  const showToast = (msg, isError = false) => {
    setToast({ msg, isError });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Restore Default Demo Users (e.g. KOF_Master98)
  const handleRestoreDemoUsers = () => {
    arcadeAudio.playFight();
    const res = restoreDefaultUsers();
    if (res.success) {
      refreshUsersList();
      showToast(
        res.count > 0
          ? `¡Se restauraron ${res.count} cuentas demo (KOF_Master98 incluido)!`
          : 'Todas las cuentas demo ya están presentes en la lista.'
      );
    }
  };

  // Filtered users
  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.gamertag.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole =
      roleFilter === 'ALL' || (roleFilter === 'admin' ? u.role === 'admin' : u.role !== 'admin');
    return matchesSearch && matchesRole;
  });

  // Metrics
  const totalCount = users.length;
  const adminCount = users.filter((u) => u.role === 'admin').length;
  const studentCount = totalCount - adminCount;

  // Most popular main
  const mainCounts = users.reduce((acc, u) => {
    const char = u.mainChar || 'iori';
    acc[char] = (acc[char] || 0) + 1;
    return acc;
  }, {});
  const topMainId = Object.keys(mainCounts).sort((a, b) => mainCounts[b] - mainCounts[a])[0] || 'iori';
  const topMainChar = CHARACTERS.find((c) => c.id === topMainId);

  // Handle Edit Submit
  const handleSaveEdit = (e) => {
    e.preventDefault();
    setFormError(null);

    const res = adminUpdateUser(editingUser.id, {
      gamertag: editingUser.gamertag,
      email: editingUser.email,
      rank: editingUser.rank,
      mainChar: editingUser.mainChar,
      role: editingUser.role,
      password: editingUser.password,
    });

    if (!res.success) {
      setFormError(res.error);
      arcadeAudio.playDeselect();
      return;
    }

    arcadeAudio.playFight();
    showToast(`Cuenta de "${editingUser.gamertag}" actualizada exitosamente.`);
    refreshUsersList();
    if (editingUser.id === currentUser.id && onSessionUpdated) {
      onSessionUpdated(res.user);
    }
    setEditingUser(null);
  };

  // Handle Create Submit
  const handleCreateUser = (e) => {
    e.preventDefault();
    setFormError(null);

    const res = adminCreateUser(newUserData);
    if (!res.success) {
      setFormError(res.error);
      arcadeAudio.playDeselect();
      return;
    }

    arcadeAudio.playFight();
    showToast(`Usuario "${newUserData.gamertag}" creado exitosamente.`);
    refreshUsersList();
    setIsCreatingUser(false);
    setNewUserData({
      gamertag: '',
      email: '',
      password: '',
      mainChar: 'iori',
      rank: 'Rank B',
      role: 'user',
    });
  };

  // Handle Password Reset
  const handleConfirmPasswordReset = (e) => {
    e.preventDefault();
    if (newPasswordVal.trim().length < 4) {
      setFormError('La contraseña debe tener al menos 4 caracteres.');
      arcadeAudio.playDeselect();
      return;
    }

    const res = adminResetPassword(passwordModalUser.id, newPasswordVal.trim());
    if (!res.success) {
      setFormError(res.error);
      arcadeAudio.playDeselect();
      return;
    }

    arcadeAudio.playCoin();
    showToast(`Contraseña de "${passwordModalUser.gamertag}" restablecida.`);
    refreshUsersList();
    setPasswordModalUser(null);
    setNewPasswordVal('');
  };

  // Handle Delete User
  const handleConfirmDelete = () => {
    if (!deleteConfirmUser) return;
    const res = adminDeleteUser(deleteConfirmUser.id);
    if (!res.success) {
      showToast(res.error, true);
      arcadeAudio.playDeselect();
      setDeleteConfirmUser(null);
      return;
    }

    arcadeAudio.playDeselect();
    showToast(`Cuenta de "${deleteConfirmUser.gamertag}" eliminada.`);
    refreshUsersList();
    setDeleteConfirmUser(null);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 400,
        background: 'rgba(2, 4, 10, 0.92)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '1.5rem 1rem',
        overflowY: 'auto',
      }}
    >
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '1140px',
          maxHeight: 'min(92vh, 850px)',
          margin: 'auto 0',
          display: 'flex',
          flexDirection: 'column',
          border: '2px solid rgba(245, 158, 11, 0.4)',
          boxShadow: '0 0 50px rgba(245, 158, 11, 0.25), 0 20px 40px rgba(0,0,0,0.9)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Toast Alert */}
        {toast && (
          <div
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              zIndex: 60,
              padding: '0.65rem 1.25rem',
              borderRadius: '6px',
              fontFamily: 'var(--font-tech)',
              fontSize: '0.9rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: toast.isError ? 'rgba(239, 68, 68, 0.95)' : 'rgba(16, 185, 129, 0.95)',
              color: '#fff',
              boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
            }}
          >
            {toast.isError ? <AlertTriangle size={18} /> : <Check size={18} />}
            <span>{toast.msg}</span>
          </div>
        )}

        {/* Pinned Header */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
            background: 'linear-gradient(90deg, rgba(245, 158, 11, 0.12) 0%, rgba(6, 8, 15, 0.95) 100%)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #f59e0b 0%, #b45309 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 18px rgba(245, 158, 11, 0.5)',
              }}
            >
              <Crown size={24} color="#000" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span className="font-neogeo" style={{ fontSize: '1.8rem', color: '#fbbf24', lineHeight: 1 }}>
                  PANEL DE CONTROL DEL ADMINISTRADOR
                </span>
                <span className="badge-gold" style={{ fontSize: '0.72rem' }}>
                  SYSTEM OPERATOR MVS
                </span>
              </div>
              <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                KOF '98 Dream Match Coaching Lab • Control Total de Cuentas, Rangos y Credenciales
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              arcadeAudio.playDeselect();
              onClose();
            }}
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#94a3b8',
              width: '36px',
              height: '36px',
              borderRadius: '6px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            title="Cerrar Panel"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div style={{ padding: '1.5rem', overflowY: 'auto', flex: 1 }}>
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
              <Users size={28} color="#38bdf8" />
              <div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase' }}>
                  Total de Cuentas
                </div>
                <div className="font-neogeo" style={{ fontSize: '1.9rem', color: '#fff', lineHeight: 1 }}>
                  {totalCount}
                </div>
              </div>
            </div>

            <div
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(245, 158, 11, 0.25)',
                borderRadius: '8px',
                padding: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
              }}
            >
              <Crown size={28} color="#f59e0b" />
              <div>
                <div style={{ fontSize: '0.75rem', color: '#fbbf24', textTransform: 'uppercase' }}>
                  Administradores
                </div>
                <div className="font-neogeo" style={{ fontSize: '1.9rem', color: '#fbbf24', lineHeight: 1 }}>
                  {adminCount}
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
              <UserCheck size={28} color="#10b981" />
              <div>
                <div style={{ fontSize: '0.75rem', color: '#34d399', textTransform: 'uppercase' }}>
                  Alumnos / Jugadores
                </div>
                <div className="font-neogeo" style={{ fontSize: '1.9rem', color: '#34d399', lineHeight: 1 }}>
                  {studentCount}
                </div>
              </div>
            </div>

            <div
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 46, 67, 0.25)',
                borderRadius: '8px',
                padding: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
              }}
            >
              <div style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img
                  src={CHARACTER_IMAGES[topMainId] || CHARACTER_IMAGES.iori}
                  alt={topMainChar?.name || 'Main'}
                  style={{ width: '32px', height: '32px', objectFit: 'contain', imageRendering: 'pixelated' }}
                />
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#f87171', textTransform: 'uppercase' }}>
                  Main Más Popular
                </div>
                <div className="font-neogeo" style={{ fontSize: '1.3rem', color: '#fff', lineHeight: 1 }}>
                  {topMainChar?.name || 'Iori Yagami'} ({mainCounts[topMainId] || 1})
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
            {/* Search Input */}
            <div style={{ position: 'relative', minWidth: '240px', flex: '1 1 260px' }}>
              <Search
                size={16}
                color="#94a3b8"
                style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }}
              />
              <input
                type="text"
                placeholder="Buscar por Gamertag o Correo..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  background: '#040711',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '6px',
                  padding: '0.55rem 0.75rem 0.55rem 2.2rem',
                  color: '#fff',
                  fontSize: '0.88rem',
                }}
              />
            </div>

            {/* Role Filter Buttons */}
            <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
              <span style={{ fontSize: '0.78rem', color: '#94a3b8', marginRight: '0.3rem' }}>Filtrar:</span>
              {[
                { id: 'ALL', label: `Todos (${totalCount})` },
                { id: 'admin', label: `Admins (${adminCount})` },
                { id: 'user', label: `Alumnos (${studentCount})` },
              ].map((rf) => (
                <button
                  key={rf.id}
                  type="button"
                  onClick={() => setRoleFilter(rf.id)}
                  style={{
                    background: roleFilter === rf.id ? '#f59e0b' : 'rgba(255, 255, 255, 0.05)',
                    color: roleFilter === rf.id ? '#000' : '#cbd5e1',
                    border: '1px solid ' + (roleFilter === rf.id ? '#fbbf24' : 'rgba(255, 255, 255, 0.1)'),
                    padding: '0.35rem 0.75rem',
                    borderRadius: '4px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  {rf.label}
                </button>
              ))}
            </div>

            {/* Actions: Restore Demo Users & Create New Account */}
            <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
              <button
                type="button"
                className="btn-ghost"
                style={{ fontSize: '0.85rem', padding: '0.45rem 0.9rem', color: '#38bdf8', borderColor: 'rgba(56, 189, 248, 0.3)' }}
                onClick={handleRestoreDemoUsers}
                title="Restaura las cuentas demo iniciales si fueron eliminadas (incluye KOF_Master98)"
              >
                <RotateCcw size={15} color="#38bdf8" />
                <span>Restaurar Alumnos Demo</span>
              </button>

              <button
                type="button"
                className="btn-extra"
                style={{ fontSize: '0.95rem', padding: '0.45rem 1.2rem' }}
                onClick={() => {
                  arcadeAudio.playCoin();
                  setIsCreatingUser(true);
                  setFormError(null);
                }}
              >
                <Plus size={16} />
                <span>Registrar Nueva Cuenta</span>
              </button>
            </div>
          </div>

          {/* Registered Users Table */}
          <div
            style={{
              background: '#040711',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '8px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '70px 1.8fr 1.3fr 1.2fr 1fr 140px',
                padding: '0.75rem 1rem',
                background: 'rgba(255, 255, 255, 0.04)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                fontSize: '0.75rem',
                color: '#94a3b8',
                textTransform: 'uppercase',
                fontWeight: 700,
                letterSpacing: '0.05em',
              }}
            >
              <span>Main</span>
              <span>Luchador / Gamertag</span>
              <span>Correo</span>
              <span>Rango Competitivo</span>
              <span>Rol</span>
              <span style={{ textAlign: 'right' }}>Acciones</span>
            </div>

            {filteredUsers.length === 0 ? (
              <div style={{ padding: '2.5rem', textAlign: 'center', color: '#94a3b8' }}>
                <p style={{ marginBottom: '0.75rem' }}>No se encontraron cuentas que coincidan con la búsqueda.</p>
                <button
                  type="button"
                  className="btn-ghost"
                  onClick={handleRestoreDemoUsers}
                  style={{ fontSize: '0.85rem', padding: '0.4rem 1rem' }}
                >
                  <RotateCcw size={14} />
                  <span>Restaurar KOF_Master98 y Cuentas Demo</span>
                </button>
              </div>
            ) : (
              filteredUsers.map((u) => {
                const isRootAdmin = u.email.toLowerCase() === ADMIN_USER.email.toLowerCase();
                const charData = CHARACTERS.find((c) => c.id === u.mainChar);
                return (
                  <div
                    key={u.id}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '70px 1.8fr 1.3fr 1.2fr 1fr 140px',
                      alignItems: 'center',
                      padding: '0.75rem 1rem',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                      background: u.id === currentUser.id ? 'rgba(245, 158, 11, 0.04)' : 'transparent',
                      transition: 'background 0.2s',
                    }}
                  >
                    {/* Character Avatar */}
                    <div>
                      <div
                        style={{
                          width: '42px',
                          height: '42px',
                          borderRadius: '6px',
                          background: 'rgba(0, 0, 0, 0.6)',
                          border: '1px solid ' + (u.role === 'admin' ? '#f59e0b' : '#3b82f6'),
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          overflow: 'hidden',
                        }}
                      >
                        <img
                          src={CHARACTER_IMAGES[u.mainChar] || CHARACTER_IMAGES.iori}
                          alt={u.mainChar}
                          style={{ width: '38px', height: '38px', objectFit: 'contain', imageRendering: 'pixelated' }}
                        />
                      </div>
                    </div>

                    {/* Gamertag & Details */}
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                        <span className="font-neogeo" style={{ fontSize: '1.15rem', color: '#fff' }}>
                          {u.gamertag}
                        </span>
                        {u.id === currentUser.id && (
                          <span style={{ fontSize: '0.65rem', background: '#2563eb', color: '#fff', padding: '1px 5px', borderRadius: '3px' }}>
                            Tú
                          </span>
                        )}
                        {u.email.toLowerCase() === DEMO_STUDENT_USER.email.toLowerCase() && (
                          <span style={{ fontSize: '0.65rem', background: 'rgba(56, 189, 248, 0.2)', color: '#38bdf8', padding: '1px 5px', borderRadius: '3px' }}>
                            Demo
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                        Main: <strong style={{ color: '#cbd5e1' }}>{charData?.name || u.mainChar}</strong> • Registrado: {u.joinedDate || 'Reciente'}
                      </div>
                    </div>

                    {/* Email */}
                    <div style={{ fontSize: '0.85rem', color: '#cbd5e1', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {u.email}
                    </div>

                    {/* Rank */}
                    <div>
                      <span
                        style={{
                          fontSize: '0.76rem',
                          padding: '0.2rem 0.55rem',
                          borderRadius: '4px',
                          background: u.role === 'admin' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(59, 130, 246, 0.12)',
                          color: u.role === 'admin' ? '#fbbf24' : '#60a5fa',
                          border: '1px solid ' + (u.role === 'admin' ? 'rgba(245, 158, 11, 0.3)' : 'rgba(59, 130, 246, 0.3)'),
                          fontWeight: 600,
                        }}
                      >
                        {u.rank || 'Rank B'}
                      </span>
                    </div>

                    {/* Role Badge */}
                    <div>
                      {u.role === 'admin' ? (
                        <span
                          className="badge-gold"
                          style={{
                            fontSize: '0.7rem',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.3rem',
                            padding: '0.2rem 0.5rem',
                          }}
                        >
                          <Crown size={12} />
                          <span>ADMIN</span>
                        </span>
                      ) : (
                        <span
                          className="badge-cyan"
                          style={{
                            fontSize: '0.7rem',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.3rem',
                            padding: '0.2rem 0.5rem',
                          }}
                        >
                          <UserCheck size={12} />
                          <span>ALUMNO</span>
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.4rem' }}>
                      {/* Edit Button */}
                      <button
                        type="button"
                        onClick={() => {
                          arcadeAudio.playSelect();
                          setEditingUser({ ...u });
                          setFormError(null);
                        }}
                        style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                          color: '#38bdf8',
                          width: '32px',
                          height: '32px',
                          borderRadius: '4px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                        }}
                        title="Modificar Datos / Rango"
                      >
                        <Edit2 size={14} />
                      </button>

                      {/* Reset Password Button */}
                      <button
                        type="button"
                        onClick={() => {
                          arcadeAudio.playSelect();
                          setPasswordModalUser(u);
                          setNewPasswordVal('');
                          setFormError(null);
                        }}
                        style={{
                          background: 'rgba(245, 158, 11, 0.1)',
                          border: '1px solid rgba(245, 158, 11, 0.3)',
                          color: '#fbbf24',
                          width: '32px',
                          height: '32px',
                          borderRadius: '4px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                        }}
                        title="Cambiar Contraseña"
                      >
                        <Key size={14} />
                      </button>

                      {/* Delete Button (Disabled for Root Admin) */}
                      <button
                        type="button"
                        disabled={isRootAdmin}
                        onClick={() => {
                          arcadeAudio.playDeselect();
                          setDeleteConfirmUser(u);
                        }}
                        style={{
                          background: isRootAdmin ? 'rgba(255, 255, 255, 0.02)' : 'rgba(239, 68, 68, 0.12)',
                          border: '1px solid ' + (isRootAdmin ? 'rgba(255, 255, 255, 0.05)' : 'rgba(239, 68, 68, 0.35)'),
                          color: isRootAdmin ? '#475569' : '#f87171',
                          width: '32px',
                          height: '32px',
                          borderRadius: '4px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: isRootAdmin ? 'not-allowed' : 'pointer',
                        }}
                        title={isRootAdmin ? 'Cuenta protegida de Administrador Raíz' : 'Eliminar Cuenta'}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* ===================================================================
            SUB-MODAL: EDIT USER (MODIFICAR DETALLES DE LA CUENTA)
            Featuring Pinned Header [X] and Pinned Footer [Guardar Cambios]
           =================================================================== */}
        {editingUser && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 500,
              background: 'rgba(0, 0, 0, 0.88)',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'center',
              padding: '1.5rem 1rem',
              overflowY: 'auto',
            }}
          >
            <div
              className="glass-panel"
              style={{
                width: '100%',
                maxWidth: '540px',
                maxHeight: 'min(92vh, 760px)',
                margin: 'auto 0',
                display: 'flex',
                flexDirection: 'column',
                border: '2px solid rgba(56, 189, 248, 0.5)',
                boxShadow: '0 0 50px rgba(56, 189, 248, 0.35)',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              {/* Pinned Sub-Modal Header */}
              <div
                style={{
                  padding: '1.25rem 1.5rem',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexShrink: 0,
                  background: 'linear-gradient(180deg, rgba(10, 24, 48, 0.9) 0%, rgba(4, 7, 17, 0.95) 100%)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Edit2 size={20} color="#38bdf8" />
                  <span className="font-neogeo" style={{ fontSize: '1.5rem', color: '#fff' }}>
                    MODIFICAR CUENTA: {editingUser.gamertag}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#94a3b8',
                    cursor: 'pointer',
                    width: '32px',
                    height: '32px',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  title="Cerrar"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Scrollable Form Body */}
              <form
                id="editUserForm"
                onSubmit={handleSaveEdit}
                style={{
                  padding: '1.25rem 1.5rem',
                  overflowY: 'auto',
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.85rem',
                }}
              >
                {formError && (
                  <div
                    style={{
                      padding: '0.6rem 0.8rem',
                      background: 'rgba(239, 68, 68, 0.15)',
                      border: '1px solid #ef4444',
                      borderRadius: '6px',
                      color: '#f87171',
                      fontSize: '0.82rem',
                    }}
                  >
                    {formError}
                  </div>
                )}

                <div>
                  <label style={{ fontSize: '0.78rem', color: '#cbd5e1', display: 'block', marginBottom: '0.3rem' }}>
                    Gamertag en Fightcade:
                  </label>
                  <input
                    type="text"
                    required
                    value={editingUser.gamertag}
                    onChange={(e) => setEditingUser({ ...editingUser, gamertag: e.target.value })}
                    style={{
                      width: '100%',
                      background: '#040711',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '6px',
                      padding: '0.55rem 0.8rem',
                      color: '#fff',
                      fontSize: '0.9rem',
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.78rem', color: '#cbd5e1', display: 'block', marginBottom: '0.3rem' }}>
                    Correo Electrónico:
                  </label>
                  <input
                    type="email"
                    required
                    value={editingUser.email}
                    onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                    style={{
                      width: '100%',
                      background: '#040711',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '6px',
                      padding: '0.55rem 0.8rem',
                      color: '#fff',
                      fontSize: '0.9rem',
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ fontSize: '0.78rem', color: '#cbd5e1', display: 'block', marginBottom: '0.3rem' }}>
                      Rol de Cuenta:
                    </label>
                    <select
                      value={editingUser.role || 'user'}
                      onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                      style={{
                        width: '100%',
                        background: '#040711',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        borderRadius: '6px',
                        padding: '0.55rem 0.8rem',
                        color: '#fff',
                        fontSize: '0.88rem',
                      }}
                    >
                      <option value="user">Alumno / Jugador</option>
                      <option value="admin">Administrador MVS</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.78rem', color: '#cbd5e1', display: 'block', marginBottom: '0.3rem' }}>
                      Rango de Habilidad:
                    </label>
                    <select
                      value={editingUser.rank || 'Rank B'}
                      onChange={(e) => setEditingUser({ ...editingUser, rank: e.target.value })}
                      style={{
                        width: '100%',
                        background: '#040711',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        borderRadius: '6px',
                        padding: '0.55rem 0.8rem',
                        color: '#fff',
                        fontSize: '0.88rem',
                      }}
                    >
                      <option value="Rank S+ (Pro Player)">Rank S+ (Pro Player)</option>
                      <option value="Rank S (Alumno Élite)">Rank S (Alumno Élite)</option>
                      <option value="Rank S">Rank S</option>
                      <option value="Rank A">Rank A</option>
                      <option value="Rank B">Rank B</option>
                      <option value="Rank C (Nuevo Alumno)">Rank C (Nuevo Alumno)</option>
                      <option value="System Operator (Admin)">System Operator (Admin)</option>
                    </select>
                  </div>
                </div>

                {/* Main Character Picker */}
                <div>
                  <label style={{ fontSize: '0.78rem', color: '#cbd5e1', display: 'block', marginBottom: '0.4rem' }}>
                    Personaje Principal (Main):
                  </label>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(6, 1fr)',
                      gap: '0.4rem',
                      maxHeight: '130px',
                      overflowY: 'auto',
                      padding: '0.4rem',
                      background: '#020409',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '6px',
                    }}
                  >
                    {CHARACTERS.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setEditingUser({ ...editingUser, mainChar: c.id })}
                        style={{
                          background: editingUser.mainChar === c.id ? 'rgba(56, 189, 248, 0.3)' : 'transparent',
                          border: editingUser.mainChar === c.id ? '2px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.08)',
                          borderRadius: '4px',
                          padding: '3px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                        title={c.name}
                      >
                        <img
                          src={CHARACTER_IMAGES[c.id]}
                          alt={c.name}
                          style={{ width: '26px', height: '26px', objectFit: 'contain', imageRendering: 'pixelated' }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </form>

              {/* Pinned Sub-Modal Footer: Always Visible */}
              <div
                style={{
                  padding: '1rem 1.5rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  gap: '0.75rem',
                  flexShrink: 0,
                  background: 'rgba(4, 7, 17, 0.98)',
                }}
              >
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="btn-ghost"
                  style={{ flex: 1, padding: '0.55rem' }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  form="editUserForm"
                  className="btn-advanced"
                  style={{ flex: 2, padding: '0.55rem', fontSize: '1.1rem' }}
                >
                  Guardar Cambios
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            SUB-MODAL: CREATE USER
            Featuring Pinned Header [X] and Pinned Footer [Crear Cuenta]
           =================================================================== */}
        {isCreatingUser && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 500,
              background: 'rgba(0, 0, 0, 0.88)',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'center',
              padding: '1.5rem 1rem',
              overflowY: 'auto',
            }}
          >
            <div
              className="glass-panel"
              style={{
                width: '100%',
                maxWidth: '540px',
                maxHeight: 'min(92vh, 760px)',
                margin: 'auto 0',
                display: 'flex',
                flexDirection: 'column',
                border: '2px solid rgba(16, 185, 129, 0.5)',
                boxShadow: '0 0 50px rgba(16, 185, 129, 0.35)',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              {/* Pinned Sub-Modal Header */}
              <div
                style={{
                  padding: '1.25rem 1.5rem',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexShrink: 0,
                  background: 'linear-gradient(180deg, rgba(6, 28, 18, 0.9) 0%, rgba(4, 7, 17, 0.95) 100%)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Plus size={20} color="#10b981" />
                  <span className="font-neogeo" style={{ fontSize: '1.5rem', color: '#fff' }}>
                    REGISTRAR NUEVA CUENTA
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCreatingUser(false)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#94a3b8',
                    cursor: 'pointer',
                    width: '32px',
                    height: '32px',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  title="Cerrar"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Scrollable Form Body */}
              <form
                id="createUserForm"
                onSubmit={handleCreateUser}
                style={{
                  padding: '1.25rem 1.5rem',
                  overflowY: 'auto',
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.85rem',
                }}
              >
                {formError && (
                  <div
                    style={{
                      padding: '0.6rem 0.8rem',
                      background: 'rgba(239, 68, 68, 0.15)',
                      border: '1px solid #ef4444',
                      borderRadius: '6px',
                      color: '#f87171',
                      fontSize: '0.82rem',
                    }}
                  >
                    {formError}
                  </div>
                )}

                <div>
                  <label style={{ fontSize: '0.78rem', color: '#cbd5e1', display: 'block', marginBottom: '0.3rem' }}>
                    Gamertag (Fightcade):
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Kyo_Master"
                    value={newUserData.gamertag}
                    onChange={(e) => setNewUserData({ ...newUserData, gamertag: e.target.value })}
                    style={{
                      width: '100%',
                      background: '#040711',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '6px',
                      padding: '0.55rem 0.8rem',
                      color: '#fff',
                      fontSize: '0.9rem',
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.78rem', color: '#cbd5e1', display: 'block', marginBottom: '0.3rem' }}>
                    Correo Electrónico:
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alumno@kof98.com"
                    value={newUserData.email}
                    onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
                    style={{
                      width: '100%',
                      background: '#040711',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '6px',
                      padding: '0.55rem 0.8rem',
                      color: '#fff',
                      fontSize: '0.9rem',
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.78rem', color: '#cbd5e1', display: 'block', marginBottom: '0.3rem' }}>
                    Contraseña Inicial:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Mínimo 4 caracteres"
                    value={newUserData.password}
                    onChange={(e) => setNewUserData({ ...newUserData, password: e.target.value })}
                    style={{
                      width: '100%',
                      background: '#040711',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '6px',
                      padding: '0.55rem 0.8rem',
                      color: '#fff',
                      fontSize: '0.9rem',
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ fontSize: '0.78rem', color: '#cbd5e1', display: 'block', marginBottom: '0.3rem' }}>
                      Rol:
                    </label>
                    <select
                      value={newUserData.role}
                      onChange={(e) => setNewUserData({ ...newUserData, role: e.target.value })}
                      style={{
                        width: '100%',
                        background: '#040711',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        borderRadius: '6px',
                        padding: '0.55rem 0.8rem',
                        color: '#fff',
                        fontSize: '0.88rem',
                      }}
                    >
                      <option value="user">Alumno / Jugador</option>
                      <option value="admin">Administrador MVS</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.78rem', color: '#cbd5e1', display: 'block', marginBottom: '0.3rem' }}>
                      Rango:
                    </label>
                    <select
                      value={newUserData.rank}
                      onChange={(e) => setNewUserData({ ...newUserData, rank: e.target.value })}
                      style={{
                        width: '100%',
                        background: '#040711',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        borderRadius: '6px',
                        padding: '0.55rem 0.8rem',
                        color: '#fff',
                        fontSize: '0.88rem',
                      }}
                    >
                      <option value="Rank S+ (Pro Player)">Rank S+ (Pro Player)</option>
                      <option value="Rank S (Alumno Élite)">Rank S (Alumno Élite)</option>
                      <option value="Rank S">Rank S</option>
                      <option value="Rank A">Rank A</option>
                      <option value="Rank B">Rank B</option>
                      <option value="Rank C (Nuevo Alumno)">Rank C (Nuevo Alumno)</option>
                      <option value="System Operator (Admin)">System Operator (Admin)</option>
                    </select>
                  </div>
                </div>

                {/* Main Character Picker */}
                <div>
                  <label style={{ fontSize: '0.78rem', color: '#cbd5e1', display: 'block', marginBottom: '0.4rem' }}>
                    Personaje Principal (Main):
                  </label>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(6, 1fr)',
                      gap: '0.4rem',
                      maxHeight: '130px',
                      overflowY: 'auto',
                      padding: '0.4rem',
                      background: '#020409',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '6px',
                    }}
                  >
                    {CHARACTERS.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setNewUserData({ ...newUserData, mainChar: c.id })}
                        style={{
                          background: newUserData.mainChar === c.id ? 'rgba(16, 185, 129, 0.3)' : 'transparent',
                          border: newUserData.mainChar === c.id ? '2px solid #10b981' : '1px solid rgba(255, 255, 255, 0.08)',
                          borderRadius: '4px',
                          padding: '3px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                        title={c.name}
                      >
                        <img
                          src={CHARACTER_IMAGES[c.id]}
                          alt={c.name}
                          style={{ width: '26px', height: '26px', objectFit: 'contain', imageRendering: 'pixelated' }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </form>

              {/* Pinned Sub-Modal Footer: Always Visible */}
              <div
                style={{
                  padding: '1rem 1.5rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  gap: '0.75rem',
                  flexShrink: 0,
                  background: 'rgba(4, 7, 17, 0.98)',
                }}
              >
                <button
                  type="button"
                  onClick={() => setIsCreatingUser(false)}
                  className="btn-ghost"
                  style={{ flex: 1, padding: '0.55rem' }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  form="createUserForm"
                  className="btn-extra"
                  style={{ flex: 2, padding: '0.55rem', fontSize: '1.1rem' }}
                >
                  Crear Cuenta
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            SUB-MODAL: RESET PASSWORD
           =================================================================== */}
        {passwordModalUser && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 500,
              background: 'rgba(0, 0, 0, 0.88)',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'center',
              padding: '1.5rem 1rem',
              overflowY: 'auto',
            }}
          >
            <div
              className="glass-panel"
              style={{
                width: '100%',
                maxWidth: '440px',
                margin: 'auto 0',
                padding: '1.5rem',
                border: '2px solid rgba(245, 158, 11, 0.5)',
                boxShadow: '0 0 40px rgba(245, 158, 11, 0.3)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Key size={22} color="#f59e0b" />
                  <span className="font-neogeo" style={{ fontSize: '1.4rem', color: '#fff' }}>
                    CAMBIAR CONTRASEÑA
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setPasswordModalUser(null)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#94a3b8',
                    cursor: 'pointer',
                  }}
                >
                  <X size={18} />
                </button>
              </div>

              <p style={{ fontSize: '0.82rem', color: '#94a3b8', marginBottom: '1.25rem' }}>
                Ingresa una nueva contraseña para la cuenta de <strong>{passwordModalUser.gamertag}</strong>:
              </p>

              {formError && (
                <div
                  style={{
                    padding: '0.5rem',
                    background: 'rgba(239, 68, 68, 0.15)',
                    border: '1px solid #ef4444',
                    borderRadius: '4px',
                    color: '#f87171',
                    fontSize: '0.8rem',
                    marginBottom: '1rem',
                  }}
                >
                  {formError}
                </div>
              )}

              <form onSubmit={handleConfirmPasswordReset}>
                <input
                  type="text"
                  required
                  placeholder="Nueva contraseña (mínimo 4 caracteres)"
                  value={newPasswordVal}
                  onChange={(e) => setNewPasswordVal(e.target.value)}
                  style={{
                    width: '100%',
                    background: '#040711',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '6px',
                    padding: '0.65rem 0.8rem',
                    color: '#fff',
                    fontSize: '0.9rem',
                    marginBottom: '1.25rem',
                  }}
                />

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button
                    type="button"
                    onClick={() => setPasswordModalUser(null)}
                    className="btn-ghost"
                    style={{ flex: 1, padding: '0.5rem' }}
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="btn-advanced" style={{ flex: 2, padding: '0.5rem', fontSize: '1rem' }}>
                    Guardar Clave
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ===================================================================
            SUB-MODAL: DELETE CONFIRMATION
           =================================================================== */}
        {deleteConfirmUser && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 500,
              background: 'rgba(0, 0, 0, 0.88)',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'center',
              padding: '1.5rem 1rem',
              overflowY: 'auto',
            }}
          >
            <div
              className="glass-panel"
              style={{
                width: '100%',
                maxWidth: '440px',
                margin: 'auto 0',
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
                ¿ELIMINAR ESTA CUENTA?
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.5, marginBottom: '1.5rem' }}>
                Estás a punto de eliminar definitivamente al usuario{' '}
                <strong style={{ color: '#f87171' }}>{deleteConfirmUser.gamertag}</strong> ({deleteConfirmUser.email}).
                Esta acción se puede revertir con el botón de "Restaurar Alumnos Demo" si es una cuenta de prueba.
              </p>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  type="button"
                  onClick={() => setDeleteConfirmUser(null)}
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
    </div>
  );
}

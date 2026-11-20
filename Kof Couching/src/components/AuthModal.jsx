import React, { useState } from 'react';
import { X, Lock, UserPlus, LogIn, Flame, ShieldAlert, CheckCircle2, Sparkles, Crown } from 'lucide-react';
import { login, register, ADMIN_USER, DEMO_STUDENT_USER } from '../utils/auth';
import { CHARACTERS } from '../data/characters';
import { CHARACTER_IMAGES } from '../assets/characterImages';
import { arcadeAudio } from '../utils/audio';

export function AuthModal({ isOpen, onClose, initialMode = 'login', onAuthSuccess }) {
  if (!isOpen) return null;

  const [mode, setMode] = useState(initialMode); // 'login' | 'register'
  const [error, setError] = useState(null);

  // Login form state
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form state
  const [regGamertag, setRegGamertag] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regMainChar, setRegMainChar] = useState('iori');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setError(null);

    const res = login(loginIdentifier, loginPassword);
    if (!res.success) {
      arcadeAudio.playDeselect();
      setError(res.error);
      return;
    }

    arcadeAudio.playCoin();
    onAuthSuccess(res.user);
    onClose();
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setError(null);

    const res = register({
      gamertag: regGamertag,
      email: regEmail,
      password: regPassword,
      mainChar: regMainChar,
    });

    if (!res.success) {
      arcadeAudio.playDeselect();
      setError(res.error);
      return;
    }

    arcadeAudio.playFight();
    onAuthSuccess(res.user);
    onClose();
  };

  const handleQuickDemoLogin = () => {
    arcadeAudio.playCoin();
    const res = login('demo@kof98.com', 'kof98password');
    if (res.success) {
      onAuthSuccess(res.user);
      onClose();
    }
  };

  const handleQuickAdminLogin = () => {
    arcadeAudio.playFight();
    const res = login(ADMIN_USER.email, ADMIN_USER.password);
    if (res.success) {
      onAuthSuccess(res.user);
      onClose();
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 350,
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
          maxWidth: '540px',
          width: '100%',
          maxHeight: 'min(92vh, 780px)',
          margin: 'auto 0',
          display: 'flex',
          flexDirection: 'column',
          border: '1px solid rgba(255, 46, 67, 0.45)',
          boxShadow: '0 0 50px rgba(255, 46, 67, 0.35)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Pinned Modal Header */}
        <div
          style={{
            padding: '1.25rem 1.5rem 1rem 1.5rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            position: 'relative',
            flexShrink: 0,
            background: 'linear-gradient(180deg, rgba(20, 8, 12, 0.85) 0%, rgba(6, 7, 12, 0.95) 100%)',
          }}
        >
          {/* Close Button: Always Pinned at Top-Right */}
          <button
            type="button"
            onClick={() => {
              arcadeAudio.playDeselect();
              onClose();
            }}
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: 'rgba(255, 255, 255, 0.06)',
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
            title="Cerrar Ventana"
          >
            <X size={18} />
          </button>

          {/* Header Icon & Tag */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
            <Flame size={20} color="#ff2e43" />
            <span className="badge-arcade" style={{ fontSize: '0.68rem' }}>
              ACADEMIA FGC • ACCESO RESTRINGIDO
            </span>
          </div>

          <h3 className="font-arcade" style={{ fontSize: '2.1rem', color: '#fff', lineHeight: 1, marginBottom: '0.35rem' }}>
            {mode === 'login' ? 'INICIAR SESIÓN' : 'CREAR CUENTA DE ALUMNO'}
          </h3>

          <p style={{ fontSize: '0.82rem', color: '#94a3b8', marginBottom: '0.85rem', lineHeight: 1.4 }}>
            Inicia sesión o regístrate para desbloquear el <strong>Simulador de Matchups</strong> y los <strong>Planes de Coaching</strong>.
          </p>

          {/* Tab Switcher */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '0.5rem',
              background: 'rgba(0,0,0,0.4)',
              padding: '4px',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <button
              type="button"
              onClick={() => {
                arcadeAudio.playHover();
                setMode('login');
                setError(null);
              }}
              style={{
                padding: '0.5rem',
                borderRadius: '6px',
                border: 'none',
                background: mode === 'login' ? 'linear-gradient(180deg, #ff4055 0%, #d90429 100%)' : 'transparent',
                color: mode === 'login' ? '#fff' : '#94a3b8',
                fontFamily: 'var(--font-arcade)',
                fontSize: '1.15rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
                transition: 'all 0.2s',
              }}
            >
              <LogIn size={15} />
              <span>INGRESAR</span>
            </button>

            <button
              type="button"
              onClick={() => {
                arcadeAudio.playHover();
                setMode('register');
                setError(null);
              }}
              style={{
                padding: '0.5rem',
                borderRadius: '6px',
                border: 'none',
                background: mode === 'register' ? 'linear-gradient(180deg, #3b82f6 0%, #1d4ed8 100%)' : 'transparent',
                color: mode === 'register' ? '#fff' : '#94a3b8',
                fontFamily: 'var(--font-arcade)',
                fontSize: '1.15rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
                transition: 'all 0.2s',
              }}
            >
              <UserPlus size={15} />
              <span>REGISTRO</span>
            </button>
          </div>
        </div>

        {/* Scrollable Modal Content */}
        <div style={{ padding: '1.25rem 1.5rem 1.5rem 1.5rem', overflowY: 'auto', flex: 1 }}>
          {/* Error Alert */}
          {error && (
            <div
              style={{
                background: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid #ef4444',
                borderRadius: '6px',
                padding: '0.65rem 0.9rem',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.85rem',
                color: '#fca5a5',
              }}
            >
              <ShieldAlert size={18} color="#f87171" style={{ flexShrink: 0 }} />
              <span>{error}</span>
            </div>
          )}

          {mode === 'login' ? (
            /* Login Form */
            <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              <div>
                <label className="font-tech" style={{ fontSize: '0.78rem', color: '#cbd5e1', display: 'block', marginBottom: '0.3rem' }}>
                  Correo o Gamertag:
                </label>
                <input
                  type="text"
                  required
                  placeholder="admin@kof98.com o KOF_Master98"
                  value={loginIdentifier}
                  onChange={(e) => setLoginIdentifier(e.target.value)}
                  style={{
                    width: '100%',
                    background: '#040711',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '6px',
                    padding: '0.6rem 0.85rem',
                    color: '#fff',
                    fontSize: '0.9rem',
                  }}
                />
              </div>

              <div>
                <label className="font-tech" style={{ fontSize: '0.78rem', color: '#cbd5e1', display: 'block', marginBottom: '0.3rem' }}>
                  Contraseña:
                </label>
                <input
                  type="password"
                  required
                  placeholder="Tu contraseña secreta"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  style={{
                    width: '100%',
                    background: '#040711',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '6px',
                    padding: '0.6rem 0.85rem',
                    color: '#fff',
                    fontSize: '0.9rem',
                  }}
                />
              </div>

              <button
                type="submit"
                className="btn-advanced"
                style={{ width: '100%', padding: '0.7rem', marginTop: '0.4rem', fontSize: '1.2rem' }}
              >
                <LogIn size={18} color="#ffe066" />
                <span>INGRESAR AHORA</span>
              </button>

              {/* Quick One-Click Access Options */}
              <div
                style={{
                  marginTop: '0.6rem',
                  paddingTop: '0.85rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.55rem',
                }}
              >
                <span style={{ fontSize: '0.74rem', color: '#94a3b8', display: 'block', textAlign: 'center' }}>
                  Accesos de Prueba Rápida (1-Click):
                </span>

                {/* Student Demo Button */}
                <button
                  type="button"
                  onClick={handleQuickDemoLogin}
                  className="btn-mode-select"
                  style={{
                    width: '100%',
                    fontSize: '0.9rem',
                    padding: '0.45rem',
                  }}
                  title="demo@kof98.com / kof98password"
                >
                  <Sparkles size={14} color="#00f0ff" />
                  <span>Alumno Demo: KOF_Master98</span>
                </button>

                {/* Administrator Demo Button */}
                <button
                  type="button"
                  onClick={handleQuickAdminLogin}
                  className="btn-snk-gold"
                  style={{
                    width: '100%',
                    fontSize: '0.95rem',
                    padding: '0.5rem',
                    gap: '0.5rem',
                  }}
                  title="admin@kof98.com / admin98"
                >
                  <Crown size={15} color="#000" />
                  <span style={{ color: '#000', fontWeight: 800 }}>Acceder como Administrador (Control Total)</span>
                </button>

                <div style={{ fontSize: '0.68rem', color: '#64748b', textAlign: 'center' }}>
                  Admin: <code>admin@kof98.com</code> | Clave: <code>admin98</code>
                </div>
              </div>
            </form>
          ) : (
            /* Register Form */
            <form onSubmit={handleRegisterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div>
                <label className="font-tech" style={{ fontSize: '0.78rem', color: '#cbd5e1', display: 'block', marginBottom: '0.3rem' }}>
                  Gamertag (Tu nombre en Fightcade):
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej: IoriFlame_MX"
                  value={regGamertag}
                  onChange={(e) => setRegGamertag(e.target.value)}
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
                <label className="font-tech" style={{ fontSize: '0.78rem', color: '#cbd5e1', display: 'block', marginBottom: '0.3rem' }}>
                  Correo Electrónico:
                </label>
                <input
                  type="email"
                  required
                  placeholder="tu_correo@ejemplo.com"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
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
                <label className="font-tech" style={{ fontSize: '0.78rem', color: '#cbd5e1', display: 'block', marginBottom: '0.3rem' }}>
                  Contraseña:
                </label>
                <input
                  type="password"
                  required
                  placeholder="Mínimo 4 caracteres"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
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
                <label className="font-tech" style={{ fontSize: '0.78rem', color: '#cbd5e1', display: 'block', marginBottom: '0.3rem' }}>
                  Tu Personaje Favorito (Main):
                </label>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(5, 1fr)',
                    gap: '0.4rem',
                    maxHeight: '120px',
                    overflowY: 'auto',
                    background: '#020409',
                    padding: '6px',
                    borderRadius: '6px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  {CHARACTERS.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setRegMainChar(c.id)}
                      style={{
                        background: regMainChar === c.id ? 'rgba(59, 130, 246, 0.4)' : 'rgba(255,255,255,0.04)',
                        border: regMainChar === c.id ? '1px solid #3b82f6' : '1px solid transparent',
                        borderRadius: '4px',
                        padding: '3px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        cursor: 'pointer',
                      }}
                      title={c.name}
                    >
                      <img
                        src={CHARACTER_IMAGES[c.id]}
                        alt={c.name}
                        style={{ width: '28px', height: '28px', objectFit: 'contain', imageRendering: 'pixelated' }}
                      />
                      <span
                        style={{
                          fontSize: '0.62rem',
                          color: '#cbd5e1',
                          marginTop: '2px',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          maxWidth: '100%',
                        }}
                      >
                        {c.name.split(' ')[0]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="btn-extra"
                style={{ width: '100%', padding: '0.7rem', marginTop: '0.4rem', fontSize: '1.2rem' }}
              >
                <UserPlus size={18} color="#86efac" />
                <span>CREAR CUENTA & ACCEDER</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

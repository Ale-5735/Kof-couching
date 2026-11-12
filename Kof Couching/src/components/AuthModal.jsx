import React, { useState } from 'react';
import { X, Lock, UserPlus, LogIn, Flame, ShieldAlert, CheckCircle2, Sparkles } from 'lucide-react';
import { login, register } from '../utils/auth';
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

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 300,
      background: 'rgba(0, 0, 0, 0.88)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.25rem',
      overflowY: 'auto'
    }}>
      <div className="glass-panel" style={{
        maxWidth: '520px',
        width: '100%',
        padding: '2.2rem 2rem',
        border: '1px solid rgba(255, 46, 67, 0.45)',
        boxShadow: '0 0 50px rgba(255, 46, 67, 0.35)',
        position: 'relative'
      }}>
        {/* Close Button */}
        <button
          type="button"
          onClick={() => {
            arcadeAudio.playDeselect();
            onClose();
          }}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'none',
            border: 'none',
            color: '#94a3b8',
            cursor: 'pointer',
            padding: '4px'
          }}
          title="Cerrar"
        >
          <X size={22} />
        </button>

        {/* Header Icon & Tag */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
          <Flame size={22} color="#ff2e43" />
          <span className="badge-arcade" style={{ fontSize: '0.7rem' }}>
            ACADEMIA FGC • ACCESO RESTRINGIDO
          </span>
        </div>

        <h3 className="font-arcade" style={{ fontSize: '2.4rem', color: '#fff', lineHeight: 1, marginBottom: '0.5rem' }}>
          {mode === 'login' ? 'INICIAR SESIÓN' : 'CREAR CUENTA DE ALUMNO'}
        </h3>

        <p style={{ fontSize: '0.86rem', color: '#94a3b8', marginBottom: '1.5rem', lineHeight: 1.45 }}>
          Inicia sesión o regístrate para desbloquear el <strong>Simulador Táctico de Matchups</strong> y el acceso a los <strong>Planes de Coaching</strong>.
        </p>

        {/* Tab Switcher */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '0.5rem',
          background: 'rgba(0,0,0,0.4)',
          padding: '4px',
          borderRadius: '8px',
          marginBottom: '1.5rem',
          border: '1px solid rgba(255,255,255,0.08)'
        }}>
          <button
            type="button"
            onClick={() => {
              arcadeAudio.playHover();
              setMode('login');
              setError(null);
            }}
            style={{
              padding: '0.6rem',
              borderRadius: '6px',
              border: 'none',
              background: mode === 'login' ? 'linear-gradient(180deg, #ff4055 0%, #d90429 100%)' : 'transparent',
              color: mode === 'login' ? '#fff' : '#94a3b8',
              fontFamily: 'var(--font-arcade)',
              fontSize: '1.2rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
              transition: 'all 0.2s'
            }}
          >
            <LogIn size={16} />
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
              padding: '0.6rem',
              borderRadius: '6px',
              border: 'none',
              background: mode === 'register' ? 'linear-gradient(180deg, #3b82f6 0%, #1d4ed8 100%)' : 'transparent',
              color: mode === 'register' ? '#fff' : '#94a3b8',
              fontFamily: 'var(--font-arcade)',
              fontSize: '1.2rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
              transition: 'all 0.2s'
            }}
          >
            <UserPlus size={16} />
            <span>REGISTRO</span>
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid #ef4444',
            borderRadius: '6px',
            padding: '0.65rem 0.9rem',
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.85rem',
            color: '#fca5a5'
          }}>
            <ShieldAlert size={18} color="#f87171" style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        {mode === 'login' ? (
          <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label className="font-tech" style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'block', marginBottom: '0.3rem' }}>
                Correo Electrónico o Gamertag:
              </label>
              <input
                type="text"
                required
                placeholder="demo@kof98.com o KOF_Master98"
                value={loginIdentifier}
                onChange={(e) => setLoginIdentifier(e.target.value)}
                style={{
                  width: '100%',
                  background: '#090a0f',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '6px',
                  padding: '0.65rem 0.9rem',
                  color: '#fff',
                  fontSize: '0.9rem'
                }}
              />
            </div>

            <div>
              <label className="font-tech" style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'block', marginBottom: '0.3rem' }}>
                Contraseña:
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                style={{
                  width: '100%',
                  background: '#090a0f',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '6px',
                  padding: '0.65rem 0.9rem',
                  color: '#fff',
                  fontSize: '0.9rem'
                }}
              />
            </div>

            <button
              type="submit"
              className="btn-advanced"
              style={{ width: '100%', padding: '0.75rem', marginTop: '0.5rem', fontSize: '1.25rem' }}
            >
              <LogIn size={18} color="#ffe066" />
              <span>INGRESAR AHORA</span>
            </button>

            {/* Demo One-Click Access Button */}
            <div style={{
              marginTop: '0.5rem',
              paddingTop: '1rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              textAlign: 'center'
            }}>
              <span style={{ fontSize: '0.78rem', color: '#94a3b8', display: 'block', marginBottom: '0.5rem' }}>
                ¿Quieres probar rápido sin escribir?
              </span>
              <button
                type="button"
                onClick={handleQuickDemoLogin}
                className="btn-mode-select"
                style={{
                  width: '100%',
                  fontSize: '0.95rem',
                  padding: '0.5rem'
                }}
              >
                <Sparkles size={14} color="#00f0ff" />
                <span>Acceder como Demo (KOF_Master98)</span>
              </button>
            </div>
          </form>
        ) : (
          /* Register Form */
          <form onSubmit={handleRegisterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label className="font-tech" style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'block', marginBottom: '0.3rem' }}>
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
                  background: '#090a0f',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '6px',
                  padding: '0.65rem 0.9rem',
                  color: '#fff',
                  fontSize: '0.9rem'
                }}
              />
            </div>

            <div>
              <label className="font-tech" style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'block', marginBottom: '0.3rem' }}>
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
                  background: '#090a0f',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '6px',
                  padding: '0.65rem 0.9rem',
                  color: '#fff',
                  fontSize: '0.9rem'
                }}
              />
            </div>

            <div>
              <label className="font-tech" style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'block', marginBottom: '0.3rem' }}>
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
                  background: '#090a0f',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '6px',
                  padding: '0.65rem 0.9rem',
                  color: '#fff',
                  fontSize: '0.9rem'
                }}
              />
            </div>

            <div>
              <label className="font-tech" style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'block', marginBottom: '0.3rem' }}>
                Tu Personaje Favorito (Main):
              </label>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 1fr)',
                gap: '0.4rem',
                maxHeight: '120px',
                overflowY: 'auto',
                background: '#090a0f',
                padding: '6px',
                borderRadius: '6px',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                {CHARACTERS.slice(0, 15).map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setRegMainChar(c.id)}
                    style={{
                      background: regMainChar === c.id ? 'rgba(59, 130, 246, 0.4)' : 'rgba(255,255,255,0.04)',
                      border: regMainChar === c.id ? '1px solid #3b82f6' : '1px solid transparent',
                      borderRadius: '4px',
                      padding: '4px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    <img
                      src={CHARACTER_IMAGES[c.id]}
                      alt={c.name}
                      style={{ width: '28px', height: '28px', objectFit: 'contain', imageRendering: 'pixelated' }}
                    />
                    <span style={{ fontSize: '0.62rem', color: '#cbd5e1', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100%' }}>
                      {c.name.split(' ')[0]}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="btn-extra"
              style={{ width: '100%', padding: '0.75rem', marginTop: '0.5rem', fontSize: '1.25rem' }}
            >
              <UserPlus size={18} color="#86efac" />
              <span>CREAR CUENTA & ACCEDER</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}


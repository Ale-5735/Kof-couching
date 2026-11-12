import React from 'react';
import { Lock, Swords, Calendar, Flame, Sparkles, UserPlus, LogIn, Trophy, Zap, ShieldAlert } from 'lucide-react';
import { arcadeAudio } from '../utils/audio';

export function ProtectedTeaser({ onOpenLogin, onOpenRegister }) {
  return (
    <section id="exclusive-access" style={{ padding: '4rem 0', position: 'relative' }}>
      <div className="kof-container">
        <div className="glass-panel" style={{
          padding: '3.5rem 2rem',
          maxWidth: '920px',
          margin: '0 auto',
          textAlign: 'center',
          border: '2px solid rgba(255, 46, 67, 0.4)',
          background: 'radial-gradient(ellipse at 50% 20%, rgba(157, 78, 221, 0.15) 0%, rgba(13, 15, 24, 0.98) 70%)',
          boxShadow: '0 0 50px rgba(255, 46, 67, 0.25)'
        }}>
          {/* Lock Icon */}
          <div style={{
            width: '68px',
            height: '68px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #ff2e43 0%, #9d4edd 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.25rem auto',
            boxShadow: '0 0 25px rgba(255, 46, 67, 0.6)',
            border: '2px solid rgba(255, 255, 255, 0.3)'
          }}>
            <Lock size={32} color="#fff" />
          </div>

          {/* Badge */}
          <div style={{ display: 'inline-flex', marginBottom: '0.75rem' }}>
            <span className="badge-arcade" style={{ borderColor: 'rgba(245, 158, 11, 0.5)', color: '#fbbf24' }}>
              <Flame size={14} /> CONTENIDO PROTEGIDO • ZONA DE MIEMBROS
            </span>
          </div>

          <h2 className="font-arcade" style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', color: '#fff', lineHeight: 1, marginBottom: '1rem' }}>
            SIMULADOR DE MATCHUPS & PLANES DE COACHING
          </h2>

          <p style={{ color: '#94a3b8', maxWidth: '720px', margin: '0 auto 2.5rem auto', fontSize: '1.05rem', lineHeight: 1.6 }}>
            El simulador táctico de equipos y la contratación de planes de entrenamiento están reservados para alumnos registrados. Inicia sesión con tu cuenta o regístrate gratis para desbloquear todas las herramientas competitivas.
          </p>

          {/* Feature Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginBottom: '3rem',
            textAlign: 'left'
          }}>
            <div style={{
              background: 'rgba(0, 0, 0, 0.4)',
              border: '1px solid rgba(59, 130, 246, 0.25)',
              borderRadius: '8px',
              padding: '1.1rem'
            }}>
              <Swords size={20} color="#38bdf8" style={{ marginBottom: '0.5rem' }} />
              <div className="font-tech" style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff', marginBottom: '0.2rem' }}>
                Simulador de Equipos
              </div>
              <div style={{ fontSize: '0.78rem', color: '#94a3b8', lineHeight: 1.4 }}>
                Roster de 41 luchadores con sprites originales y regla oficial de contrapartes Orochi.
              </div>
            </div>

            <div style={{
              background: 'rgba(0, 0, 0, 0.4)',
              border: '1px solid rgba(245, 158, 11, 0.25)',
              borderRadius: '8px',
              padding: '1.1rem'
            }}>
              <Zap size={20} color="#fbbf24" style={{ marginBottom: '0.5rem' }} />
              <div className="font-tech" style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff', marginBottom: '0.2rem' }}>
                Sinergia de Barras (Mood)
              </div>
              <div style={{ fontSize: '0.78rem', color: '#94a3b8', lineHeight: 1.4 }}>
                Cálculo de herencia en Advance Mode (+1 barra de amistad o 0 por conflicto Iori/Kyo).
              </div>
            </div>

            <div style={{
              background: 'rgba(0, 0, 0, 0.4)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              borderRadius: '8px',
              padding: '1.1rem'
            }}>
              <Trophy size={20} color="#34d399" style={{ marginBottom: '0.5rem' }} />
              <div className="font-tech" style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff', marginBottom: '0.2rem' }}>
                Matriz 3x3 & Resultado
              </div>
              <div style={{ fontSize: '0.78rem', color: '#94a3b8', lineHeight: 1.4 }}>
                % de victoria por orden (Point, Mid, Anchor) y pronóstico del set de torneo.
              </div>
            </div>

            <div style={{
              background: 'rgba(0, 0, 0, 0.4)',
              border: '1px solid rgba(255, 46, 67, 0.25)',
              borderRadius: '8px',
              padding: '1.1rem'
            }}>
              <Calendar size={20} color="#ff8593" style={{ marginBottom: '0.5rem' }} />
              <div className="font-tech" style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff', marginBottom: '0.2rem' }}>
                Planes de Coaching 1-a-1
              </div>
              <div style={{ fontSize: '0.78rem', color: '#94a3b8', lineHeight: 1.4 }}>
                Acceso a VOD reviews, sparring en Fightcade 2 con delay 0 y preparación para torneos.
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1rem',
            flexWrap: 'wrap'
          }}>
            <button
              type="button"
              className="btn-snk"
              style={{ fontSize: '1.3rem', padding: '0.75rem 2rem' }}
              onClick={() => {
                arcadeAudio.playSelect();
                onOpenLogin();
              }}
            >
              <LogIn size={20} />
              <span>Iniciar Sesión para Desbloquear</span>
            </button>

            <button
              type="button"
              className="btn-snk btn-snk-gold"
              style={{ fontSize: '1.3rem', padding: '0.75rem 2rem' }}
              onClick={() => {
                arcadeAudio.playSelect();
                onOpenRegister();
              }}
            >
              <UserPlus size={20} />
              <span>Crear Cuenta Gratis</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}


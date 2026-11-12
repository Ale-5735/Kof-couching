import React, { useState } from 'react';
import { X, CheckCircle2, Flame, Send, Gamepad2, Calendar, Shield } from 'lucide-react';
import { arcadeAudio } from '../utils/audio';

export function BookingModal({ isOpen, onClose, defaultTeam, selectedPlan }) {
  if (!isOpen) return null;

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    discord: '',
    platform: 'Fightcade 2',
    level: 'Intermedio (Rank C/B)',
    plan: selectedPlan ? selectedPlan.name : 'Matchup Mastery & Sparring Lab',
    team: defaultTeam ? defaultTeam.map((c) => c.name).join(' • ') : 'Iori • Chris • Daimon',
    goals: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    arcadeAudio.playFight();
    setSubmitted(true);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 200,
      background: 'rgba(0, 0, 0, 0.85)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.25rem',
      overflowY: 'auto'
    }}>
      <div className="glass-panel" style={{
        maxWidth: '560px',
        width: '100%',
        padding: '2.2rem',
        border: '1px solid rgba(255, 46, 67, 0.4)',
        boxShadow: '0 0 50px rgba(255, 46, 67, 0.3)',
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
        >
          <X size={22} />
        </button>

        {!submitted ? (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
              <Flame size={22} color="#ff2e43" />
              <span className="badge-arcade" style={{ fontSize: '0.7rem' }}>FIGHTCADE COACHING BOOKING</span>
            </div>
            <h3 className="font-arcade" style={{ fontSize: '2.4rem', color: '#fff', lineHeight: 1, marginBottom: '0.75rem' }}>
              RESERVA TU SESIÓN DE COACHING
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '1.5rem' }}>
              Completa tus datos para coordinar horario por Discord y empezar tu entrenamiento personalizado con frame data y sparring en vivo.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label className="font-tech" style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'block', marginBottom: '0.3rem' }}>
                  Gamertag / Nombre:
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej: KOF_Warrior98"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label className="font-tech" style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'block', marginBottom: '0.3rem' }}>
                    Discord Tag o WhatsApp:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="usuario#1234 o número"
                    value={formData.discord}
                    onChange={(e) => setFormData({ ...formData, discord: e.target.value })}
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
                    Plataforma:
                  </label>
                  <select
                    value={formData.platform}
                    onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                    style={{
                      width: '100%',
                      background: '#090a0f',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '6px',
                      padding: '0.65rem 0.9rem',
                      color: '#fff',
                      fontSize: '0.9rem'
                    }}
                  >
                    <option value="Fightcade 2">Fightcade 2</option>
                    <option value="Steam KOF 98 UM FE">Steam KOF 98 UM FE</option>
                    <option value="Consola / Arcade">Consola / Arcade Físico</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-tech" style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'block', marginBottom: '0.3rem' }}>
                  Tus 3 Personajes Principales (Equipo):
                </label>
                <input
                  type="text"
                  placeholder="Ej: Iori • Orochi Chris • Daimon"
                  value={formData.team}
                  onChange={(e) => setFormData({ ...formData, team: e.target.value })}
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
                  ¿Cuál es tu principal dificultad o meta?:
                </label>
                <textarea
                  rows="3"
                  placeholder="Ej: Sufro mucho contra la presión de safe hops de Chris, o quiero aprender a ejecutar el Roll Cancel de Daimon..."
                  value={formData.goals}
                  onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                  style={{
                    width: '100%',
                    background: '#090a0f',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '6px',
                    padding: '0.65rem 0.9rem',
                    color: '#fff',
                    fontSize: '0.9rem',
                    resize: 'none'
                  }}
                />
              </div>

              <button
                type="submit"
                className="btn-advanced"
                style={{ width: '100%', padding: '0.75rem', marginTop: '0.5rem', fontSize: '1.25rem' }}
              >
                <Send size={18} color="#ffe066" />
                <span>CONFIRMAR SOLICITUD DE CLASE</span>
              </button>
            </form>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(16, 185, 129, 0.15)',
              border: '2px solid #10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem auto'
            }}>
              <CheckCircle2 size={36} color="#10b981" />
            </div>

            <h3 className="font-arcade" style={{ fontSize: '2.5rem', color: '#fff', lineHeight: 1, marginBottom: '0.5rem' }}>
              ¡SOLICITUD REGISTRADA CON ÉXITO!
            </h3>
            <p style={{ color: '#cbd5e1', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.75rem' }}>
              Hemos recibido tu información, <strong>{formData.name}</strong>. Nos comunicaremos contigo en las próximas horas por Discord o WhatsApp para agendar tu primera sesión y preparar los drills de tu equipo: <em>{formData.team}</em>.
            </p>

            <button
              type="button"
              className="btn-advanced"
              style={{ padding: '0.6rem 1.6rem' }}
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
            >
              <span>Volver a la Academia</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}


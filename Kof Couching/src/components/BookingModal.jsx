import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Flame, Send, Gamepad2, Calendar, Shield, User, Sparkles, Trophy } from 'lucide-react';
import { arcadeAudio } from '../utils/audio';
import { saveBookingRequest } from '../utils/bookingStorage';

const AVAILABLE_PLANS = [
  {
    id: 'mastery',
    name: 'Matchup Mastery & Sparring Lab',
    price: '$85 USD',
    duration: '4 Sesiones (1 mes)',
    tag: 'MÁS POPULAR • 4 SESIONES',
    badgeColor: '#ff2e43'
  },
  {
    id: 'diagnostic',
    name: 'VOD Review & Diagnóstico Táctico',
    price: '$25 USD',
    duration: '75 Minutos',
    tag: '1 SESIÓN INTENSIVA',
    badgeColor: '#38bdf8'
  },
  {
    id: 'bootcamp',
    name: 'Pro Tournament Boot Camp',
    price: '$160 USD',
    duration: '8 Sesiones + Acompañamiento',
    tag: 'COMPETITIVO TOTAL',
    badgeColor: '#f59e0b'
  }
];

export function BookingModal({ isOpen, onClose, defaultTeam, selectedPlan, currentUser }) {
  if (!isOpen) return null;

  const [submitted, setSubmitted] = useState(false);
  const [activePlanId, setActivePlanId] = useState(selectedPlan?.id || 'mastery');
  const [formData, setFormData] = useState({
    name: currentUser?.gamertag || '',
    discord: '',
    platform: 'Fightcade 2',
    level: currentUser?.rank || 'Intermedio (Rank C/B)',
    team: defaultTeam && defaultTeam.length > 0 ? defaultTeam.map((c) => c.name).join(' • ') : 'Iori • Orochi Chris • Daimon',
    goals: '',
  });

  // Sync state if currentUser or selectedPlan changes
  useEffect(() => {
    if (currentUser?.gamertag && !formData.name) {
      setFormData((prev) => ({ ...prev, name: currentUser.gamertag }));
    }
    if (selectedPlan?.id) {
      setActivePlanId(selectedPlan.id);
    }
  }, [currentUser, selectedPlan]);

  const resolvedPlan = selectedPlan || AVAILABLE_PLANS.find(p => p.id === activePlanId) || AVAILABLE_PLANS[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    arcadeAudio.playFight();

    // Guardar solicitud asociando al usuario registrado
    await saveBookingRequest({
      userId: currentUser?.id || 'guest',
      userGamertag: currentUser?.gamertag || formData.name,
      userEmail: currentUser?.email || 'Sin correo asociado',
      userRank: currentUser?.rank || formData.level,
      userMainChar: currentUser?.mainChar || 'iori',
      name: formData.name,
      discord: formData.discord,
      platform: formData.platform,
      level: formData.level,
      plan: {
        id: resolvedPlan.id,
        name: resolvedPlan.name,
        price: resolvedPlan.price,
        duration: resolvedPlan.duration,
        tag: resolvedPlan.tag,
        badgeColor: resolvedPlan.badgeColor || '#ff2e43'
      },
      team: formData.team,
      goals: formData.goals,
      status: 'pending'
    });

    setSubmitted(true);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 350,
      background: 'rgba(0, 0, 0, 0.88)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      padding: '1.5rem 1rem',
      overflowY: 'auto'
    }}>
      <div className="glass-panel" style={{
        maxWidth: '580px',
        width: '100%',
        maxHeight: 'min(94vh, 850px)',
        margin: 'auto 0',
        padding: '2.2rem 2rem',
        border: '1px solid rgba(255, 46, 67, 0.4)',
        boxShadow: '0 0 50px rgba(255, 46, 67, 0.3)',
        position: 'relative',
        overflowY: 'auto'
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
            <h3 className="font-arcade" style={{ fontSize: '2.4rem', color: '#fff', lineHeight: 1, marginBottom: '0.5rem' }}>
              RESERVA TU SESIÓN DE COACHING
            </h3>

            {/* Banner de Usuario Registrado */}
            {currentUser && (
              <div
                style={{
                  background: 'rgba(59, 130, 246, 0.1)',
                  border: '1px solid rgba(59, 130, 246, 0.3)',
                  borderRadius: '6px',
                  padding: '0.6rem 0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1.25rem',
                  fontSize: '0.8rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <User size={15} color="#60a5fa" />
                  <span style={{ color: '#cbd5e1' }}>
                    Solicitando como: <strong style={{ color: '#fff' }}>{currentUser.gamertag}</strong>
                  </span>
                </div>
                <span className="badge-cyan" style={{ fontSize: '0.7rem' }}>
                  {currentUser.rank || 'Alumno'}
                </span>
              </div>
            )}

            {/* Banner de Plan Seleccionado */}
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(255, 46, 67, 0.15) 0%, rgba(20, 25, 46, 0.9) 100%)',
                border: '1px solid rgba(255, 46, 67, 0.35)',
                borderRadius: '8px',
                padding: '0.85rem 1rem',
                marginBottom: '1.25rem'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Trophy size={16} color={resolvedPlan.badgeColor || '#ff2e43'} />
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#fbbf24', textTransform: 'uppercase' }}>
                    {resolvedPlan.tag}
                  </span>
                </div>
                <span className="font-neogeo" style={{ fontSize: '1.3rem', color: '#10b981' }}>
                  {resolvedPlan.price}
                </span>
              </div>
              <h4 className="font-tech" style={{ color: '#fff', fontSize: '1.05rem', margin: '0 0 0.2rem 0' }}>
                {resolvedPlan.name}
              </h4>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                Duración: <strong style={{ color: '#cbd5e1' }}>{resolvedPlan.duration}</strong>
              </div>

              {!selectedPlan && (
                <div style={{ marginTop: '0.6rem' }}>
                  <label style={{ fontSize: '0.72rem', color: '#94a3b8', display: 'block', marginBottom: '0.2rem' }}>
                    Cambiar programa:
                  </label>
                  <select
                    value={activePlanId}
                    onChange={(e) => setActivePlanId(e.target.value)}
                    style={{
                      width: '100%',
                      background: 'rgba(0, 0, 0, 0.6)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '4px',
                      padding: '0.4rem 0.6rem',
                      color: '#fff',
                      fontSize: '0.8rem'
                    }}
                  >
                    {AVAILABLE_PLANS.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} ({p.price} - {p.duration})
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label className="font-tech" style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'block', marginBottom: '0.3rem' }}>
                    Gamertag o Nombre:
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

                <div>
                  <label className="font-tech" style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'block', marginBottom: '0.3rem' }}>
                    Discord Tag o WhatsApp:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="usuario#1234 o +54..."
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
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
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

                <div>
                  <label className="font-tech" style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'block', marginBottom: '0.3rem' }}>
                    Nivel Actual:
                  </label>
                  <select
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
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
                    <option value="Principiante (Rank D/E)">Principiante (Rank D/E)</option>
                    <option value="Intermedio (Rank C/B)">Intermedio (Rank C/B)</option>
                    <option value="Avanzado (Rank A)">Avanzado (Rank A)</option>
                    <option value="Competitivo / Élite (Rank S)">Competitivo / Élite (Rank S)</option>
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
            <p style={{ color: '#cbd5e1', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Hemos guardado tu solicitud vinculada a tu cuenta (<strong>{currentUser?.gamertag || formData.name}</strong>) para el programa <strong style={{ color: '#fbbf24' }}>{resolvedPlan.name}</strong> ({resolvedPlan.price}).
            </p>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '1.75rem' }}>
              El entrenador revisará tu solicitud en el Panel de Administración y te contactará vía Discord (<em>{formData.discord}</em>) para coordinar el horario y drills de tu equipo (<em>{formData.team}</em>).
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

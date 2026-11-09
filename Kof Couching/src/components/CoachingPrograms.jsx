import React from 'react';
import { Calendar, Check, Zap, Trophy, Flame, Star, Shield, ArrowRight } from 'lucide-react';
import { arcadeAudio } from '../utils/audio';

export function CoachingPrograms({ onSelectPlan }) {
  const plans = [
    {
      id: 'diagnostic',
      name: 'VOD Review & Diagnóstico Táctico',
      tag: '1 SESIÓN INTENSIVA',
      popular: false,
      price: '$25 USD',
      duration: '75 Minutos',
      desc: 'Ideal para jugadores estancados en Fightcade que no entienden por qué pierden el neutral o sufren ante saltos.',
      features: [
        'Análisis en directo de 3 replays / sets de Fightcade',
        'Detección de patrones predecibles y hábitos de salto nocivos',
        'Optimización de hit-confirms básicos y antiaéreos fiables',
        'Hoja de ruta con drills de práctica en modo entrenamiento',
      ],
      badgeColor: '#38bdf8',
    },
    {
      id: 'mastery',
      name: 'Matchup Mastery & Sparring Lab',
      tag: 'MÁS POPULAR • 4 SESIONES',
      popular: true,
      price: '$85 USD',
      duration: '4 Sesiones (1 mes)',
      desc: 'Programa integral para subir de rango C/B a A/S en Fightcade y competir sólidamente en torneos locales y online.',
      features: [
        'Sparring guiado por Fightcade con 0-1 delay + Discord',
        'Anti-Meta Lab: cómo frenar a Iori, Orochi Chris y Daimon',
        'Manejo estricto de Guard Cancel Roll y safe jumps',
        'Armado de equipo óptimo con herencia de barras positiva',
        'Feedback diario en Discord y resolución de dudas',
      ],
      badgeColor: '#ff2e43',
    },
    {
      id: 'bootcamp',
      name: 'Pro Tournament Boot Camp',
      tag: 'COMPETITIVO TOTAL',
      popular: false,
      price: '$160 USD',
      duration: '8 Sesiones + Acompañamiento',
      desc: 'Para competidores que aspiran a entrar a Top 8 en torneos mayores de KOF 98 (EVO, Fightcade Majors, eventos presenciales).',
      features: [
        'Simulación de brackets de torneo bajo presión real',
        'Psicología competitiva y adaptación en sets largos (FT5 / FT10)',
        'Tech avanzada: Roll cancel bugs, unblockables y fuzzy guards',
        'Acompañamiento y scouting de rivales antes de tus partidas',
        'Acceso de por vida a la comunidad privada de sparrings Top 8',
      ],
      badgeColor: '#f59e0b',
    },
  ];

  return (
    <section id="coaching" style={{ padding: '4.5rem 0 3.5rem 0', position: 'relative' }}>
      <div className="kof-container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div style={{ display: 'inline-flex', marginBottom: '0.75rem' }}>
            <span className="badge-arcade" style={{ borderColor: 'rgba(16, 185, 129, 0.4)', color: '#34d399' }}>
              <Trophy size={14} /> FGC LEVEL UP ROADMAP
            </span>
          </div>
          <h2 className="font-arcade" style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', color: '#fff', lineHeight: 1 }}>
            PLANES DE COACHING & MENTORÍA PERSONALIZADA
          </h2>
          <p style={{ color: '#94a3b8', maxWidth: '750px', margin: '0 auto', fontSize: '1.05rem' }}>
            Aprende directamente de jugadores experimentados con rankings S en Fightcade y podios en torneos internacionales.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          alignItems: 'stretch'
        }}>
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="glass-panel"
              style={{
                padding: '2.2rem 1.75rem',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                border: plan.popular ? '2px solid #ff2e43' : '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: plan.popular ? '0 10px 40px rgba(255, 46, 67, 0.25)' : 'none',
                background: plan.popular
                  ? 'linear-gradient(180deg, rgba(255, 46, 67, 0.08) 0%, rgba(13, 15, 24, 0.95) 100%)'
                  : 'rgba(13, 15, 24, 0.8)'
              }}
            >
              {plan.popular && (
                <div style={{
                  position: 'absolute',
                  top: '-12px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'linear-gradient(90deg, #ff2e43 0%, #f59e0b 100%)',
                  color: '#fff',
                  fontFamily: 'var(--font-arcade)',
                  fontSize: '1.1rem',
                  letterSpacing: '0.08em',
                  padding: '2px 14px',
                  borderRadius: '9999px',
                  boxShadow: '0 4px 15px rgba(255, 46, 67, 0.5)'
                }}>
                  RECOMENDADO
                </div>
              )}

              <div style={{ marginBottom: '1.25rem' }}>
                <span className="font-tech" style={{
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  color: plan.badgeColor,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '0.4rem'
                }}>
                  {plan.tag}
                </span>
                <h3 className="font-arcade" style={{ fontSize: '2.1rem', color: '#fff', lineHeight: 1.1 }}>
                  {plan.name}
                </h3>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginTop: '0.75rem' }}>
                  <span className="font-arcade" style={{ fontSize: '2.8rem', color: '#fff', fontWeight: 700, lineHeight: 1 }}>
                    {plan.price}
                  </span>
                  <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>/ {plan.duration}</span>
                </div>
              </div>

              <p style={{ fontSize: '0.88rem', color: '#cbd5e1', lineHeight: 1.5, marginBottom: '1.5rem' }}>
                {plan.desc}
              </p>

              {/* Feature List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem', marginBottom: '2rem', marginTop: 'auto' }}>
                {plan.features.map((feat, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'start', gap: '0.6rem' }}>
                    <div style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      background: 'rgba(16, 185, 129, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: '2px'
                    }}>
                      <Check size={12} color="#10b981" />
                    </div>
                    <span style={{ fontSize: '0.84rem', color: '#e2e8f0', lineHeight: 1.4 }}>
                      {feat}
                    </span>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <button
                type="button"
                className={plan.popular ? 'btn-snk' : 'btn-ghost'}
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => {
                  arcadeAudio.playCoin();
                  onSelectPlan(plan);
                }}
              >
                <span>Elegir este Plan</span>
                <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


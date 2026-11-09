import React from 'react';
import { Flame, Trophy, Target, Zap, Shield, Play, ArrowDown } from 'lucide-react';
import { arcadeAudio } from '../utils/audio';

export function Hero({ onScrollToSimulator, onOpenBooking }) {
  return (
    <section style={{
      position: 'relative',
      padding: '4.5rem 0 3.5rem 0',
      overflow: 'hidden'
    }}>
      {/* Background Decorative Rings & Glow */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '600px',
        height: '350px',
        background: 'radial-gradient(ellipse at center, rgba(157, 78, 221, 0.25) 0%, rgba(255, 46, 67, 0.15) 50%, transparent 80%)',
        filter: 'blur(60px)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div className="kof-container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        {/* Top Arcade Tag */}
        <div style={{ display: 'inline-flex', marginBottom: '1.25rem' }}>
          <div className="badge-arcade" style={{ gap: '0.6rem', padding: '0.35rem 0.9rem' }}>
            <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#ff2e43', boxShadow: '0 0 8px #ff2e43' }} />
            <span>FIGHTCADE 2 & NEO GEO MVS TOURNAMENT LAB</span>
          </div>
        </div>

        {/* Hero Title */}
        <h1 className="font-arcade" style={{
          fontSize: 'clamp(2.8rem, 6.5vw, 5.2rem)',
          lineHeight: 0.95,
          fontWeight: 700,
          color: '#fff',
          maxWidth: '1050px',
          margin: '0 auto 1.25rem auto',
          textShadow: '0 4px 30px rgba(0, 0, 0, 0.8), 0 0 20px rgba(255, 46, 67, 0.4)'
        }}>
          EL VERDADERO COACHING DE{' '}
          <span style={{
            background: 'linear-gradient(135deg, #ff2e43 0%, #ff8593 50%, #f59e0b 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 0 15px rgba(255, 46, 67, 0.6))'
          }}>
            THE KING OF FIGHTERS '98
          </span>
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
          color: '#94a3b8',
          maxWidth: '820px',
          margin: '0 auto 2.2rem auto',
          lineHeight: 1.6,
          fontWeight: 400
        }}>
          Aprende el metajuego competitivo de <strong>KOF 98</strong> con un simulador táctico de equipos en tiempo real. 
          Optimiza el orden de tus 3 personajes (<span style={{ color: '#38bdf8' }}>Point</span>, <span style={{ color: '#fbbf24' }}>Mid</span>, <span style={{ color: '#ef4444' }}>Anchor</span>), 
          la compatibilidad de medidor (<span style={{ color: '#34d399' }}>Mood System</span>) y recibe recomendaciones de frame data, safe hops y guard cancels.
        </p>

        {/* CTA Button Group */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1rem',
          flexWrap: 'wrap',
          marginBottom: '3.5rem'
        }}>
          <button
            type="button"
            className="btn-snk"
            onClick={() => {
              arcadeAudio.playFight();
              onScrollToSimulator();
            }}
          >
            <Zap size={22} />
            <span>Configurar Equipos en el Simulador</span>
          </button>

          <button
            type="button"
            className="btn-ghost"
            style={{ fontSize: '1.1rem', padding: '0.85rem 1.8rem' }}
            onClick={() => {
              arcadeAudio.playCoin();
              onOpenBooking();
            }}
          >
            <Trophy size={18} color="#f59e0b" />
            <span>Ver Mentorías 1-a-1</span>
          </button>
        </div>

        {/* Quick Competitive Proof Badges */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1rem',
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          <div className="glass-panel" style={{ padding: '1.25rem', textAlign: 'left', display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '8px',
              background: 'rgba(59, 130, 246, 0.15)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Target size={22} color="#3b82f6" />
            </div>
            <div>
              <div className="font-tech" style={{ fontSize: '1.3rem', fontWeight: 700, color: '#fff', lineHeight: 1.1 }}>
                Slot Matchup Tech
              </div>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                Cálculo de Point, Mid y Anchor con % de victoria
              </div>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '1.25rem', textAlign: 'left', display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '8px',
              background: 'rgba(245, 158, 11, 0.15)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Flame size={22} color="#f59e0b" />
            </div>
            <div>
              <div className="font-tech" style={{ fontSize: '1.3rem', fontWeight: 700, color: '#fff', lineHeight: 1.1 }}>
                Mood & Meter System
              </div>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                Detecta herencia (+1 barra) o penalizaciones (0 barras)
              </div>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '1.25rem', textAlign: 'left', display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '8px',
              background: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Trophy size={22} color="#10b981" />
            </div>
            <div>
              <div className="font-tech" style={{ fontSize: '1.3rem', fontWeight: 700, color: '#fff', lineHeight: 1.1 }}>
                FGC Tournament Ready
              </div>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                Estrategias reales probadas en EVO y Fightcade FT10
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


import React from 'react';
import { Trophy, TrendingUp, AlertTriangle, ShieldCheck, Zap, Sparkles, Flame, CheckCircle2, Award } from 'lucide-react';
import { arcadeAudio } from '../utils/audio';

export function FinalVerdict({ evaluation, team1, team2, onOpenBooking }) {
  if (!evaluation || !team1 || !team2 || team1.length < 3 || team2.length < 3) {
    return null;
  }

  const {
    overallWinRate,
    team2WinRate,
    expectedScore,
    matchPace,
    mood1,
    mood2,
    anchorComparison,
    coachingPlaybook,
  } = evaluation;

  const isT1Winner = overallWinRate >= 50;
  const isSweep = overallWinRate >= 65 || overallWinRate <= 35;

  return (
    <section id="final-verdict" style={{
      padding: '4rem 0',
      background: 'linear-gradient(180deg, rgba(6,7,10,0.95) 0%, rgba(13,15,24,1) 50%, rgba(6,7,10,0.95) 100%)',
      position: 'relative',
      borderTop: '1px solid rgba(255, 46, 67, 0.25)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
    }}>
      <div className="kof-container">
        {/* Section Title */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ display: 'inline-flex', marginBottom: '0.75rem' }}>
            <span className="badge-arcade" style={{
              background: 'linear-gradient(135deg, rgba(255, 46, 67, 0.2) 0%, rgba(245, 158, 11, 0.2) 100%)',
              borderColor: '#f59e0b',
              color: '#fbbf24'
            }}>
              <Award size={15} /> MATCH SIMULATION PREDICTION
            </span>
          </div>
          <h2 className="font-arcade" style={{ fontSize: 'clamp(2.6rem, 5.5vw, 4.4rem)', color: '#fff', lineHeight: 1 }}>
            RESULTADO ESPERADO DEL ENFRENTAMIENTO
          </h2>
          <p style={{ color: '#94a3b8', maxWidth: '800px', margin: '0 auto', fontSize: '1.05rem' }}>
            Pronóstico integral combinando probabilidades por slot, compatibilidad de medidor (KOF 98 Mood System) y el factor de remontada del Anchor.
          </p>
        </div>

        {/* Big Outcome Banner */}
        <div className="glass-panel" style={{
          padding: '2.5rem 2rem',
          marginBottom: '2.5rem',
          border: isT1Winner ? '2px solid rgba(59, 130, 246, 0.5)' : '2px solid rgba(239, 68, 68, 0.5)',
          background: isT1Winner
            ? 'radial-gradient(ellipse at 50% 20%, rgba(30, 58, 138, 0.25) 0%, rgba(13, 15, 24, 0.95) 80%)'
            : 'radial-gradient(ellipse at 50% 20%, rgba(153, 27, 27, 0.25) 0%, rgba(13, 15, 24, 0.95) 80%)',
          boxShadow: isT1Winner
            ? '0 0 40px rgba(59, 130, 246, 0.25)'
            : '0 0 40px rgba(239, 68, 68, 0.25)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <span className="font-tech" style={{
              fontSize: '0.9rem',
              letterSpacing: '0.1em',
              color: '#94a3b8',
              textTransform: 'uppercase'
            }}>
              Marcador Estimado de la Serie (3 vs 3)
            </span>
            <div className="font-arcade" style={{
              fontSize: 'clamp(3.8rem, 8vw, 6rem)',
              fontWeight: 700,
              color: '#fff',
              lineHeight: 1,
              marginTop: '0.2rem',
              letterSpacing: '0.06em',
              textShadow: '0 0 25px rgba(255, 255, 255, 0.4)'
            }}>
              {expectedScore}
            </div>
            <div style={{
              display: 'inline-block',
              marginTop: '0.5rem',
              padding: '0.4rem 1.2rem',
              borderRadius: '9999px',
              fontFamily: 'var(--font-tech)',
              fontSize: '0.95rem',
              fontWeight: 700,
              background: isT1Winner ? 'rgba(59, 130, 246, 0.2)' : 'rgba(239, 68, 68, 0.2)',
              color: isT1Winner ? '#60a5fa' : '#f87171',
              border: `1px solid ${isT1Winner ? 'rgba(59, 130, 246, 0.4)' : 'rgba(239, 68, 68, 0.4)'}`
            }}>
              {isT1Winner ? 'PROYECCIÓN FAVORABLE PARA 1P TEAM' : 'PROYECCIÓN FAVORABLE PARA 2P TEAM'} • {matchPace}
            </div>
          </div>

          {/* Probability Bar */}
          <div style={{ maxWidth: '850px', margin: '0 auto 2rem auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#3b82f6' }} />
                <span className="font-tech" style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff' }}>
                  1P Team: {overallWinRate}% Victoria
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="font-tech" style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff' }}>
                  2P Team: {team2WinRate}% Victoria
                </span>
                <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444' }} />
              </div>
            </div>

            <div className="winrate-bar-track" style={{ height: '36px', borderRadius: '18px' }}>
              <div className="winrate-bar-p1" style={{ width: `${overallWinRate}%`, fontSize: '1rem' }}>
                {overallWinRate}% 1P
              </div>
              <div className="winrate-bar-p2" style={{ width: `${team2WinRate}%`, fontSize: '1rem' }}>
                {team2WinRate}% 2P
              </div>
              <div className="vs-divider-pill" style={{ fontSize: '1.3rem' }}>VS</div>
            </div>
          </div>

          {/* Quick Roster Lineup Summary */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            <div style={{
              background: 'rgba(0, 0, 0, 0.35)',
              borderRadius: '8px',
              padding: '1rem',
              border: '1px solid rgba(59, 130, 246, 0.2)'
            }}>
              <span className="font-tech" style={{ fontSize: '0.8rem', color: '#60a5fa', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>
                ALINEACIÓN 1P:
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {team1.map((c, i) => (
                  <span key={i} style={{ fontSize: '0.9rem', color: '#e2e8f0' }}>
                    {c.avatar} <strong>{c.name}</strong> {i < 2 ? '→' : ''}
                  </span>
                ))}
              </div>
            </div>

            <div style={{
              background: 'rgba(0, 0, 0, 0.35)',
              borderRadius: '8px',
              padding: '1rem',
              border: '1px solid rgba(239, 68, 68, 0.2)'
            }}>
              <span className="font-tech" style={{ fontSize: '0.8rem', color: '#f87171', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>
                ALINEACIÓN 2P:
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {team2.map((c, i) => (
                  <span key={i} style={{ fontSize: '0.9rem', color: '#e2e8f0' }}>
                    {c.avatar} <strong>{c.name}</strong> {i < 2 ? '→' : ''}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* In-depth 2-Column Grid: Mood System & Tactical Playbook */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
          marginBottom: '2.5rem'
        }}>
          {/* Sinergia de Barras & Mood Advance Mode */}
          <div className="glass-panel" style={{ padding: '1.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <Flame size={20} color="#f59e0b" />
              <h3 className="font-tech" style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff' }}>
                ANÁLISIS DE BARRAS: MOOD SYSTEM (KOF '98)
              </h3>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '1.25rem' }}>
              En Advance Mode de KOF 98, los personajes transmiten sus barras según su afinidad de personaje: cara feliz (+1 barra), neutra (pasa normal) o enojada (¡destruye el medidor!).
            </p>

            {/* Team 1 Mood Links */}
            <div style={{ marginBottom: '1.5rem' }}>
              <span className="font-tech" style={{ fontSize: '0.8rem', color: '#60a5fa', fontWeight: 700, display: 'block', marginBottom: '0.5rem' }}>
                HERENCIA DE BARRAS DE TU EQUIPO (1P):
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {mood1.links.map((link, idx) => (
                  <div
                    key={idx}
                    className={
                      link.status === 'happy'
                        ? 'mood-badge-happy'
                        : link.status === 'angry'
                        ? 'mood-badge-angry'
                        : 'mood-badge-neutral'
                    }
                    style={{
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem'
                    }}
                  >
                    <span style={{ fontSize: '1.5rem' }}>{link.icon}</span>
                    <div style={{ fontSize: '0.82rem', lineHeight: 1.3 }}>
                      <strong>{link.from.name} → {link.to.name}:</strong> {link.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Team 2 Mood Links */}
            <div>
              <span className="font-tech" style={{ fontSize: '0.8rem', color: '#f87171', fontWeight: 700, display: 'block', marginBottom: '0.5rem' }}>
                HERENCIA DE BARRAS DEL RIVAL (2P):
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {mood2.links.map((link, idx) => (
                  <div
                    key={idx}
                    className={
                      link.status === 'happy'
                        ? 'mood-badge-happy'
                        : link.status === 'angry'
                        ? 'mood-badge-angry'
                        : 'mood-badge-neutral'
                    }
                    style={{
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem'
                    }}
                  >
                    <span style={{ fontSize: '1.5rem' }}>{link.icon}</span>
                    <div style={{ fontSize: '0.82rem', lineHeight: 1.3 }}>
                      <strong>{link.from.name} → {link.to.name}:</strong> {link.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Anchor Clutch Insight */}
            <div style={{
              marginTop: '1.5rem',
              padding: '0.85rem',
              background: 'rgba(0, 0, 0, 0.4)',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.08)'
            }}>
              <span className="font-tech" style={{ fontSize: '0.78rem', color: '#fbbf24', fontWeight: 700, display: 'block', marginBottom: '0.2rem' }}>
                FACTOR DE REMONTADA (ANCHOR CLUTCH):
              </span>
              <span style={{ fontSize: '0.84rem', color: '#cbd5e1' }}>
                {anchorComparison.text}
              </span>
            </div>
          </div>

          {/* Master Coach Tactical Playbook */}
          <div className="glass-panel" style={{ padding: '1.75rem', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <ShieldCheck size={20} color="#10b981" />
              <h3 className="font-tech" style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff' }}>
                PLAN DE PARTIDA DEL COACH (ESTRATEGIA PARA GANAR)
              </h3>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '1.25rem' }}>
              Sigue estas pautas tácticas en tu set competitivo para mitigar las fortalezas del rival y explotar sus debilidades de orden:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', marginBottom: '1.5rem' }}>
              {coachingPlaybook.map((step, idx) => (
                <div key={idx} style={{
                  display: 'flex',
                  alignItems: 'start',
                  gap: '0.75rem',
                  background: 'rgba(16, 185, 129, 0.06)',
                  border: '1px solid rgba(16, 185, 129, 0.2)',
                  borderRadius: '8px',
                  padding: '0.85rem 1rem'
                }}>
                  <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: '#10b981',
                    color: '#000',
                    fontWeight: 700,
                    fontSize: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    {idx + 1}
                  </div>
                  <div style={{ fontSize: '0.86rem', color: '#e2e8f0', lineHeight: 1.45 }}>
                    {step}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Callout CTA */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(255, 46, 67, 0.15) 0%, rgba(157, 78, 221, 0.15) 100%)',
              border: '1px solid rgba(255, 46, 67, 0.3)',
              borderRadius: '8px',
              padding: '1.25rem',
              textAlign: 'center'
            }}>
              <div className="font-arcade" style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '0.3rem' }}>
                ¿QUIERES DOMINAR ESTE MATCHUP EN FIGHTCADE?
              </div>
              <p style={{ fontSize: '0.82rem', color: '#cbd5e1', marginBottom: '1rem' }}>
                Entrena con sesiones de VOD review y sparring 1-on-1 para resolver tus malos hábitos de guardia y ejecución.
              </p>
              <button
                type="button"
                className="btn-snk"
                style={{ padding: '0.6rem 1.4rem', fontSize: '1.15rem' }}
                onClick={() => {
                  arcadeAudio.playCoin();
                  onOpenBooking();
                }}
              >
                <span>Agendar Mentoría 1-a-1</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


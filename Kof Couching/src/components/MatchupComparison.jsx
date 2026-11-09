import React from 'react';
import { Swords, ShieldAlert, Sparkles, AlertCircle, CheckCircle, Flame, ArrowRight, Zap } from 'lucide-react';
import { arcadeAudio } from '../utils/audio';

export function MatchupComparison({ evaluation, team1, team2, onOpenBooking }) {
  if (!evaluation || !team1 || !team2 || team1.length < 3 || team2.length < 3) {
    return (
      <section style={{ padding: '3rem 0', textAlign: 'center' }}>
        <div className="kof-container">
          <div className="glass-panel" style={{
            padding: '3rem 1.5rem',
            maxWidth: '650px',
            margin: '0 auto',
            border: '1px dashed rgba(255, 46, 67, 0.4)'
          }}>
            <Swords size={48} color="#ff2e43" style={{ marginBottom: '1rem' }} />
            <h3 className="font-arcade" style={{ fontSize: '2.4rem', color: '#fff', marginBottom: '0.5rem' }}>
              ESPERANDO SELECCIÓN COMPLETA DE EQUIPOS
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              Selecciona 3 luchadores para tu equipo (1P) y 3 para el rival (2P) en el roster de arriba, o presiona uno de los botones de <strong>Equipos Meta</strong> para cargar un enfrentamiento al instante.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const { slotMatchups } = evaluation;

  return (
    <section id="matchup-breakdown" style={{ padding: '3.5rem 0', position: 'relative' }}>
      <div className="kof-container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ display: 'inline-flex', marginBottom: '0.5rem' }}>
            <span className="badge-arcade" style={{ borderColor: 'rgba(245, 158, 11, 0.4)', color: '#fbbf24' }}>
              <Zap size={14} /> TACTICAL SLOT-BY-SLOT BREAKDOWN
            </span>
          </div>
          <h2 className="font-arcade" style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', color: '#fff', lineHeight: 1 }}>
            COMPARACIÓN DE MATCHUPS POR ORDEN DE PELEA
          </h2>
          <p style={{ color: '#94a3b8', maxWidth: '800px', margin: '0 auto', fontSize: '1rem' }}>
            En KOF 98 el orden define el resultado: evaluamos cada choque según el inicio de medidor (0 barras en Point, 1-2 en Mid, 3 en Anchor), la velocidad de safe hops, el control de espacio y las opciones de reversal.
          </p>
        </div>

        {/* 3 Matches Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {slotMatchups.map((match, idx) => {
            const { char1, char2, p1Rate, p2Rate, p1Advantages, p1Risks, coachVerdict, slotName, slotTip } = match;
            const isFavorable = p1Rate >= 54;
            const isDisadvantaged = p1Rate <= 46;

            return (
              <div
                key={idx}
                className="glass-panel"
                style={{
                  padding: '2rem',
                  border: isFavorable
                    ? '1px solid rgba(59, 130, 246, 0.4)'
                    : isDisadvantaged
                    ? '1px solid rgba(239, 68, 68, 0.4)'
                    : '1px solid rgba(245, 158, 11, 0.4)',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)'
                }}
              >
                {/* Match Header */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '1rem',
                  marginBottom: '1.5rem',
                  paddingBottom: '1rem',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                      padding: '0.3rem 0.8rem',
                      borderRadius: '6px',
                      background: 'linear-gradient(135deg, #ff2e43 0%, #9d4edd 100%)',
                      fontFamily: 'var(--font-arcade)',
                      fontSize: '1.4rem',
                      color: '#fff',
                      lineHeight: 1
                    }}>
                      ROUND {idx + 1}
                    </div>
                    <div>
                      <h3 className="font-tech" style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>
                        {slotName}: {char1.name} <span style={{ color: '#f59e0b' }}>VS</span> {char2.name}
                      </h3>
                      <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                        {slotTip}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className="font-tech" style={{
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      padding: '0.3rem 0.75rem',
                      borderRadius: '4px',
                      background: isFavorable ? 'rgba(59, 130, 246, 0.15)' : isDisadvantaged ? 'rgba(239, 68, 68, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                      color: isFavorable ? '#60a5fa' : isDisadvantaged ? '#f87171' : '#fbbf24',
                      border: `1px solid ${isFavorable ? 'rgba(59, 130, 246, 0.3)' : isDisadvantaged ? 'rgba(239, 68, 68, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`
                    }}>
                      {isFavorable ? 'VENTAJA 1P' : isDisadvantaged ? 'VENTAJA RIVAL (2P)' : 'DUELO EQUILIBRADO 5-5'}
                    </span>
                  </div>
                </div>

                {/* Fighters Visual Confrontation Bar */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(140px, 1fr) 2fr minmax(140px, 1fr)',
                  alignItems: 'center',
                  gap: '1.5rem',
                  marginBottom: '1.75rem'
                }}>
                  {/* P1 Character */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '10px',
                      background: char1.portraitBg,
                      border: `2px solid ${char1.color}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '2rem',
                      flexShrink: 0,
                      boxShadow: `0 0 15px ${char1.color}40`
                    }}>
                      {char1.avatar}
                    </div>
                    <div>
                      <div className="font-tech" style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>
                        {char1.name}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                        1P • Tier {char1.tier}
                      </div>
                    </div>
                  </div>

                  {/* Percentage Bar & VS Pill */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                      <span className="font-tech" style={{ fontSize: '1rem', fontWeight: 700, color: '#60a5fa' }}>
                        {p1Rate}% Tasa de Victoria
                      </span>
                      <span className="font-tech" style={{ fontSize: '1rem', fontWeight: 700, color: '#f87171' }}>
                        {p2Rate}% Tasa de Victoria
                      </span>
                    </div>

                    <div className="winrate-bar-track">
                      <div className="winrate-bar-p1" style={{ width: `${p1Rate}%` }}>
                        {p1Rate}%
                      </div>
                      <div className="winrate-bar-p2" style={{ width: `${p2Rate}%` }}>
                        {p2Rate}%
                      </div>
                      <div className="vs-divider-pill">VS</div>
                    </div>
                  </div>

                  {/* P2 Character */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '1rem' }}>
                    <div style={{ textAlign: 'right' }}>
                      <div className="font-tech" style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>
                        {char2.name}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                        2P • Tier {char2.tier}
                      </div>
                    </div>
                    <div style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '10px',
                      background: char2.portraitBg,
                      border: `2px solid ${char2.color}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '2rem',
                      flexShrink: 0,
                      boxShadow: `0 0 15px ${char2.color}40`
                    }}>
                      {char2.avatar}
                    </div>
                  </div>
                </div>

                {/* Strategic Factors: Advantages & Disadvantages */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '1rem',
                  marginBottom: '1.5rem'
                }}>
                  {/* Ventajas P1 */}
                  <div style={{
                    background: 'rgba(30, 58, 138, 0.15)',
                    border: '1px solid rgba(59, 130, 246, 0.25)',
                    borderRadius: '8px',
                    padding: '1rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
                      <CheckCircle size={16} color="#60a5fa" />
                      <span className="font-tech" style={{ fontSize: '0.85rem', fontWeight: 700, color: '#93c5fd' }}>
                        VENTAJAS & OPORTUNIDADES ({char1.name}):
                      </span>
                    </div>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      {p1Advantages.map((adv, i) => (
                        <li key={i} style={{ fontSize: '0.82rem', color: '#cbd5e1', display: 'flex', gap: '0.4rem', alignItems: 'start' }}>
                          <span style={{ color: '#60a5fa', lineHeight: 1 }}>•</span>
                          <span>{adv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Riesgos y Desventajas P1 */}
                  <div style={{
                    background: 'rgba(153, 27, 27, 0.15)',
                    border: '1px solid rgba(239, 68, 68, 0.25)',
                    borderRadius: '8px',
                    padding: '1rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
                      <ShieldAlert size={16} color="#f87171" />
                      <span className="font-tech" style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fca5a5' }}>
                        RIESGOS CRÍTICOS & AMENAZAS ({char2.name}):
                      </span>
                    </div>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      {p1Risks.map((risk, i) => (
                        <li key={i} style={{ fontSize: '0.82rem', color: '#cbd5e1', display: 'flex', gap: '0.4rem', alignItems: 'start' }}>
                          <span style={{ color: '#f87171', lineHeight: 1 }}>•</span>
                          <span>{risk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Pro Coach Advice Banner */}
                <div style={{
                  background: 'rgba(13, 15, 24, 0.8)',
                  borderLeft: '4px solid #f59e0b',
                  borderRadius: '4px',
                  padding: '0.85rem 1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  flexWrap: 'wrap'
                }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'rgba(245, 158, 11, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Flame size={18} color="#f59e0b" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <span className="font-tech" style={{ fontSize: '0.75rem', fontWeight: 700, color: '#fbbf24', display: 'block' }}>
                      CONSEJO DEL COACH (PRO MATCHUP TECH):
                    </span>
                    <span style={{ fontSize: '0.88rem', color: '#e2e8f0', lineHeight: 1.4 }}>
                      {coachVerdict}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


import React, { useState } from 'react';
import { CHARACTERS, TEAM_PRESETS } from '../data/characters';
import { arcadeAudio } from '../utils/audio';
import { Users, X, Shuffle, ArrowRightLeft, Sparkles, AlertTriangle, Shield, CheckCircle2 } from 'lucide-react';

export function RosterSelect({
  team1,
  team2,
  onSelectCharacter,
  onRemoveCharacter,
  onSwapSlots,
  onApplyPreset,
  onRandomize,
  onClearTeams,
}) {
  const [activeTeamTarget, setActiveTeamTarget] = useState(1); // 1 = P1, 2 = P2
  const [hoveredChar, setHoveredChar] = useState(null);
  const [tierFilter, setTierFilter] = useState('ALL');

  const slotLabels = [
    { title: 'POINT (1º)', desc: '0 Barras / Generador de Presión', color: '#38bdf8' },
    { title: 'MID (2º)', desc: '1-2 Barras / Control de Inercia', color: '#fbbf24' },
    { title: 'ANCHOR (3º)', desc: '3 Barras / Máximo Clutch & Daño', color: '#ef4444' },
  ];

  // Filtering characters
  const filteredChars = CHARACTERS.filter((char) => {
    if (tierFilter === 'ALL') return true;
    if (tierFilter === 'TOP') return char.tier === 'S+' || char.tier === 'S';
    if (tierFilter === 'GRAPPLER') return char.archetype.toLowerCase().includes('grappler');
    if (tierFilter === 'RUSHDOWN') return char.archetype.toLowerCase().includes('rushdown');
    if (tierFilter === 'ZONER') return char.archetype.toLowerCase().includes('zoner');
    return true;
  });

  const handleCardClick = (char) => {
    arcadeAudio.playSelect();
    onSelectCharacter(char, activeTeamTarget);
  };

  const handleCardHover = (char) => {
    setHoveredChar(char);
    arcadeAudio.playHover();
  };

  return (
    <section id="simulator" style={{ padding: '3rem 0', position: 'relative' }}>
      <div className="kof-container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ display: 'inline-flex', marginBottom: '0.75rem' }}>
            <span className="badge-arcade" style={{ background: 'rgba(59, 130, 246, 0.1)', borderColor: 'rgba(59, 130, 246, 0.3)', color: '#60a5fa' }}>
              <Users size={14} /> SELECT YOUR TEAMS • 1P VS 2P
            </span>
          </div>
          <h2 className="font-arcade" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', color: '#fff', lineHeight: 1 }}>
            ROSTER INTERACTIVO & ARMADO DE EQUIPOS
          </h2>
          <p style={{ color: '#94a3b8', maxWidth: '750px', margin: '0 auto', fontSize: '1rem' }}>
            Selecciona 3 luchadores para cada escuadra. Haz hover sobre cualquier personaje para inspeccionar sus estadísticas de torneo, estilo de juego y rol recomendado.
          </p>
        </div>

        {/* Preset Teams & Action Bar */}
        <div className="glass-panel" style={{
          padding: '1rem 1.25rem',
          marginBottom: '2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <span className="font-tech" style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 600 }}>
              EQUIPOS META:
            </span>
            {TEAM_PRESETS.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  arcadeAudio.playFight();
                  onApplyPreset(preset);
                }}
                className="btn-ghost"
                style={{
                  fontSize: '0.8rem',
                  padding: '0.4rem 0.8rem',
                  border: '1px solid rgba(255, 255, 255, 0.12)'
                }}
                title={preset.desc}
              >
                <Sparkles size={13} color="#f59e0b" />
                <span>{preset.name.split(' ')[0]}</span>
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <button
              type="button"
              className="btn-ghost"
              style={{ fontSize: '0.85rem', padding: '0.45rem 0.9rem' }}
              onClick={() => {
                arcadeAudio.playSelect();
                onRandomize();
              }}
            >
              <Shuffle size={14} />
              <span>Aleatorio</span>
            </button>
            <button
              type="button"
              className="btn-ghost"
              style={{ fontSize: '0.85rem', padding: '0.45rem 0.9rem', color: '#f87171' }}
              onClick={() => {
                arcadeAudio.playDeselect();
                onClearTeams();
              }}
            >
              <X size={14} />
              <span>Limpiar</span>
            </button>
          </div>
        </div>

        {/* Team 1 vs Team 2 Displays */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2.5rem'
        }}>
          {/* Team 1 (P1 - Tu Equipo) */}
          <div className="glass-panel" style={{
            padding: '1.25rem',
            border: activeTeamTarget === 1 ? '2px solid #3b82f6' : '1px solid rgba(59, 130, 246, 0.25)',
            boxShadow: activeTeamTarget === 1 ? '0 0 25px rgba(59, 130, 246, 0.25)' : 'none',
            background: 'linear-gradient(180deg, rgba(30, 58, 138, 0.15) 0%, rgba(13, 15, 24, 0.9) 100%)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1rem',
              paddingBottom: '0.75rem',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span className="font-arcade" style={{ fontSize: '1.8rem', color: '#60a5fa', lineHeight: 1 }}>1P TEAM</span>
                <span className="badge-cyan" style={{ fontSize: '0.7rem' }}>TU EQUIPO</span>
              </div>
              <button
                type="button"
                className="btn-ghost"
                onClick={() => {
                  arcadeAudio.playCoin();
                  setActiveTeamTarget(1);
                }}
                style={{
                  fontSize: '0.8rem',
                  padding: '0.35rem 0.8rem',
                  background: activeTeamTarget === 1 ? '#2563eb' : 'transparent',
                  color: activeTeamTarget === 1 ? '#fff' : '#94a3b8',
                  borderColor: activeTeamTarget === 1 ? '#60a5fa' : 'rgba(255,255,255,0.1)'
                }}
              >
                {activeTeamTarget === 1 ? 'Drafteando Aquí...' : 'Seleccionar este equipo'}
              </button>
            </div>

            {/* 3 Slots */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
              {[0, 1, 2].map((slotIdx) => {
                const char = team1[slotIdx];
                const meta = slotLabels[slotIdx];
                return (
                  <div
                    key={slotIdx}
                    className={`team-slot-card ${char ? 'filled' : ''} ${activeTeamTarget === 1 && !char ? 'active-target' : ''}`}
                    style={{ '--slot-team-color': '#3b82f6' }}
                  >
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '0.5rem'
                    }}>
                      <span className="font-tech" style={{ fontSize: '0.75rem', fontWeight: 700, color: meta.color }}>
                        {meta.title}
                      </span>
                      {char && (
                        <button
                          type="button"
                          onClick={() => {
                            arcadeAudio.playDeselect();
                            onRemoveCharacter(1, slotIdx);
                          }}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#94a3b8',
                            cursor: 'pointer',
                            padding: '2px'
                          }}
                          title="Eliminar luchador"
                        >
                          <X size={14} />
                        </button>
                      )}
                    </div>

                    {char ? (
                      <div style={{ textAlign: 'center', marginTop: 'auto', marginBottom: 'auto' }}>
                        <div style={{
                          fontSize: '2.2rem',
                          lineHeight: 1,
                          marginBottom: '0.4rem',
                          filter: 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.5))'
                        }}>
                          {char.avatar}
                        </div>
                        <div className="font-tech" style={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {char.name}
                        </div>
                        <span className="badge-arcade" style={{ fontSize: '0.65rem', padding: '1px 5px', marginTop: '0.25rem' }}>
                          TIER {char.tier}
                        </span>
                      </div>
                    ) : (
                      <div style={{
                        marginTop: 'auto',
                        marginBottom: 'auto',
                        textAlign: 'center',
                        color: '#64748b'
                      }}>
                        <div style={{ fontSize: '1.2rem', marginBottom: '0.2rem' }}>+</div>
                        <div className="font-tech" style={{ fontSize: '0.75rem' }}>Elige {slotIdx + 1}º</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Team 2 (P2 - Rival) */}
          <div className="glass-panel" style={{
            padding: '1.25rem',
            border: activeTeamTarget === 2 ? '2px solid #ef4444' : '1px solid rgba(239, 68, 68, 0.25)',
            boxShadow: activeTeamTarget === 2 ? '0 0 25px rgba(239, 68, 68, 0.25)' : 'none',
            background: 'linear-gradient(180deg, rgba(153, 27, 27, 0.15) 0%, rgba(13, 15, 24, 0.9) 100%)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1rem',
              paddingBottom: '0.75rem',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span className="font-arcade" style={{ fontSize: '1.8rem', color: '#f87171', lineHeight: 1 }}>2P TEAM</span>
                <span className="badge-arcade" style={{ fontSize: '0.7rem' }}>RIVAL</span>
              </div>
              <button
                type="button"
                className="btn-ghost"
                onClick={() => {
                  arcadeAudio.playCoin();
                  setActiveTeamTarget(2);
                }}
                style={{
                  fontSize: '0.8rem',
                  padding: '0.35rem 0.8rem',
                  background: activeTeamTarget === 2 ? '#dc2626' : 'transparent',
                  color: activeTeamTarget === 2 ? '#fff' : '#94a3b8',
                  borderColor: activeTeamTarget === 2 ? '#ef4444' : 'rgba(255,255,255,0.1)'
                }}
              >
                {activeTeamTarget === 2 ? 'Drafteando Aquí...' : 'Seleccionar este equipo'}
              </button>
            </div>

            {/* 3 Slots */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
              {[0, 1, 2].map((slotIdx) => {
                const char = team2[slotIdx];
                const meta = slotLabels[slotIdx];
                return (
                  <div
                    key={slotIdx}
                    className={`team-slot-card ${char ? 'filled' : ''} ${activeTeamTarget === 2 && !char ? 'active-target' : ''}`}
                    style={{ '--slot-team-color': '#ef4444' }}
                  >
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '0.5rem'
                    }}>
                      <span className="font-tech" style={{ fontSize: '0.75rem', fontWeight: 700, color: meta.color }}>
                        {meta.title}
                      </span>
                      {char && (
                        <button
                          type="button"
                          onClick={() => {
                            arcadeAudio.playDeselect();
                            onRemoveCharacter(2, slotIdx);
                          }}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#94a3b8',
                            cursor: 'pointer',
                            padding: '2px'
                          }}
                          title="Eliminar luchador"
                        >
                          <X size={14} />
                        </button>
                      )}
                    </div>

                    {char ? (
                      <div style={{ textAlign: 'center', marginTop: 'auto', marginBottom: 'auto' }}>
                        <div style={{
                          fontSize: '2.2rem',
                          lineHeight: 1,
                          marginBottom: '0.4rem',
                          filter: 'drop-shadow(0 0 10px rgba(239, 68, 68, 0.5))'
                        }}>
                          {char.avatar}
                        </div>
                        <div className="font-tech" style={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {char.name}
                        </div>
                        <span className="badge-arcade" style={{ fontSize: '0.65rem', padding: '1px 5px', marginTop: '0.25rem' }}>
                          TIER {char.tier}
                        </span>
                      </div>
                    ) : (
                      <div style={{
                        marginTop: 'auto',
                        marginBottom: 'auto',
                        textAlign: 'center',
                        color: '#64748b'
                      }}>
                        <div style={{ fontSize: '1.2rem', marginBottom: '0.2rem' }}>+</div>
                        <div className="font-tech" style={{ fontSize: '0.75rem' }}>Elige {slotIdx + 1}º</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Character Roster Grid & Real-time Hover Inspect */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: hoveredChar ? '1fr 340px' : '1fr',
          gap: '1.5rem',
          alignItems: 'start'
        }}>
          {/* Roster Container */}
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            {/* Filter Tabs */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '0.75rem',
              marginBottom: '1.5rem',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              paddingBottom: '0.75rem'
            }}>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {[
                  { id: 'ALL', label: 'Todos' },
                  { id: 'TOP', label: 'God & S-Tier' },
                  { id: 'GRAPPLER', label: 'Grapplers' },
                  { id: 'RUSHDOWN', label: 'Rushdown' },
                  { id: 'ZONER', label: 'Zoners' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setTierFilter(tab.id)}
                    className="btn-ghost"
                    style={{
                      fontSize: '0.8rem',
                      padding: '0.35rem 0.8rem',
                      background: tierFilter === tab.id ? 'rgba(255, 46, 67, 0.2)' : 'transparent',
                      borderColor: tierFilter === tab.id ? '#ff2e43' : 'rgba(255, 255, 255, 0.1)',
                      color: tierFilter === tab.id ? '#fff' : '#94a3b8'
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="font-tech" style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                Haciendo click añades a: <strong style={{ color: activeTeamTarget === 1 ? '#60a5fa' : '#f87171' }}>
                  {activeTeamTarget === 1 ? '1P Equipo' : '2P Rival'}
                </strong>
              </div>
            </div>

            {/* Grid of Characters */}
            <div className="roster-grid">
              {filteredChars.map((char) => {
                const isSelectedInP1 = team1.some((c) => c?.id === char.id);
                const isSelectedInP2 = team2.some((c) => c?.id === char.id);

                return (
                  <div
                    key={char.id}
                    className={`roster-card ${isSelectedInP1 ? 'selected-p1' : ''} ${isSelectedInP2 ? 'selected-p2' : ''}`}
                    style={{
                      '--char-color': char.color,
                      '--char-glow': `${char.color}88`
                    }}
                    onClick={() => handleCardClick(char)}
                    onMouseEnter={() => handleCardHover(char)}
                  >
                    <span className="char-tier-badge" style={{ color: char.color }}>
                      {char.tier}
                    </span>

                    <div className="char-portrait-box" style={{ background: char.portraitBg }}>
                      <span>{char.avatar}</span>
                    </div>

                    <span className="font-tech" style={{
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      color: '#f8fafc',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxWidth: '100%'
                    }}>
                      {char.name}
                    </span>

                    <span style={{ fontSize: '0.68rem', color: '#94a3b8', marginTop: '2px' }}>
                      {char.role.split('/')[0]}
                    </span>

                    {/* Indicators */}
                    {isSelectedInP1 && (
                      <span style={{
                        position: 'absolute',
                        bottom: '4px',
                        left: '4px',
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: '#3b82f6',
                        boxShadow: '0 0 6px #3b82f6'
                      }} title="En 1P Team" />
                    )}
                    {isSelectedInP2 && (
                      <span style={{
                        position: 'absolute',
                        bottom: '4px',
                        right: '4px',
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: '#ef4444',
                        boxShadow: '0 0 6px #ef4444'
                      }} title="En 2P Team" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Hover Character Detail Card / Inspector */}
          {hoveredChar && (
            <div className="glass-panel" style={{
              padding: '1.5rem',
              border: `1px solid ${hoveredChar.color}`,
              boxShadow: `0 0 25px ${hoveredChar.color}40`,
              position: 'sticky',
              top: '5rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '10px',
                  background: hoveredChar.portraitBg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2.5rem',
                  border: `2px solid ${hoveredChar.color}`
                }}>
                  {hoveredChar.avatar}
                </div>
                <div>
                  <div className="badge-arcade" style={{ fontSize: '0.65rem', marginBottom: '0.2rem' }}>
                    TIER {hoveredChar.tier} • {hoveredChar.archetype}
                  </div>
                  <h3 className="font-arcade" style={{ fontSize: '2rem', color: '#fff', lineHeight: 1 }}>
                    {hoveredChar.name}
                  </h3>
                  <div style={{ fontSize: '0.8rem', color: hoveredChar.color }}>
                    "{hoveredChar.title}"
                  </div>
                </div>
              </div>

              {/* Signature move & recommended slot */}
              <div style={{
                background: 'rgba(0,0,0,0.4)',
                borderRadius: '8px',
                padding: '0.75rem',
                marginBottom: '1rem',
                border: '1px solid rgba(255,255,255,0.06)'
              }}>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>GOLPE O SÚPER CLAVE:</div>
                <div className="font-tech" style={{ fontSize: '0.9rem', color: '#fbbf24', fontWeight: 600 }}>
                  {hoveredChar.signatureMove}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.4rem' }}>POSICIÓN ÓPTIMA:</div>
                <div className="font-tech" style={{ fontSize: '0.85rem', color: '#38bdf8' }}>
                  {hoveredChar.role}
                </div>
              </div>

              {/* Radar stats */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', marginBottom: '1.25rem' }}>
                {[
                  { label: 'Juego Neutral & Pokes', val: hoveredChar.stats.neutral },
                  { label: 'Daño & Castigos (Combos)', val: hoveredChar.stats.damage },
                  { label: 'Poder sin Barra (Point)', val: hoveredChar.stats.meterless },
                  { label: 'Antiaéreos & Reversals', val: hoveredChar.stats.antiAir },
                  { label: 'Apertura de Guardia / Mixup', val: hoveredChar.stats.mixup },
                ].map((st, i) => (
                  <div key={i}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#cbd5e1' }}>
                      <span>{st.label}</span>
                      <strong style={{ color: hoveredChar.color }}>{st.val}</strong>
                    </div>
                    <div style={{ height: '5px', background: '#1e293b', borderRadius: '3px', overflow: 'hidden', marginTop: '2px' }}>
                      <div style={{
                        width: `${st.val}%`,
                        height: '100%',
                        background: hoveredChar.color,
                        borderRadius: '3px'
                      }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Coach Tip Snippet */}
              <div style={{
                fontSize: '0.8rem',
                color: '#cbd5e1',
                lineHeight: 1.5,
                borderTop: '1px solid rgba(255,255,255,0.1)',
                paddingTop: '0.75rem'
              }}>
                <strong style={{ color: '#ff8593', display: 'block', marginBottom: '0.2rem' }}>
                  Consejo del Coach:
                </strong>
                {hoveredChar.coachAdvice}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}


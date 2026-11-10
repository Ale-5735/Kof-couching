import React, { useState } from 'react';
import { CHARACTERS, TEAM_PRESETS, OROCHI_COUNTERPARTS } from '../data/characters';
import { CHARACTER_IMAGES, UI_ICONS } from '../assets/characterImages';
import { arcadeAudio } from '../utils/audio';
import { Users, X, Shuffle, Sparkles, Plus, AlertTriangle, ShieldAlert } from 'lucide-react';

export function RosterSelect({
  team1,
  team2,
  onSelectCharacter,
  onRemoveCharacter,
  onApplyPreset,
  onRandomize,
  onClearTeams,
}) {
  // activeTarget: { team: 1 | 2, slot: 0 | 1 | 2 }
  const [activeTarget, setActiveTarget] = useState(() => {
    const p1Empty = team1.findIndex((c) => !c);
    if (p1Empty !== -1) return { team: 1, slot: p1Empty };
    const p2Empty = team2.findIndex((c) => !c);
    if (p2Empty !== -1) return { team: 2, slot: p2Empty };
    return { team: 1, slot: 0 };
  });

  const [hoveredChar, setHoveredChar] = useState(null);
  const [tierFilter, setTierFilter] = useState('ALL');
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [conflictToast, setConflictToast] = useState(null);

  const slotLabels = [
    { title: 'POINT (1º)', roleDesc: 'Iniciador • 0 Barras', color: '#38bdf8' },
    { title: 'MID (2º)', roleDesc: 'Control • 1-2 Barras', color: '#fbbf24' },
    { title: 'ANCHOR (3º)', roleDesc: 'Clutch Final • 3 Barras', color: '#ef4444' },
  ];

  // Current active team being drafted
  const currentTeam = activeTarget.team === 1 ? team1 : team2;

  // Check if character or its Orochi counterpart is blocked for the current drafting team
  const getConflictInfo = (char) => {
    if (!char) return { isBlocked: false, reason: '' };

    for (let idx = 0; idx < currentTeam.length; idx++) {
      // If replacing this exact slot, don't count it as a conflict
      if (idx === activeTarget.slot) continue;

      const existing = currentTeam[idx];
      if (!existing) continue;

      // 1. Same character already on team
      if (existing.id === char.id) {
        return {
          isBlocked: true,
          reason: `${char.name} ya está en este equipo (${slotLabels[idx].title}).`,
          badge: 'YA EN EQUIPO',
        };
      }

      // 2. Orochi counterpart check (Chris <-> O.Chris, Yashiro <-> O.Yashiro, Shermie <-> O.Shermie)
      if (OROCHI_COUNTERPARTS[char.id] === existing.id) {
        return {
          isBlocked: true,
          reason: `¡Regla Oficial KOF 98! No puedes tener a ${char.name} y a su versión ${existing.name} en el mismo equipo (elegido en ${slotLabels[idx].title}).`,
          badge: 'CONTRAPARTE ACTIVA',
        };
      }
    }

    return { isBlocked: false, reason: '' };
  };

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
    const conflict = getConflictInfo(char);
    if (conflict.isBlocked) {
      arcadeAudio.playDeselect();
      setConflictToast(conflict.reason);
      setTimeout(() => setConflictToast(null), 4500);
      return;
    }

    setConflictToast(null);
    arcadeAudio.playSelect();
    onSelectCharacter(char, activeTarget.team, activeTarget.slot);

    // Auto-advance target slot to the next available empty slot
    if (activeTarget.team === 1) {
      const nextP1 = team1.findIndex((c, idx) => !c && idx !== activeTarget.slot);
      if (nextP1 !== -1) {
        setActiveTarget({ team: 1, slot: nextP1 });
      } else {
        const nextP2 = team2.findIndex((c) => !c);
        if (nextP2 !== -1) {
          setActiveTarget({ team: 2, slot: nextP2 });
        }
      }
    } else {
      const nextP2 = team2.findIndex((c, idx) => !c && idx !== activeTarget.slot);
      if (nextP2 !== -1) {
        setActiveTarget({ team: 2, slot: nextP2 });
      } else {
        const nextP1 = team1.findIndex((c) => !c);
        if (nextP1 !== -1) {
          setActiveTarget({ team: 1, slot: nextP1 });
        }
      }
    }
  };

  const handleSlotClick = (teamNum, slotIdx) => {
    arcadeAudio.playHover();
    setActiveTarget({ team: teamNum, slot: slotIdx });
  };

  const handleCardHover = (char) => {
    setHoveredChar(char);
    arcadeAudio.playHover();
  };

  // Helper to render an empty or filled team slot
  const renderTeamSlot = (char, slotIdx, teamNum) => {
    const meta = slotLabels[slotIdx];
    const isTarget = activeTarget.team === teamNum && activeTarget.slot === slotIdx;
    const isP1 = teamNum === 1;
    const teamAccent = isP1 ? '#3b82f6' : '#ef4444';
    const charImg = char ? CHARACTER_IMAGES[char.id] : null;

    return (
      <div
        key={slotIdx}
        onClick={() => handleSlotClick(teamNum, slotIdx)}
        className={`team-slot-card ${char ? 'filled' : 'empty-slot'}`}
        style={{
          cursor: 'pointer',
          position: 'relative',
          padding: '0.85rem',
          minHeight: '190px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderRadius: '10px',
          background: char
            ? 'linear-gradient(180deg, rgba(17, 24, 39, 0.95) 0%, rgba(9, 10, 15, 0.95) 100%)'
            : isTarget
            ? isP1
              ? 'rgba(59, 130, 246, 0.12)'
              : 'rgba(239, 68, 68, 0.12)'
            : 'rgba(10, 12, 18, 0.6)',
          border: isTarget
            ? `2px solid ${isP1 ? '#60a5fa' : '#f87171'}`
            : char
            ? `1px solid ${char.color || teamAccent}`
            : '1px dashed rgba(255, 255, 255, 0.18)',
          boxShadow: isTarget
            ? `0 0 20px ${isP1 ? 'rgba(59, 130, 246, 0.45)' : 'rgba(239, 68, 68, 0.45)'}`
            : char
            ? `0 4px 15px rgba(0, 0, 0, 0.5)`
            : 'none',
          transition: 'all 0.2s ease',
        }}
      >
        {/* Active Target Cursor Indicator */}
        {isTarget && (
          <div style={{
            position: 'absolute',
            top: '-10px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: isP1 ? '#2563eb' : '#dc2626',
            color: '#fff',
            fontFamily: 'var(--font-arcade)',
            fontSize: '0.85rem',
            padding: '1px 8px',
            borderRadius: '4px',
            letterSpacing: '0.05em',
            boxShadow: '0 2px 8px rgba(0,0,0,0.6)',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            whiteSpace: 'nowrap'
          }}>
            <img
              src={isP1 ? UI_ICONS.p1Cursor : UI_ICONS.p2Cursor}
              alt=""
              style={{ width: '12px', height: '12px', imageRendering: 'pixelated' }}
            />
            <span>ELIGE AQUÍ</span>
          </div>
        )}

        {/* Slot Header Label */}
        <div style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          paddingBottom: '0.35rem',
          marginBottom: '0.5rem'
        }}>
          <span className="font-tech" style={{ fontSize: '0.75rem', fontWeight: 700, color: meta.color }}>
            {meta.title}
          </span>
          {char && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                arcadeAudio.playDeselect();
                onRemoveCharacter(teamNum, slotIdx);
              }}
              style={{
                background: 'rgba(239, 68, 68, 0.2)',
                border: '1px solid rgba(239, 68, 68, 0.4)',
                borderRadius: '4px',
                color: '#f87171',
                cursor: 'pointer',
                padding: '2px 4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                lineHeight: 1
              }}
              title="Vaciar este recuadro"
            >
              <X size={12} />
            </button>
          )}
        </div>

        {/* Slot Body: Filled Character or Empty Placeholder */}
        {char ? (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            marginTop: 'auto',
            marginBottom: 'auto'
          }}>
            {/* Character Portrait Image */}
            <div style={{
              width: '72px',
              height: '72px',
              borderRadius: '8px',
              background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.8) 100%)',
              border: `2px solid ${char.color || teamAccent}`,
              boxShadow: `0 0 15px ${char.color ? char.color + '50' : 'rgba(0,0,0,0.5)'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              marginBottom: '0.5rem'
            }}>
              {charImg ? (
                <img
                  src={charImg}
                  alt={char.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    imageRendering: 'pixelated'
                  }}
                />
              ) : (
                <span style={{ fontSize: '2.2rem' }}>{char.avatar}</span>
              )}
            </div>

            {/* Character Name & Tier */}
            <div className="font-tech" style={{
              fontSize: '0.92rem',
              fontWeight: 700,
              color: '#fff',
              textAlign: 'center',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: '100%'
            }}>
              {char.name}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '0.2rem' }}>
              <span className="badge-arcade" style={{
                fontSize: '0.65rem',
                padding: '1px 5px',
                borderColor: char.color,
                color: char.color
              }}>
                TIER {char.tier}
              </span>
            </div>
          </div>
        ) : (
          /* Empty Box Placeholder */
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 'auto',
            marginBottom: 'auto',
            textAlign: 'center',
            color: '#64748b',
            width: '100%',
            padding: '0.5rem 0'
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '8px',
              border: '2px dashed rgba(255, 255, 255, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '0.5rem',
              background: 'rgba(0, 0, 0, 0.3)'
            }}>
              <Plus size={24} color={isTarget ? (isP1 ? '#60a5fa' : '#f87171') : '#475569'} />
            </div>

            <span className="font-tech" style={{
              fontSize: '0.78rem',
              fontWeight: 600,
              color: isTarget ? (isP1 ? '#93c5fd' : '#fca5a5') : '#94a3b8'
            }}>
              [RECUADRO VACÍO]
            </span>
            <span style={{ fontSize: '0.68rem', color: '#64748b', marginTop: '2px' }}>
              {meta.roleDesc}
            </span>
          </div>
        )}

        {/* Slot Bottom Role Tag */}
        <div style={{
          fontSize: '0.68rem',
          color: char ? '#94a3b8' : '#64748b',
          textAlign: 'center',
          marginTop: 'auto',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          width: '100%',
          paddingTop: '0.3rem'
        }}>
          {char ? char.archetype.split('/')[0] : 'Haz click para asignar'}
        </div>
      </div>
    );
  };

  const p1FilledCount = team1.filter(Boolean).length;
  const p2FilledCount = team2.filter(Boolean).length;

  return (
    <section id="simulator" style={{ padding: '3rem 0', position: 'relative' }}>
      {/* Injected CSS to enforce custom P1 / P2 cursor on hover and switch to SELECT on left-click */}
      <style>{`
        .roster-card.p1-turn-cursor {
          cursor: url("${UI_ICONS.p1Cursor}") 14 14, pointer !important;
        }
        .roster-card.p1-turn-cursor:active,
        .roster-card.p1-turn-cursor.clicking {
          cursor: url("${UI_ICONS.p1CursorSelect}") 14 14, pointer !important;
        }

        .roster-card.p2-turn-cursor {
          cursor: url("${UI_ICONS.p2Cursor}") 14 14, pointer !important;
        }
        .roster-card.p2-turn-cursor:active,
        .roster-card.p2-turn-cursor.clicking {
          cursor: url("${UI_ICONS.p2CursorSelect}") 14 14, pointer !important;
        }

        .roster-card.is-blocked {
          cursor: not-allowed !important;
          opacity: 0.36 !important;
          filter: grayscale(80%) !important;
        }
        .roster-card.is-blocked:hover {
          transform: none !important;
          border-color: rgba(239, 68, 68, 0.5) !important;
          box-shadow: none !important;
        }
      `}</style>

      <div className="kof-container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ display: 'inline-flex', marginBottom: '0.75rem' }}>
            <span className="badge-arcade" style={{ background: 'rgba(59, 130, 246, 0.1)', borderColor: 'rgba(59, 130, 246, 0.3)', color: '#60a5fa' }}>
              <Users size={14} /> SELECT YOUR FIGHTERS • KOF '98 ROSTER
            </span>
          </div>
          <h2 className="font-arcade" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', color: '#fff', lineHeight: 1 }}>
            ARMADO DE EQUIPOS 1P VS 2P
          </h2>
          <p style={{ color: '#94a3b8', maxWidth: '780px', margin: '0 auto', fontSize: '1rem' }}>
            Haz click en cualquier <strong>recuadro vacío</strong> de tu equipo o del rival, y luego pulsa sobre la <strong>imagen del personaje</strong> en el roster para asignarlo. El cursor cambiará al cursor oficial de <strong>1P</strong> o <strong>2P</strong>, y se activará en modo <em>SELECT</em> al hacer click.
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
              PRESETS COMPETITIVOS:
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
              title="Llenar ambos equipos con luchadores aleatorios (respetando reglas de contraparte)"
            >
              <img src={UI_ICONS.random} alt="Random" style={{ width: '16px', height: '16px', imageRendering: 'pixelated' }} />
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
              title="Vaciar todos los recuadros de ambos equipos"
            >
              <X size={14} />
              <span>Vaciar Recuadros</span>
            </button>
          </div>
        </div>

        {/* Conflict Toast Alert Banner */}
        {conflictToast && (
          <div style={{
            background: 'linear-gradient(90deg, rgba(239, 68, 68, 0.25) 0%, rgba(185, 28, 28, 0.15) 100%)',
            border: '1px solid #ef4444',
            borderRadius: '8px',
            padding: '0.85rem 1.25rem',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            boxShadow: '0 0 20px rgba(239, 68, 68, 0.35)',
            animation: 'fadeIn 0.2s ease-in'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <ShieldAlert size={22} color="#f87171" style={{ flexShrink: 0 }} />
              <div style={{ fontSize: '0.88rem', color: '#fecaca', lineHeight: 1.4 }}>
                <strong style={{ color: '#fff' }}>RESTRICCIÓN DE TORNEO:</strong> {conflictToast}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setConflictToast(null)}
              style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer' }}
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* Team 1 vs Team 2 Empty/Filled Slot Displays */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2.5rem'
        }}>
          {/* Team 1 (P1 - Tu Equipo) */}
          <div className="glass-panel" style={{
            padding: '1.25rem',
            border: activeTarget.team === 1 ? '2px solid #3b82f6' : '1px solid rgba(59, 130, 246, 0.25)',
            boxShadow: activeTarget.team === 1 ? '0 0 25px rgba(59, 130, 246, 0.25)' : 'none',
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
                <img src={UI_ICONS.p1Cursor} alt="P1" style={{ width: '20px', height: '20px', imageRendering: 'pixelated' }} />
                <span className="font-arcade" style={{ fontSize: '1.8rem', color: '#60a5fa', lineHeight: 1 }}>1P TEAM</span>
                <span className="badge-cyan" style={{ fontSize: '0.7rem' }}>TU EQUIPO ({p1FilledCount}/3)</span>
              </div>
              <button
                type="button"
                className="btn-ghost"
                onClick={() => {
                  arcadeAudio.playCoin();
                  const firstEmpty = team1.findIndex((c) => !c);
                  setActiveTarget({ team: 1, slot: firstEmpty !== -1 ? firstEmpty : 0 });
                }}
                style={{
                  fontSize: '0.8rem',
                  padding: '0.35rem 0.8rem',
                  background: activeTarget.team === 1 ? '#2563eb' : 'transparent',
                  color: activeTarget.team === 1 ? '#fff' : '#94a3b8',
                  borderColor: activeTarget.team === 1 ? '#60a5fa' : 'rgba(255,255,255,0.1)'
                }}
              >
                {activeTarget.team === 1 ? 'Drafteando Aquí...' : 'Seleccionar para 1P'}
              </button>
            </div>

            {/* 3 Slots for Team 1 */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
              {[0, 1, 2].map((slotIdx) => renderTeamSlot(team1[slotIdx], slotIdx, 1))}
            </div>
          </div>

          {/* Team 2 (P2 - Rival) */}
          <div className="glass-panel" style={{
            padding: '1.25rem',
            border: activeTarget.team === 2 ? '2px solid #ef4444' : '1px solid rgba(239, 68, 68, 0.25)',
            boxShadow: activeTarget.team === 2 ? '0 0 25px rgba(239, 68, 68, 0.25)' : 'none',
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
                <img src={UI_ICONS.p2Cursor} alt="P2" style={{ width: '20px', height: '20px', imageRendering: 'pixelated' }} />
                <span className="font-arcade" style={{ fontSize: '1.8rem', color: '#f87171', lineHeight: 1 }}>2P TEAM</span>
                <span className="badge-arcade" style={{ fontSize: '0.7rem' }}>RIVAL ({p2FilledCount}/3)</span>
              </div>
              <button
                type="button"
                className="btn-ghost"
                onClick={() => {
                  arcadeAudio.playCoin();
                  const firstEmpty = team2.findIndex((c) => !c);
                  setActiveTarget({ team: 2, slot: firstEmpty !== -1 ? firstEmpty : 0 });
                }}
                style={{
                  fontSize: '0.8rem',
                  padding: '0.35rem 0.8rem',
                  background: activeTarget.team === 2 ? '#dc2626' : 'transparent',
                  color: activeTarget.team === 2 ? '#fff' : '#94a3b8',
                  borderColor: activeTarget.team === 2 ? '#ef4444' : 'rgba(255,255,255,0.1)'
                }}
              >
                {activeTarget.team === 2 ? 'Drafteando Aquí...' : 'Seleccionar para 2P'}
              </button>
            </div>

            {/* 3 Slots for Team 2 */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
              {[0, 1, 2].map((slotIdx) => renderTeamSlot(team2[slotIdx], slotIdx, 2))}
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
            {/* Filter Tabs & Drafting Target Status */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '0.75rem',
              marginBottom: '1.25rem',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              paddingBottom: '0.75rem'
            }}>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {[
                  { id: 'ALL', label: 'Todos (41)' },
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
                      fontSize: '0.78rem',
                      padding: '0.3rem 0.75rem',
                      background: tierFilter === tab.id ? 'rgba(255, 46, 67, 0.2)' : 'transparent',
                      borderColor: tierFilter === tab.id ? '#ff2e43' : 'rgba(255, 255, 255, 0.1)',
                      color: tierFilter === tab.id ? '#fff' : '#94a3b8'
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="font-tech" style={{
                fontSize: '0.82rem',
                color: '#cbd5e1',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <img
                  src={activeTarget.team === 1 ? UI_ICONS.p1Cursor : UI_ICONS.p2Cursor}
                  alt=""
                  style={{ width: '16px', height: '16px', imageRendering: 'pixelated' }}
                />
                <span>Eligiendo con cursor <strong style={{ color: activeTarget.team === 1 ? '#60a5fa' : '#f87171' }}>{activeTarget.team === 1 ? '1P' : '2P'}</strong> para:</span>
                <strong style={{ color: activeTarget.team === 1 ? '#60a5fa' : '#f87171' }}>
                  {slotLabels[activeTarget.slot].title}
                </strong>
              </div>
            </div>

            {/* Grid of Characters with Custom Cursors and Counterpart Block */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(96px, 1fr))',
                gap: '0.65rem'
              }}
              onMouseDown={() => setIsMouseDown(true)}
              onMouseUp={() => setIsMouseDown(false)}
              onMouseLeave={() => setIsMouseDown(false)}
            >
              {filteredChars.map((char) => {
                const isSelectedInP1 = team1.some((c) => c?.id === char.id);
                const isSelectedInP2 = team2.some((c) => c?.id === char.id);
                const charImg = CHARACTER_IMAGES[char.id];
                const conflict = getConflictInfo(char);

                // Determine cursor class
                const cursorClass = conflict.isBlocked
                  ? 'is-blocked'
                  : activeTarget.team === 1
                  ? 'p1-turn-cursor'
                  : 'p2-turn-cursor';

                return (
                  <div
                    key={char.id}
                    className={`roster-card ${cursorClass} ${isMouseDown ? 'clicking' : ''} ${isSelectedInP1 ? 'selected-p1' : ''} ${isSelectedInP2 ? 'selected-p2' : ''}`}
                    style={{
                      '--char-color': char.color,
                      '--char-glow': `${char.color}88`,
                      padding: '0.45rem',
                      borderRadius: '8px',
                      background: isSelectedInP1
                        ? 'rgba(30, 58, 138, 0.4)'
                        : isSelectedInP2
                        ? 'rgba(153, 27, 27, 0.4)'
                        : conflict.isBlocked
                        ? 'rgba(10, 10, 15, 0.5)'
                        : 'rgba(13, 15, 24, 0.85)',
                      border: isSelectedInP1
                        ? '2px solid #3b82f6'
                        : isSelectedInP2
                        ? '2px solid #ef4444'
                        : conflict.isBlocked
                        ? '1px solid rgba(239, 68, 68, 0.3)'
                        : '1px solid rgba(255, 255, 255, 0.1)',
                      position: 'relative',
                    }}
                    onClick={() => handleCardClick(char)}
                    onMouseEnter={() => handleCardHover(char)}
                    title={conflict.isBlocked ? conflict.reason : `${char.name} (${char.tier})`}
                  >
                    {/* Visual Retro Player Cursor Indicator floating on hovered card */}
                    {hoveredChar?.id === char.id && !conflict.isBlocked && (
                      <div style={{
                        position: 'absolute',
                        top: '-8px',
                        left: '-8px',
                        zIndex: 25,
                        pointerEvents: 'none',
                        animation: 'bounceCursor 0.4s infinite alternate ease-in-out'
                      }}>
                        <img
                          src={
                            isMouseDown
                              ? activeTarget.team === 1
                                ? UI_ICONS.p1CursorSelect
                                : UI_ICONS.p2CursorSelect
                              : activeTarget.team === 1
                              ? UI_ICONS.p1Cursor
                              : UI_ICONS.p2Cursor
                          }
                          alt="Cursor"
                          style={{
                            width: '26px',
                            height: '26px',
                            imageRendering: 'pixelated',
                            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.9))'
                          }}
                        />
                      </div>
                    )}

                    {/* Character Sprite Image */}
                    <div style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(0,0,0,0.6) 100%)',
                      border: `1px solid ${char.color || 'rgba(255,255,255,0.15)'}`,
                      marginBottom: '0.35rem',
                      overflow: 'hidden'
                    }}>
                      {charImg ? (
                        <img
                          src={charImg}
                          alt={char.name}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            imageRendering: 'pixelated'
                          }}
                        />
                      ) : (
                        <span style={{ fontSize: '1.6rem' }}>{char.avatar}</span>
                      )}
                    </div>

                    {/* Character Name */}
                    <span className="font-tech" style={{
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      color: conflict.isBlocked ? '#94a3b8' : '#f8fafc',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxWidth: '100%',
                      display: 'block'
                    }}>
                      {char.name.split(' ')[0]}
                    </span>

                    {/* Tier or Conflict Badge */}
                    {conflict.isBlocked ? (
                      <span style={{
                        fontSize: '0.58rem',
                        fontFamily: 'var(--font-tech)',
                        color: '#f87171',
                        fontWeight: 700,
                        marginTop: '1px'
                      }}>
                        {conflict.badge}
                      </span>
                    ) : (
                      <span style={{
                        fontSize: '0.62rem',
                        fontFamily: 'var(--font-tech)',
                        color: char.color,
                        fontWeight: 700,
                        marginTop: '1px'
                      }}>
                        {char.tier}
                      </span>
                    )}

                    {/* Selected Indicator Tags */}
                    {isSelectedInP1 && (
                      <span style={{
                        position: 'absolute',
                        top: '4px',
                        left: '4px',
                        background: '#3b82f6',
                        color: '#fff',
                        fontFamily: 'var(--font-arcade)',
                        fontSize: '0.65rem',
                        padding: '1px 3px',
                        borderRadius: '2px',
                        lineHeight: 1
                      }}>
                        1P
                      </span>
                    )}
                    {isSelectedInP2 && (
                      <span style={{
                        position: 'absolute',
                        top: '4px',
                        right: '4px',
                        background: '#ef4444',
                        color: '#fff',
                        fontFamily: 'var(--font-arcade)',
                        fontSize: '0.65rem',
                        padding: '1px 3px',
                        borderRadius: '2px',
                        lineHeight: 1
                      }}>
                        2P
                      </span>
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
                  width: '74px',
                  height: '74px',
                  borderRadius: '10px',
                  background: hoveredChar.portraitBg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: `2px solid ${hoveredChar.color}`,
                  overflow: 'hidden',
                  flexShrink: 0
                }}>
                  {CHARACTER_IMAGES[hoveredChar.id] ? (
                    <img
                      src={CHARACTER_IMAGES[hoveredChar.id]}
                      alt={hoveredChar.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        imageRendering: 'pixelated'
                      }}
                    />
                  ) : (
                    <span style={{ fontSize: '2.5rem' }}>{hoveredChar.avatar}</span>
                  )}
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

              {/* Counterpart info if Orochi character */}
              {OROCHI_COUNTERPARTS[hoveredChar.id] && (
                <div style={{
                  background: 'rgba(168, 85, 247, 0.15)',
                  border: '1px solid rgba(168, 85, 247, 0.3)',
                  borderRadius: '6px',
                  padding: '0.5rem 0.75rem',
                  fontSize: '0.78rem',
                  color: '#e9d5ff',
                  marginBottom: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <AlertTriangle size={14} color="#c084fc" />
                  <span>
                    Tiene contraparte ({CHARACTERS.find((c) => c.id === OROCHI_COUNTERPARTS[hoveredChar.id])?.name}). No seleccionables juntos.
                  </span>
                </div>
              )}

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

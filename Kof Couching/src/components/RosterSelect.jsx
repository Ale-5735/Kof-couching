import React, { useState, useEffect } from 'react';
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
  const [lastClickedChar, setLastClickedChar] = useState(null);
  const [tierFilter, setTierFilter] = useState('ALL');
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [conflictToast, setConflictToast] = useState(null);

  // Active character to show in the inspector (hover preview takes precedence over pinned clicked character)
  const activeInspectChar = hoveredChar || lastClickedChar;

  // Global mouseup to guarantee mouse drag never leaves isMouseDown stuck
  useEffect(() => {
    const handleGlobalMouseUp = () => setIsMouseDown(false);
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, []);

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

      // 1. Same character already on team (allow clicking to deselect)
      if (existing.id === char.id) {
        return {
          isBlocked: false,
          isAlreadyInTeam: true,
          slotIdx: idx,
          badge: 'EN EQUIPO',
          reason: `${char.name} ya está en este equipo (${slotLabels[idx].title}). Clic para deseleccionarlo.`,
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
    // Retain this character in the inspector upon click
    setLastClickedChar(char);

    // 1. Check if clicked character is ALREADY in the active drafting team:
    // If so, DESELECT it!
    const currentTeam = activeTarget.team === 1 ? team1 : team2;
    const existingSlotIdx = currentTeam.findIndex((c) => c?.id === char.id);

    if (existingSlotIdx !== -1) {
      arcadeAudio.playDeselect();
      onRemoveCharacter(activeTarget.team, existingSlotIdx);
      // Retarget to the slot that was just cleared so user can easily re-pick
      setActiveTarget({ team: activeTarget.team, slot: existingSlotIdx });
      setConflictToast(`Deseleccionado: ${char.name} del equipo ${activeTarget.team}P`);
      setTimeout(() => setConflictToast(null), 2500);
      return;
    }

    // 2. Check for Orochi counterpart or other conflict rules
    const conflict = getConflictInfo(char);
    if (conflict.isBlocked) {
      arcadeAudio.playDeselect();
      setConflictToast(conflict.reason);
      setTimeout(() => setConflictToast(null), 4500);
      return;
    }

    // 3. Normal selection into current target slot
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
    const charInSlot = (teamNum === 1 ? team1 : team2)[slotIdx];
    if (charInSlot) {
      setLastClickedChar(charInSlot);
    }
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
    <section
      id="simulator"
      style={{ padding: '3rem 0', position: 'relative' }}
      onMouseLeave={() => {
        setHoveredChar(null);
        setLastClickedChar(null);
        setIsMouseDown(false);
      }}
    >
      {/* KOF '98 Arcade Selector & Portrait System */}
      <style>{`
        :root {
          /* Tamaño y posicionamiento del cuadro del retrato KOF '98 */
          --kof-portrait-size: 68px;
          --kof-cursor-scale: 168%; /* Escala arcade para abrazar las esquinas y sobresalir como en KOF '98 */
        }

        /* Contenedor de grilla + panel inspector: columnas estables y fijas (Opción 1) */
        .roster-layout-container {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 340px;
          gap: 1.5rem;
          align-items: start;
        }

        @media (max-width: 1023px) {
          .roster-layout-container {
            grid-template-columns: 1fr;
          }
        }

        .roster-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(96px, 1fr));
          gap: 0.65rem;
        }

        .roster-card {
          position: relative;
          cursor: pointer !important;
          user-select: none;
          transition: background-color 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease;
          overflow: visible !important;
          border-width: 2px !important;
          border-style: solid !important;
          /* Sin transform: translateY en hover para eliminar cualquier tembleque o conflicto visual entre retratos */
        }

        .roster-card:hover {
          z-index: 15;
          box-shadow: 0 4px 18px rgba(0, 0, 0, 0.65);
        }

        /* Recuadro del retrato del personaje: posición relative y overflow: visible para permitir que el cursor sobresalga */
        .kof-portrait-container {
          position: relative;
          width: var(--kof-portrait-size, 68px);
          height: var(--kof-portrait-size, 68px);
          margin: 0 auto 0.35rem;
          border-radius: 6px;
          overflow: visible !important;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, rgba(0, 0, 0, 0.7) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          border-width: 2px;
          border-style: solid;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
        }

        /* Selector Arcade 1P / 2P superpuesto abrazando esquinas y sobresaliendo estilo KOF '98 arcade */
        .kof-portrait-selector-overlay {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: var(--kof-cursor-scale, 168%);
          height: var(--kof-cursor-scale, 168%);
          pointer-events: none !important;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: visible !important;
        }

        .kof-portrait-selector-overlay img {
          width: 100%;
          height: 100%;
          object-fit: fill;
          image-rendering: pixelated;
          image-rendering: -moz-crisp-edges;
          image-rendering: crisp-edges;
          pointer-events: none !important;
          display: block;
          transform-origin: center;
        }

        /* 1P Hover Pulse */
        .kof-portrait-selector-overlay.is-hover-p1 img {
          filter: drop-shadow(0 0 5px rgba(59, 130, 246, 0.95));
          animation: kofSelectorPulse 0.45s infinite alternate ease-in-out;
        }

        /* 2P Hover Pulse */
        .kof-portrait-selector-overlay.is-hover-p2 img {
          filter: drop-shadow(0 0 5px rgba(239, 68, 68, 0.95));
          animation: kofSelectorPulse 0.45s infinite alternate ease-in-out;
        }

        /* Click / MouseDown Active State */
        .kof-portrait-selector-overlay.is-click-p1 img,
        .kof-portrait-selector-overlay.is-click-p2 img {
          filter: brightness(1.3) drop-shadow(0 0 8px #ffffff);
          transform: scale(0.96);
          transform-origin: center;
        }

        @keyframes kofSelectorPulse {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.03);
          }
        }

        .roster-card.is-blocked {
          cursor: not-allowed !important;
          opacity: 0.35 !important;
          filter: grayscale(85%) !important;
        }
        .roster-card.is-blocked:hover {
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
                setLastClickedChar(null);
                setHoveredChar(null);
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

        {/* Character Roster Grid & Real-time Hover Inspect (Fixed stable layout) */}
        <div className="roster-layout-container">
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
              className="roster-grid"
              onMouseDown={() => setIsMouseDown(true)}
              onMouseUp={() => setIsMouseDown(false)}
              onMouseLeave={() => {
                setIsMouseDown(false);
                setHoveredChar(null);
              }}
            >
              {filteredChars.map((char) => {
                const isSelectedInP1 = team1.some((c) => c?.id === char.id);
                const isSelectedInP2 = team2.some((c) => c?.id === char.id);
                const charImg = CHARACTER_IMAGES[char.id];
                const conflict = getConflictInfo(char);

                const isHovered = hoveredChar?.id === char.id && !conflict.isBlocked;
                const isCurrentP1 = activeTarget.team === 1;

                // Determine active overlay frame ONLY when mouse is over (hover) or clicking (mousedown)
                let overlayFrame = null;
                let overlayStateClass = '';

                if (isHovered) {
                  if (isMouseDown) {
                    overlayFrame = isCurrentP1 ? UI_ICONS.p1CursorSelect : UI_ICONS.p2CursorSelect;
                    overlayStateClass = isCurrentP1 ? 'is-click-p1' : 'is-click-p2';
                  } else {
                    overlayFrame = isCurrentP1 ? UI_ICONS.p1Cursor : UI_ICONS.p2Cursor;
                    overlayStateClass = isCurrentP1 ? 'is-hover-p1' : 'is-hover-p2';
                  }
                }

                // Dynamic border and glow for the character portrait container
                let portraitBorderColor = 'rgba(255, 255, 255, 0.12)';
                let portraitBoxShadow = 'none';

                if (isHovered) {
                  portraitBorderColor = isCurrentP1 ? '#3b82f6' : '#ef4444';
                  portraitBoxShadow = isCurrentP1
                    ? '0 0 14px rgba(59, 130, 246, 0.85), inset 0 0 8px rgba(59, 130, 246, 0.35)'
                    : '0 0 14px rgba(239, 68, 68, 0.85), inset 0 0 8px rgba(239, 68, 68, 0.35)';
                } else if (isSelectedInP1 && !isSelectedInP2) {
                  portraitBorderColor = '#3b82f6';
                  portraitBoxShadow = '0 0 8px rgba(59, 130, 246, 0.5)';
                } else if (isSelectedInP2 && !isSelectedInP1) {
                  portraitBorderColor = '#ef4444';
                  portraitBoxShadow = '0 0 8px rgba(239, 68, 68, 0.5)';
                } else if (isSelectedInP1 && isSelectedInP2) {
                  portraitBorderColor = '#a855f7';
                  portraitBoxShadow = '0 0 8px rgba(168, 85, 247, 0.5)';
                }

                return (
                  <div
                    key={char.id}
                    className={`roster-card ${isSelectedInP1 ? 'selected-p1' : ''} ${isSelectedInP2 ? 'selected-p2' : ''} ${conflict.isBlocked ? 'is-blocked' : ''}`}
                    style={{
                      '--char-color': char.color,
                      '--char-glow': `${char.color}88`,
                      padding: '0.45rem',
                      borderRadius: '8px',
                      background: isSelectedInP1
                        ? 'rgba(30, 58, 138, 0.45)'
                        : isSelectedInP2
                          ? 'rgba(153, 27, 27, 0.45)'
                          : conflict.isBlocked
                            ? 'rgba(10, 10, 15, 0.5)'
                            : isHovered
                              ? 'rgba(22, 28, 48, 0.95)'
                              : 'rgba(13, 15, 24, 0.85)',
                      borderColor: isSelectedInP1
                        ? '#3b82f6'
                        : isSelectedInP2
                          ? '#ef4444'
                          : conflict.isBlocked
                            ? 'rgba(239, 68, 68, 0.3)'
                            : isHovered
                              ? (isCurrentP1 ? 'rgba(59, 130, 246, 0.7)' : 'rgba(239, 68, 68, 0.7)')
                              : 'rgba(255, 255, 255, 0.08)',
                      boxShadow: isHovered
                        ? (isCurrentP1 ? '0 0 16px rgba(59, 130, 246, 0.35)' : '0 0 16px rgba(239, 68, 68, 0.35)')
                        : 'none',
                      position: 'relative',
                      cursor: conflict.isBlocked ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                    onClick={() => handleCardClick(char)}
                    onMouseEnter={() => handleCardHover(char)}
                    title={
                      conflict.isBlocked
                        ? conflict.reason
                        : conflict.isAlreadyInTeam
                          ? `${char.name} (En equipo ${activeTarget.team}P) - Clic para deseleccionar`
                          : `${char.name} (${char.tier}) - Clic para elegir`
                    }
                  >
                    {/* PORTRAIT BOX (Container with position: relative, overflow: visible) */}
                    <div
                      className="kof-portrait-container"
                      style={{
                        borderColor: portraitBorderColor,
                        boxShadow: portraitBoxShadow,
                      }}
                    >
                      {charImg ? (
                        <img
                          src={charImg}
                          alt={char.name}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            imageRendering: 'pixelated',
                            borderRadius: '4px',
                            pointerEvents: 'none',
                          }}
                        />
                      ) : (
                        <span style={{ fontSize: '1.8rem', pointerEvents: 'none' }}>{char.avatar}</span>
                      )}

                      {/* OVERLAID ARCADE SELECTOR FRAME (Appears ONLY on hover & click, 100% of portrait) */}
                      {overlayFrame && (
                        <div className={`kof-portrait-selector-overlay ${overlayStateClass}`}>
                          <img
                            src={overlayFrame}
                            alt="Selector Arcade KOF '98"
                          />
                        </div>
                      )}

                      {/* Small Corner Badge when selected and not hovered */}
                      {isSelectedInP1 && !isHovered && (
                        <span style={{
                          position: 'absolute',
                          top: '2px',
                          left: '2px',
                          background: '#2563eb',
                          color: '#fff',
                          fontFamily: 'var(--font-arcade)',
                          fontSize: '0.62rem',
                          padding: '1px 3px',
                          borderRadius: '2px',
                          lineHeight: 1,
                          zIndex: 8,
                          boxShadow: '0 0 4px rgba(0,0,0,0.8)'
                        }}>
                          1P
                        </span>
                      )}
                      {isSelectedInP2 && !isHovered && (
                        <span style={{
                          position: 'absolute',
                          top: '2px',
                          right: '2px',
                          background: '#dc2626',
                          color: '#fff',
                          fontFamily: 'var(--font-arcade)',
                          fontSize: '0.62rem',
                          padding: '1px 3px',
                          borderRadius: '2px',
                          lineHeight: 1,
                          zIndex: 8,
                          boxShadow: '0 0 4px rgba(0,0,0,0.8)'
                        }}>
                          2P
                        </span>
                      )}
                    </div>

                    {/* Character Name (Outside portrait box, totally unhindered by overlay) */}
                    <span className="font-tech" style={{
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      color: conflict.isBlocked ? '#94a3b8' : '#f8fafc',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxWidth: '100%',
                      display: 'block',
                      pointerEvents: 'none',
                    }}>
                      {char.name.split(' ')[0]}
                    </span>

                    {/* Tier or Conflict Badge (Outside portrait box) */}
                    {conflict.isBlocked ? (
                      <span style={{
                        fontSize: '0.58rem',
                        fontFamily: 'var(--font-tech)',
                        color: '#f87171',
                        fontWeight: 700,
                        marginTop: '1px',
                        pointerEvents: 'none',
                      }}>
                        {conflict.badge}
                      </span>
                    ) : conflict.isAlreadyInTeam ? (
                      <span style={{
                        fontSize: '0.58rem',
                        fontFamily: 'var(--font-tech)',
                        color: '#60a5fa',
                        fontWeight: 700,
                        marginTop: '1px',
                        pointerEvents: 'none',
                      }}>
                        EN EQUIPO
                      </span>
                    ) : (
                      <span style={{
                        fontSize: '0.62rem',
                        fontFamily: 'var(--font-tech)',
                        color: char.color,
                        fontWeight: 700,
                        marginTop: '1px',
                        pointerEvents: 'none',
                      }}>
                        {char.tier}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Hover / Clicked Character Detail Card / Inspector (Permanent column, non-sticky aligned with grid) */}
          {activeInspectChar ? (
            <div className="glass-panel" style={{
              padding: '1.5rem',
              border: `1px solid ${activeInspectChar.color}`,
              boxShadow: `0 0 25px ${activeInspectChar.color}40`,
              position: 'relative',
              transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{
                  width: '74px',
                  height: '74px',
                  borderRadius: '10px',
                  background: activeInspectChar.portraitBg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: `2px solid ${activeInspectChar.color}`,
                  overflow: 'hidden',
                  flexShrink: 0
                }}>
                  {CHARACTER_IMAGES[activeInspectChar.id] ? (
                    <img
                      src={CHARACTER_IMAGES[activeInspectChar.id]}
                      alt={activeInspectChar.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        imageRendering: 'pixelated'
                      }}
                    />
                  ) : (
                    <span style={{ fontSize: '2.5rem' }}>{activeInspectChar.avatar}</span>
                  )}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem', flexWrap: 'wrap' }}>
                    <span className="badge-arcade" style={{ fontSize: '0.65rem' }}>
                      TIER {activeInspectChar.tier} • {activeInspectChar.archetype}
                    </span>
                    {hoveredChar?.id === activeInspectChar.id ? (
                      <span className="badge-arcade" style={{ fontSize: '0.6rem', background: 'rgba(59, 130, 246, 0.2)', borderColor: '#3b82f6', color: '#60a5fa' }}>
                        HOVER
                      </span>
                    ) : (
                      <span className="badge-arcade" style={{ fontSize: '0.6rem', background: 'rgba(245, 158, 11, 0.2)', borderColor: '#f59e0b', color: '#fbbf24' }}>
                        CLIC FIJADO
                      </span>
                    )}
                  </div>
                  <h3 className="font-arcade" style={{ fontSize: '2rem', color: '#fff', lineHeight: 1 }}>
                    {activeInspectChar.name}
                  </h3>
                  <div style={{ fontSize: '0.8rem', color: activeInspectChar.color }}>
                    "{activeInspectChar.title}"
                  </div>
                </div>
              </div>

              {/* Counterpart info if Orochi character */}
              {OROCHI_COUNTERPARTS[activeInspectChar.id] && (
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
                    Tiene contraparte ({CHARACTERS.find((c) => c.id === OROCHI_COUNTERPARTS[activeInspectChar.id])?.name}). No seleccionables juntos.
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
                  {activeInspectChar.signatureMove}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.4rem' }}>POSICIÓN ÓPTIMA:</div>
                <div className="font-tech" style={{ fontSize: '0.85rem', color: '#38bdf8' }}>
                  {activeInspectChar.role}
                </div>
              </div>

              {/* Radar stats */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', marginBottom: '1.25rem' }}>
                {[
                  { label: 'Juego Neutral & Pokes', val: activeInspectChar.stats.neutral },
                  { label: 'Daño & Castigos (Combos)', val: activeInspectChar.stats.damage },
                  { label: 'Poder sin Barra (Point)', val: activeInspectChar.stats.meterless },
                  { label: 'Antiaéreos & Reversals', val: activeInspectChar.stats.antiAir },
                  { label: 'Apertura de Guardia / Mixup', val: activeInspectChar.stats.mixup },
                ].map((st, i) => (
                  <div key={i}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#cbd5e1' }}>
                      <span>{st.label}</span>
                      <strong style={{ color: activeInspectChar.color }}>{st.val}</strong>
                    </div>
                    <div style={{ height: '5px', background: '#1e293b', borderRadius: '3px', overflow: 'hidden', marginTop: '2px' }}>
                      <div style={{
                        width: `${st.val}%`,
                        height: '100%',
                        background: activeInspectChar.color,
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
                {activeInspectChar.coachAdvice}
              </div>
            </div>
          ) : (
            /* Standby Neutral Arcade Inspector Panel (Aligned with grid, non-sticky) */
            <div className="glass-panel" style={{
              padding: '1.5rem',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
              position: 'relative',
              minHeight: '440px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    background: 'rgba(59, 130, 246, 0.15)',
                    border: '1px solid rgba(59, 130, 246, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Sparkles size={18} color="#60a5fa" />
                  </div>
                  <div>
                    <span className="badge-arcade" style={{ fontSize: '0.62rem', color: '#60a5fa' }}>
                      ANÁLISIS TÁCTICO
                    </span>
                    <h3 className="font-arcade" style={{ fontSize: '1.4rem', color: '#fff', lineHeight: 1, marginTop: '2px' }}>
                      INSPECTOR DE LUCHADORES
                    </h3>
                  </div>
                </div>

                {/* Arcade Radar Visual Box */}
                <div style={{
                  background: 'radial-gradient(circle, rgba(30, 58, 138, 0.2) 0%, rgba(9, 10, 15, 0.8) 100%)',
                  border: '1px dashed rgba(59, 130, 246, 0.3)',
                  borderRadius: '10px',
                  padding: '1.5rem 1rem',
                  textAlign: 'center',
                  marginBottom: '1.25rem'
                }}>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    margin: '0 auto 0.75rem',
                    borderRadius: '50%',
                    background: 'rgba(59, 130, 246, 0.1)',
                    border: '2px solid rgba(59, 130, 246, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 15px rgba(59, 130, 246, 0.2)'
                  }}>
                    <Users size={28} color="#93c5fd" />
                  </div>
                  <p className="font-tech" style={{ fontSize: '0.88rem', color: '#f8fafc', fontWeight: 600, marginBottom: '0.35rem' }}>
                    PASA EL CURSOR SOBRE UN LUCHADOR
                  </p>
                  <p style={{ fontSize: '0.78rem', color: '#94a3b8', lineHeight: 1.4, margin: 0 }}>
                    Explora en tiempo real el <strong>Tier</strong>, <strong>Golpes Clave</strong>, <strong>Rol Óptimo</strong> (Point/Mid/Anchor) y <strong>Consejos del Coach</strong> de cada personaje.
                  </p>
                </div>

                {/* Target Slot Status inside Inspector */}
                <div style={{
                  background: 'rgba(0, 0, 0, 0.35)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: '8px',
                  padding: '0.85rem',
                  marginBottom: '1rem'
                }}>
                  <div style={{ fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.35rem' }}>
                    Objetivo de Selección Actual:
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <img
                      src={activeTarget.team === 1 ? UI_ICONS.p1Cursor : UI_ICONS.p2Cursor}
                      alt=""
                      style={{ width: '18px', height: '18px', imageRendering: 'pixelated' }}
                    />
                    <span className="font-arcade" style={{ fontSize: '1.1rem', color: activeTarget.team === 1 ? '#60a5fa' : '#f87171' }}>
                      EQUIPO {activeTarget.team}P • {slotLabels[activeTarget.slot].title}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#cbd5e1', marginTop: '0.25rem' }}>
                    {slotLabels[activeTarget.slot].roleDesc}
                  </div>
                </div>
              </div>

              {/* Pro-Tip Footer */}
              <div style={{
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                paddingTop: '0.75rem',
                fontSize: '0.76rem',
                color: '#94a3b8',
                lineHeight: 1.4
              }}>
                <strong style={{ color: '#fbbf24' }}>💡 Regla Arcade KOF '98:</strong> Las versiones Orochi de Chris, Yashiro y Shermie se bloquean automáticamente si su contraparte ya está en el equipo.
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

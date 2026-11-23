import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Footprints,
  Shield,
  Flame,
  Activity,
  Gamepad2,
  Layers,
  Search,
  X,
  Zap,
  Sparkles,
  Info
} from 'lucide-react';
import { arcadeAudio } from '../utils/audio';
import { UNIVERSAL_MOVES, FIGHTING_GLOSSARY } from '../data/mechanicsData';

// Componente para la vista de Movimientos Generales
function UniversalMovesView() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const categories = useMemo(() => {
    const cats = ['Todos'];
    UNIVERSAL_MOVES.forEach(m => {
      if (!cats.includes(m.category)) cats.push(m.category);
    });
    return cats;
  }, []);

  const filteredMoves = useMemo(() => {
    if (selectedCategory === 'Todos') return UNIVERSAL_MOVES;
    return UNIVERSAL_MOVES.filter(m => m.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div>
      <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <h3 className="font-arcade" style={{ color: '#00f0ff', fontSize: '1.4rem', margin: 0, textShadow: '0 0 10px rgba(0, 240, 255, 0.4)' }}>
            SISTEMA DE COMANDOS COMUNES (TODOS LOS PERSONAJES)
          </h3>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: '0.25rem 0 0 0' }}>
            Acciones universales de movimiento, evasión, defensa y agarre compartidas por todo el roster de KOF '98.
          </p>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
        {categories.map(cat => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => {
                arcadeAudio.playHover();
                setSelectedCategory(cat);
              }}
              style={{
                background: isActive ? 'linear-gradient(135deg, rgba(0, 240, 255, 0.25), rgba(0, 166, 255, 0.15))' : 'rgba(255, 255, 255, 0.04)',
                border: isActive ? '1px solid #00f0ff' : '1px solid rgba(255, 255, 255, 0.1)',
                color: isActive ? '#00f0ff' : '#94a3b8',
                borderRadius: '6px',
                padding: '0.35rem 0.8rem',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Grid de Movimientos */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
        {filteredMoves.map((m) => (
          <div
            key={m.id}
            style={{
              background: 'rgba(0, 0, 0, 0.45)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '8px',
              padding: '1.1rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'border-color 0.2s ease, transform 0.2s ease',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div>
              {/* Badge & Category Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                <span style={{ fontSize: '0.68rem', textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '0.05em' }}>
                  {m.category}
                </span>
                <span
                  className={m.badgeType === 'gold' ? 'badge-arcade' : 'badge-cyan'}
                  style={{
                    fontSize: '0.65rem',
                    padding: '0.15rem 0.45rem',
                    borderColor: m.badgeType === 'gold' ? '#f59e0b' : undefined,
                    color: m.badgeType === 'gold' ? '#fbbf24' : undefined
                  }}
                >
                  {m.badge}
                </span>
              </div>

              {/* Move Name */}
              <h4 className="font-tech" style={{ color: '#fff', fontSize: '1rem', fontWeight: 700, marginBottom: '0.65rem' }}>
                {m.name}
              </h4>

              {/* Command Input Box */}
              <div
                style={{
                  background: 'rgba(2, 4, 9, 0.85)',
                  border: '1px solid rgba(0, 240, 255, 0.25)',
                  borderRadius: '6px',
                  padding: '0.5rem 0.75rem',
                  marginBottom: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <Zap size={14} color="#00f0ff" style={{ flexShrink: 0 }} />
                <span
                  className="font-retro"
                  style={{
                    color: '#00f0ff',
                    fontSize: '0.78rem',
                    letterSpacing: '0.02em',
                    lineHeight: 1.4,
                    wordBreak: 'break-word'
                  }}
                >
                  {m.command}
                </span>
              </div>

              {/* Conditions / Requisitos */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.75rem', fontSize: '0.72rem' }}>
                <span style={{ background: 'rgba(255,255,255,0.05)', color: '#cbd5e1', padding: '0.15rem 0.45rem', borderRadius: '4px' }}>
                  📍 {m.condition}
                </span>
                <span style={{ background: 'rgba(255,255,255,0.05)', color: '#94a3b8', padding: '0.15rem 0.45rem', borderRadius: '4px' }}>
                  ⚡ {m.cost}
                </span>
              </div>

              {/* Description */}
              <p style={{ fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.5, marginBottom: '0.85rem' }}>
                {m.desc}
              </p>
            </div>

            {/* Pro Coach Tip */}
            <div
              style={{
                background: 'rgba(245, 158, 11, 0.08)',
                borderLeft: '3px solid #f59e0b',
                padding: '0.5rem 0.65rem',
                borderRadius: '0 4px 4px 0',
                fontSize: '0.75rem',
                color: '#fef3c7',
                lineHeight: 1.4
              }}
            >
              <strong style={{ color: '#fbbf24', display: 'block', marginBottom: '0.2rem', fontSize: '0.72rem' }}>
                💡 TIP DE COACH:
              </strong>
              {m.tips}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Componente para la vista del Glosario Fighting & Kofero
function GlossaryView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const categories = useMemo(() => {
    const cats = ['Todos'];
    FIGHTING_GLOSSARY.forEach(item => {
      if (!cats.includes(item.category)) cats.push(item.category);
    });
    return cats;
  }, []);

  const filteredGlossary = useMemo(() => {
    return FIGHTING_GLOSSARY.filter(item => {
      const matchesCategory = selectedCategory === 'Todos' || item.category === selectedCategory;
      const matchesSearch = !searchQuery.trim() ||
        item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.definition.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.kofExample.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div>
      <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <h3 className="font-arcade" style={{ color: '#ff2e43', fontSize: '1.4rem', margin: 0, textShadow: '0 0 10px rgba(255, 46, 67, 0.4)' }}>
            GLOSARIO UNIVERSAL FIGHTING & KOFERO
          </h3>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: '0.25rem 0 0 0' }}>
            Nomenclatura competitiva estandarizada, conceptos de frame data y jerga táctica esencial explicada con ejemplos de KOF '98.
          </p>
        </div>

        {/* Search Bar */}
        <div style={{ position: 'relative', minWidth: '240px', flex: '1 1 auto', maxWidth: '340px' }}>
          <Search size={15} color="#94a3b8" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar término (ej: footsies, meaty...)"
            style={{
              width: '100%',
              background: 'rgba(0, 0, 0, 0.5)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '6px',
              padding: '0.5rem 2rem 0.5rem 2.2rem',
              color: '#fff',
              fontSize: '0.82rem',
              outline: 'none'
            }}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              style={{
                position: 'absolute',
                right: '0.6rem',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'transparent',
                border: 'none',
                color: '#94a3b8',
                cursor: 'pointer',
                padding: '0.2rem'
              }}
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Category Pills & Results Counter */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {categories.map(cat => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  arcadeAudio.playHover();
                  setSelectedCategory(cat);
                }}
                style={{
                  background: isActive ? 'linear-gradient(135deg, rgba(255, 46, 67, 0.3), rgba(230, 38, 10, 0.2))' : 'rgba(255, 255, 255, 0.04)',
                  border: isActive ? '1px solid #ff2e43' : '1px solid rgba(255, 255, 255, 0.1)',
                  color: isActive ? '#fff' : '#94a3b8',
                  borderRadius: '6px',
                  padding: '0.35rem 0.8rem',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
          Mostrando <strong style={{ color: '#fff' }}>{filteredGlossary.length}</strong> de {FIGHTING_GLOSSARY.length} términos
        </span>
      </div>

      {/* Glossary Items List */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1rem' }}>
        {filteredGlossary.map((item, idx) => (
          <div
            key={idx}
            style={{
              background: 'rgba(0, 0, 0, 0.45)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '8px',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'all 0.2s ease'
            }}
          >
            <div>
              {/* Header with Term and Category */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.65rem' }}>
                <h4 className="font-tech" style={{ color: '#fbbf24', fontSize: '1.1rem', fontWeight: 700, margin: 0, textShadow: '0 0 8px rgba(251, 191, 36, 0.3)' }}>
                  {item.term}
                </h4>
                <span
                  style={{
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '4px',
                    padding: '0.15rem 0.5rem',
                    fontSize: '0.68rem',
                    color: '#94a3b8',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {item.category}
                </span>
              </div>

              {/* Definition */}
              <p style={{ fontSize: '0.84rem', color: '#cbd5e1', lineHeight: 1.55, marginBottom: '0.85rem' }}>
                {item.definition}
              </p>
            </div>

            {/* KOF Example Block */}
            <div
              style={{
                background: 'rgba(255, 46, 67, 0.08)',
                borderLeft: '3px solid #ff2e43',
                padding: '0.6rem 0.75rem',
                borderRadius: '0 6px 6px 0',
                fontSize: '0.78rem',
                color: '#fed7aa',
                lineHeight: 1.45
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.2rem' }}>
                <Sparkles size={12} color="#ff4d61" />
                <strong style={{ color: '#ff4d61', fontSize: '0.72rem', letterSpacing: '0.04em' }}>
                  EN KOF '98:
                </strong>
              </div>
              <span style={{ color: '#e2e8f0' }}>{item.kofExample}</span>
            </div>
          </div>
        ))}
      </div>

      {filteredGlossary.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#94a3b8' }}>
          <p style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>No se encontraron términos para "{searchQuery}"</p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('Todos');
            }}
            className="btn-ghost"
            style={{ fontSize: '0.8rem', padding: '0.4rem 0.9rem' }}
          >
            Limpiar búsqueda
          </button>
        </div>
      )}
    </div>
  );
}

export function MechanicsGuide() {
  const [activeTab, setActiveTab] = useState('jumps');

  const mechanics = [
    {
      id: 'jumps',
      title: 'Los 4 Tipos de Saltos',
      subtitle: 'La base absoluta del neutral y la presión en KOF',
      icon: Footprints,
      content: (
        <div>
          <p style={{ color: '#cbd5e1', fontSize: '0.95rem', marginBottom: '1.25rem', lineHeight: 1.6 }}>
            En KOF 98 no existe un solo salto: dominar los 4 arcos de salto es lo que separa a un novato de un jugador de nivel torneo.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
            <div style={{ background: 'rgba(0,0,0,0.4)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <span className="font-tech" style={{ color: '#38bdf8', fontWeight: 700, fontSize: '0.9rem', display: 'block', marginBottom: '0.3rem' }}>
                1. SHORT HOP (Salto Corto)
              </span>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Input: Toque leve ↖ / ↑ / ↗ y soltar de inmediato</div>
              <p style={{ fontSize: '0.82rem', color: '#e2e8f0' }}>
                Pasa por encima de barridas bajas y golpes agachados. Es el motor principal para presionar sin exponerse a antiaéreos lentos.
              </p>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.4)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <span className="font-tech" style={{ color: '#fbbf24', fontWeight: 700, fontSize: '0.9rem', display: 'block', marginBottom: '0.3rem' }}>
                2. HYPER HOP (Salto Corto Rápido)
              </span>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Input: ↓ luego ↗ rápidamente, o durante carrera</div>
              <p style={{ fontSize: '0.82rem', color: '#e2e8f0' }}>
                Cubre mayor distancia horizontal a gran velocidad. Fundamental para personajes como Chris, Iori o Benimaru para cruzar la guardia.
              </p>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.4)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <span className="font-tech" style={{ color: '#10b981', fontWeight: 700, fontSize: '0.9rem', display: 'block', marginBottom: '0.3rem' }}>
                3. NORMAL JUMP (Salto Estándar)
              </span>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Input: Mantener ↑ o ↗</div>
              <p style={{ fontSize: '0.82rem', color: '#e2e8f0' }}>
                Arco alto. Usado para saltar proyectiles lejanos o reposicionarse, pero fácil de castigar con Oniyaki si se abusa.
              </p>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.4)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <span className="font-tech" style={{ color: '#ef4444', fontWeight: 700, fontSize: '0.9rem', display: 'block', marginBottom: '0.3rem' }}>
                4. SUPER JUMP (Gran Salto)
              </span>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Input: ↓ luego mantener ↗</div>
              <p style={{ fontSize: '0.82rem', color: '#e2e8f0' }}>
                Cruza la pantalla completa con sombra tras el personaje. Excelente para escapar de esquinas o castigar proyectiles lentos.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'meter',
      title: 'Gestión Defensiva de Barras',
      subtitle: 'Guard Cancel Roll vs Guard Cancel CD',
      icon: Shield,
      content: (
        <div>
          <p style={{ color: '#cbd5e1', fontSize: '0.95rem', marginBottom: '1.25rem', lineHeight: 1.6 }}>
            En KOF 98 el medidor no solo sirve para superataques: 1 barra defensiva puede salvar un round entero.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            <div style={{ background: 'rgba(0,0,0,0.4)', padding: '1.25rem', borderRadius: '8px', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
              <h4 className="font-tech" style={{ color: '#60a5fa', fontSize: '1.1rem', marginBottom: '0.3rem' }}>
                Guard Cancel Roll (AB / ←AB en bloqueo)
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.5, marginBottom: '0.75rem' }}>
                Gasta 1 barra de medidor. Ruedas a través o lejos del ataque rival. Si el oponente estaba en medio de una rekka o ataque con recuperación, ¡quedas a su espalda con castigo de combo completo asegurado!
              </p>
              <div className="badge-cyan" style={{ fontSize: '0.75rem' }}>USO: Castigos garantizados y salida de esquina</div>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.4)', padding: '1.25rem', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
              <h4 className="font-tech" style={{ color: '#f87171', fontSize: '1.1rem', marginBottom: '0.3rem' }}>
                Guard Cancel CD (CD en bloqueo)
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.5, marginBottom: '0.75rem' }}>
                Gasta 1 barra. Tu personaje contraataca con golpe pesado invulnerable que derriba al rival a pantalla completa. Ideal cuando el oponente hace safe hops y no puedes rodar con seguridad.
              </p>
              <div className="badge-arcade" style={{ fontSize: '0.75rem' }}>USO: Resetear el neutral cuando te asfixian</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'mood',
      title: 'Sistema de Ánimo (Mood / Herencia)',
      subtitle: 'La regla oculta de afinidad en Advance Mode',
      icon: Flame,
      content: (
        <div>
          <p style={{ color: '#cbd5e1', fontSize: '0.95rem', marginBottom: '1.25rem', lineHeight: 1.6 }}>
            Muchos jugadores pierden partidas sin saber que su orden de personajes destruye sus propias barras. Al caer un combatiente en Advance Mode:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(16, 185, 129, 0.1)', padding: '0.9rem', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
              <span style={{ fontSize: '2rem' }}>😄</span>
              <div>
                <strong style={{ color: '#34d399', fontSize: '0.95rem' }}>CARA SONRIENTE (Amigos / Compatibles):</strong>
                <p style={{ fontSize: '0.84rem', color: '#cbd5e1' }}>
                  El personaje caído le transfiere todas sus barras acumuladas + 1 BARRA ADICIONAL DE REGALO. (Ej: Daimon a Kyo o Terry).
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(148, 163, 184, 0.1)', padding: '0.9rem', borderRadius: '8px', border: '1px solid rgba(148, 163, 184, 0.2)' }}>
              <span style={{ fontSize: '2rem' }}>😐</span>
              <div>
                <strong style={{ color: '#94a3b8', fontSize: '0.95rem' }}>CARA NEUTRA (Sin relación especial):</strong>
                <p style={{ fontSize: '0.84rem', color: '#cbd5e1' }}>
                  Transfiere exactamente las barras acumuladas sin bonificación ni pérdida.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(239, 68, 68, 0.12)', padding: '0.9rem', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.4)' }}>
              <span style={{ fontSize: '2rem' }}>😡</span>
              <div>
                <strong style={{ color: '#f87171', fontSize: '0.95rem' }}>CARA ENOJADA (Rivalidad / Enemistad):</strong>
                <p style={{ fontSize: '0.84rem', color: '#cbd5e1' }}>
                  ¡EL COMBATIENTE ENTRA CON 0 BARRAS! Todo el medidor acumulado se pierde al instante. (Ej: Iori a Kyo, Kyo a Iori).
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'grapplers',
      title: 'Tech de Grapplers: Roll Bug & 1-Frame',
      subtitle: 'El secreto por el que Daimon y O. Yashiro dominan',
      icon: Activity,
      content: (
        <div>
          <p style={{ color: '#cbd5e1', fontSize: '0.95rem', marginBottom: '1.25rem', lineHeight: 1.6 }}>
            Los personajes de agarre en KOF 98 tienen propiedades únicas que los convierten en las mayores fuerzas de remontada del juego:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            <div style={{ background: 'rgba(0,0,0,0.4)', padding: '1.25rem', borderRadius: '8px', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
              <h4 className="font-tech" style={{ color: '#fbbf24', fontSize: '1.1rem', marginBottom: '0.3rem' }}>
                Rolling Bug de Daimon
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                Al rodar (AB) y cancelar inmediatamente en comando de agarre de 1 frame (Tenchi Gaeshi), Daimon acorta la recuperación del giro y agarra de forma prácticamente ineludible si el rival no está saltando.
              </p>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.4)', padding: '1.25rem', borderRadius: '8px', border: '1px solid rgba(168, 85, 247, 0.3)' }}>
              <h4 className="font-tech" style={{ color: '#c084fc', fontSize: '1.1rem', marginBottom: '0.3rem' }}>
                Agarres de 1-Frame (Invencibles en Arranque)
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                Movimientos como Tenchi Gaeshi de Daimon, Niragu Daichi de Orochi Yashiro o Kuzukaze de Iori no tienen tiempo de arranque reaccionable: si estás a rango y en el suelo, el agarre conecta sin importar qué botón presiones.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'universal_moves',
      title: 'Movimientos Generales',
      subtitle: 'Comandos y mecánicas que comparten todos los personajes de KOF',
      icon: Gamepad2,
      content: <UniversalMovesView />
    },
    {
      id: 'glossary',
      title: 'Glosario Fighting & Kofero',
      subtitle: 'Nomenclatura universal de fighting games y jerga de KOF',
      icon: BookOpen,
      content: <GlossaryView />
    }
  ];

  return (
    <section id="mechanics" style={{ padding: '4.5rem 0', position: 'relative' }}>
      <div className="kof-container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ display: 'inline-flex', marginBottom: '0.75rem' }}>
            <span className="badge-arcade" style={{ borderColor: 'rgba(0, 240, 255, 0.4)', color: '#38bdf8' }}>
              <BookOpen size={14} /> FRAME DATA & COMPETITIVE MECHANICS
            </span>
          </div>
          <h2 className="font-arcade" style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', color: '#fff', lineHeight: 1 }}>
            GUÍA DE MECÁNICAS PRO DE KOF '98
          </h2>
          <p style={{ color: '#94a3b8', maxWidth: '750px', margin: '0 auto', fontSize: '1.05rem' }}>
            Conceptos fundamentales que enseñamos en nuestras sesiones de coaching para transformar tu juego intuitivo en técnica de precisión.
          </p>
        </div>

        {/* Tab Controls / Buttons */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.75rem',
          flexWrap: 'wrap',
          marginBottom: '2rem'
        }}>
          {mechanics.map((mech) => {
            const Icon = mech.icon;
            const isActive = activeTab === mech.id;
            return (
              <button
                key={mech.id}
                type="button"
                onClick={() => {
                  arcadeAudio.playHover();
                  setActiveTab(mech.id);
                }}
                className="btn-ghost"
                style={{
                  fontSize: '0.9rem',
                  padding: '0.65rem 1.25rem',
                  background: isActive ? 'rgba(255, 46, 67, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                  borderColor: isActive ? '#ff2e43' : 'rgba(255, 255, 255, 0.1)',
                  color: isActive ? '#fff' : '#94a3b8',
                  boxShadow: isActive ? '0 0 15px rgba(255, 46, 67, 0.25)' : 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  cursor: 'pointer'
                }}
              >
                <Icon size={16} color={isActive ? '#ff4d61' : '#94a3b8'} />
                <span>{mech.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Content Panel */}
        <div className="glass-panel" style={{ padding: '2.5rem', maxWidth: '1050px', margin: '0 auto' }}>
          {mechanics.find((m) => m.id === activeTab)?.content}
        </div>
      </div>
    </section>
  );
}

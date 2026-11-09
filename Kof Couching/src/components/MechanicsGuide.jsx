import React, { useState } from 'react';
import { BookOpen, Footprints, Shield, Flame, Activity, ChevronRight, CheckCircle2 } from 'lucide-react';
import { arcadeAudio } from '../utils/audio';

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

        {/* Tab Controls */}
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
                  color: isActive ? '#fff' : '#94a3b8'
                }}
              >
                <Icon size={16} color={isActive ? '#ff4d61' : '#94a3b8'} />
                <span>{mech.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Content Panel */}
        <div className="glass-panel" style={{ padding: '2.5rem', maxWidth: '950px', margin: '0 auto' }}>
          {mechanics.find((m) => m.id === activeTab)?.content}
        </div>
      </div>
    </section>
  );
}


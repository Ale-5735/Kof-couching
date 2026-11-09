import React, { useState } from 'react';
import { Star, MessageSquare, ChevronDown, ChevronUp, Trophy, HelpCircle, UserCheck } from 'lucide-react';
import { arcadeAudio } from '../utils/audio';

export function TestimonialsFAQ() {
  const [openFaq, setOpenFaq] = useState(0);

  const testimonials = [
    {
      name: 'ManoNegra_KOF',
      platform: 'Fightcade 2 (Rank A)',
      location: 'México',
      text: 'Llevaba 2 años atascado en Rango C en Fightcade perdiendo contra jugadores que solo saltaban corto. En solo 2 sesiones aprendí a usar el st.A de Chizuru y a no quemar barras a lo loco. ¡Hoy compito contra jugadores de Rango A sin miedo!',
      rating: 5,
      mainTeam: 'Chris • Chizuru • Daimon',
    },
    {
      name: 'DaimonMaster_CL',
      platform: 'Neo Geo Masters Finalist',
      location: 'Chile',
      text: 'El coaching sobre el Rolling Bug de Daimon y la herencia de medidor me cambió por completo el juego. Me explicaron por qué tener a Iori antes de Kyo me arruinaba la partida al perder las 3 barras. Gané mi primer torneo local gracias a eso.',
      rating: 5,
      mainTeam: 'Iori • Orochi Chris • Daimon',
    },
    {
      name: 'OrochiViper_PE',
      platform: 'Fightcade 2 (Rank S)',
      location: 'Perú',
      text: 'Los VOD reviews con frame data son oro puro. Te graban las partidas y te muestran en qué frame exacto estás regalando el turno por usar rekkas sin confirmar. 100% recomendado para cualquiera que se tome KOF en serio.',
      rating: 5,
      mainTeam: 'Orochi Yashiro • Clark • Ralf',
    },
  ];

  const faqs = [
    {
      q: '¿Cómo se realizan las sesiones de coaching?',
      a: 'Nos conectamos a través de Discord (voz y transmisión en HD) y jugamos en Fightcade 2 con delay 0 o 1, o en The King of Fighters 98 Ultimate Match Final Edition (Steam). Se analizan repeticiones cuadro por cuadro y luego hacemos sparring guiado en vivo con situaciones específicas de juego.',
    },
    {
      q: '¿Necesito un nivel mínimo para tomar coaching?',
      a: 'Para nada. Atendemos desde principiantes que recién aprenden a ejecutar saltos cortos y combos de dos golpes, hasta competidores avanzados que necesitan optimizar match-ups contra la élite de Iori, Orochi Chris y Daimon.',
    },
    {
      q: '¿Qué tipo de mando necesito (Arcade Stick, Hitbox o Mando)?',
      a: 'Cualquier controlador es válido: palanca arcade tradicional (Sanwa / Seimitsu), palanca estilo bate mexicano, Hitbox / Leverless, mando de PS4/PS5/Xbox, o incluso teclado. Te enseñaremos los atajos de input y "socavones" más cómodos para tu dispositivo.',
    },
    {
      q: '¿Por qué es tan importante el orden de personajes en KOF 98?',
      a: 'A diferencia de otros juegos de pelea, en KOF 98 el primer personaje empieza sin barra de súper (necesita neutral sin medidor), el segundo suele tener 1-2 barras, y el Anchor tiene hasta 3 barras (o 4 con bonificación). Además, el sistema de ánimo (Mood) de Advance Mode puede regalarte 1 barra o destruir todo tu medidor si juntas a rivales como Iori y Kyo.',
    },
    {
      q: '¿Las sesiones quedan grabadas?',
      a: 'Sí, todas las sesiones se graban en video privado para que puedas repasarlas cuando quieras, incluyendo los apuntes tácticos y ejercicios de entrenamiento asignados.',
    },
  ];

  return (
    <section id="faq" style={{ padding: '4.5rem 0', position: 'relative' }}>
      <div className="kof-container">
        {/* Testimonials Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div style={{ display: 'inline-flex', marginBottom: '0.75rem' }}>
            <span className="badge-arcade" style={{ borderColor: 'rgba(245, 158, 11, 0.4)', color: '#fbbf24' }}>
              <UserCheck size={14} /> FIGHTCADE COMPETITIVE RESULTS
            </span>
          </div>
          <h2 className="font-arcade" style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', color: '#fff', lineHeight: 1 }}>
            TESTIMONIOS DE ALUMNOS & COMUNIDAD
          </h2>
          <p style={{ color: '#94a3b8', maxWidth: '750px', margin: '0 auto', fontSize: '1.05rem' }}>
            Resultados comprobados en torneos de la comunidad y partidas clasificatorias de Fightcade.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
          marginBottom: '5rem'
        }}>
          {testimonials.map((test, idx) => (
            <div key={idx} className="glass-panel" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column' }}>
              {/* Stars */}
              <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1rem' }}>
                {[...Array(test.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="#f59e0b" color="#f59e0b" />
                ))}
              </div>

              <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.6, fontStyle: 'italic', marginBottom: '1.5rem', marginTop: '0' }}>
                "{test.text}"
              </p>

              <div style={{ marginTop: 'auto', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '1rem' }}>
                <div className="font-tech" style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>
                  {test.name}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#60a5fa' }}>
                  {test.platform} • {test.location}
                </div>
                <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '0.2rem' }}>
                  Equipo: {test.mainTeam}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Header & Accordion */}
        <div style={{ maxWidth: '850px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div style={{ display: 'inline-flex', marginBottom: '0.5rem' }}>
              <span className="badge-cyan" style={{ fontSize: '0.75rem' }}>
                <HelpCircle size={14} /> PREGUNTAS FRECUENTES
              </span>
            </div>
            <h3 className="font-arcade" style={{ fontSize: '2.8rem', color: '#fff', lineHeight: 1 }}>
              TODO LO QUE NECESITAS SABER
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="glass-panel"
                  style={{
                    border: isOpen ? '1px solid rgba(255, 46, 67, 0.4)' : '1px solid rgba(255, 255, 255, 0.08)',
                    transition: 'border-color 0.2s'
                  }}
                >
                  <button
                    type="button"
                    onClick={() => {
                      arcadeAudio.playHover();
                      setOpenFaq(isOpen ? -1 : idx);
                    }}
                    style={{
                      width: '100%',
                      background: 'none',
                      border: 'none',
                      padding: '1.25rem 1.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      textAlign: 'left',
                      color: '#fff'
                    }}
                  >
                    <span className="font-tech" style={{ fontSize: '1.05rem', fontWeight: 700, color: isOpen ? '#ff8593' : '#fff' }}>
                      {faq.q}
                    </span>
                    {isOpen ? <ChevronUp size={20} color="#ff2e43" /> : <ChevronDown size={20} color="#94a3b8" />}
                  </button>

                  {isOpen && (
                    <div style={{
                      padding: '0 1.5rem 1.25rem 1.5rem',
                      fontSize: '0.9rem',
                      color: '#cbd5e1',
                      lineHeight: 1.6,
                      borderTop: '1px solid rgba(255, 255, 255, 0.04)'
                    }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}


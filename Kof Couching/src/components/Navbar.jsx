import React, { useState } from 'react';
import { Volume2, VolumeX, Flame, Swords, Calendar, HelpCircle, BookOpen } from 'lucide-react';
import { arcadeAudio } from '../utils/audio';

export function Navbar({ onOpenBooking }) {
  const [soundEnabled, setSoundEnabled] = useState(true);

  const handleToggleSound = () => {
    const newState = arcadeAudio.toggleSound();
    setSoundEnabled(newState);
    if (newState) arcadeAudio.playCoin();
  };

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(6, 7, 10, 0.88)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '0.85rem 0'
    }}>
      <div className="kof-container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        {/* Brand / Logo */}
        <a href="#" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          textDecoration: 'none',
          color: 'inherit'
        }} onClick={() => arcadeAudio.playSelect()}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #ff2e43 0%, #9d4edd 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 15px rgba(255, 46, 67, 0.6)',
            border: '1px solid rgba(255,255,255,0.3)'
          }}>
            <Flame size={24} color="#fff" />
          </div>
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              lineHeight: 1
            }}>
              <span className="font-arcade" style={{
                fontSize: '1.9rem',
                fontWeight: 700,
                color: '#fff',
                letterSpacing: '0.04em'
              }}>KOF '98</span>
              <span className="badge-arcade" style={{ fontSize: '0.65rem', padding: '1px 5px' }}>COACHING LAB</span>
            </div>
            <span className="font-tech" style={{
              fontSize: '0.72rem',
              color: '#94a3b8',
              letterSpacing: '0.08em',
              display: 'block'
            }}>THE DREAM MATCH COMPETITIVE ACADEMY</span>
          </div>
        </a>

        {/* Navigation Links */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
          flexWrap: 'wrap'
        }}>
          <a href="#simulator" className="font-tech" style={{
            color: '#cbd5e1',
            textDecoration: 'none',
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            transition: 'color 0.2s'
          }} onMouseEnter={() => arcadeAudio.playHover()}>
            <Swords size={16} color="#38bdf8" />
            <span>Simulador de Matchups</span>
          </a>

          <a href="#coaching" className="font-tech" style={{
            color: '#cbd5e1',
            textDecoration: 'none',
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem'
          }} onMouseEnter={() => arcadeAudio.playHover()}>
            <Calendar size={16} color="#f59e0b" />
            <span>Planes de Coaching</span>
          </a>

          <a href="#mechanics" className="font-tech" style={{
            color: '#cbd5e1',
            textDecoration: 'none',
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem'
          }} onMouseEnter={() => arcadeAudio.playHover()}>
            <BookOpen size={16} color="#10b981" />
            <span>Mecánicas Pro</span>
          </a>

          <a href="#faq" className="font-tech" style={{
            color: '#cbd5e1',
            textDecoration: 'none',
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem'
          }} onMouseEnter={() => arcadeAudio.playHover()}>
            <HelpCircle size={16} color="#a855f7" />
            <span>FAQ</span>
          </a>
        </div>

        {/* Controls & CTA */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          {/* Sound Toggle */}
          <button 
            type="button" 
            onClick={handleToggleSound}
            title={soundEnabled ? 'Silenciar Efectos Arcade' : 'Activar Sonidos Arcade'}
            style={{
              background: soundEnabled ? 'rgba(255, 46, 67, 0.15)' : 'rgba(255, 255, 255, 0.05)',
              border: `1px solid ${soundEnabled ? 'rgba(255, 46, 67, 0.4)' : 'rgba(255, 255, 255, 0.1)'}`,
              color: soundEnabled ? '#ff4d61' : '#64748b',
              width: '38px',
              height: '38px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>

          {/* Book Button */}
          <button
            type="button"
            className="btn-snk"
            style={{ padding: '0.5rem 1.2rem', fontSize: '1.15rem' }}
            onClick={() => {
              arcadeAudio.playCoin();
              onOpenBooking();
            }}
          >
            <span>Reservar Clase</span>
          </button>
        </div>
      </div>
    </nav>
  );
}


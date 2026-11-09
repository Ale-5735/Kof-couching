import React from 'react';
import { Flame, ArrowUp, Swords, Heart } from 'lucide-react';
import { arcadeAudio } from '../utils/audio';

export function Footer() {
  const scrollToTop = () => {
    arcadeAudio.playHover();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{
      background: '#040507',
      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '3.5rem 0 2rem 0',
      position: 'relative'
    }}>
      <div className="kof-container">
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
          marginBottom: '2.5rem',
          paddingBottom: '2rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)'
        }}>
          {/* Logo & Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #ff2e43 0%, #9d4edd 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 12px rgba(255, 46, 67, 0.5)'
            }}>
              <Flame size={20} color="#fff" />
            </div>
            <div>
              <span className="font-arcade" style={{ fontSize: '1.7rem', color: '#fff', lineHeight: 1 }}>
                KOF '98 COACHING LAB
              </span>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                Academia Táctica y Laboratorio de Matchups FGC
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <a href="#simulator" style={{ color: '#cbd5e1', fontSize: '0.85rem', textDecoration: 'none' }}>Simulador</a>
            <a href="#coaching" style={{ color: '#cbd5e1', fontSize: '0.85rem', textDecoration: 'none' }}>Mentorías</a>
            <a href="#mechanics" style={{ color: '#cbd5e1', fontSize: '0.85rem', textDecoration: 'none' }}>Mecánicas</a>
            <a href="#faq" style={{ color: '#cbd5e1', fontSize: '0.85rem', textDecoration: 'none' }}>Preguntas</a>
          </div>

          {/* Back to top */}
          <button
            type="button"
            onClick={scrollToTop}
            className="btn-ghost"
            style={{ fontSize: '0.85rem', padding: '0.45rem 0.9rem' }}
          >
            <span>Subir al Inicio</span>
            <ArrowUp size={14} />
          </button>
        </div>

        {/* Copyright & Disclaimer */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.78rem',
          color: '#64748b'
        }}>
          <div>
            Hecho con pasión por y para la comunidad competitiva de The King of Fighters '98 (Fightcade, Neo Geo MVS).
          </div>
          <div>
            The King of Fighters y sus personajes son marcas registradas de SNK Corporation. Proyecto comunitario educativo y de coaching competitivo sin fines de apropiación.
          </div>
        </div>
      </div>
    </footer>
  );
}


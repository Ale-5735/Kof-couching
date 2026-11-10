import React, { useState, useMemo } from 'react';
import { CHARACTERS, TEAM_PRESETS, OROCHI_COUNTERPARTS } from './data/characters';
import { evaluateTeamBattle } from './utils/matchupEngine';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { RosterSelect } from './components/RosterSelect';
import { MatchupComparison } from './components/MatchupComparison';
import { FinalVerdict } from './components/FinalVerdict';
import { CoachingPrograms } from './components/CoachingPrograms';
import { MechanicsGuide } from './components/MechanicsGuide';
import { TestimonialsFAQ } from './components/TestimonialsFAQ';
import { BookingModal } from './components/BookingModal';
import { Footer } from './components/Footer';

function App() {
  // Recuadros P1 Team y P2 Team inician vacíos para que el usuario los arme eligiendo las imágenes de los pj
  const [team1, setTeam1] = useState([null, null, null]);
  const [team2, setTeam2] = useState([null, null, null]);

  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedPlanForBooking, setSelectedPlanForBooking] = useState(null);

  // Compute live battle analysis whenever team compositions change
  const battleEvaluation = useMemo(() => {
    return evaluateTeamBattle(team1, team2);
  }, [team1, team2]);

  // Assign character to target team and specific slot
  const handleSelectCharacter = (char, targetTeamNum, targetSlotIdx) => {
    if (targetTeamNum === 1) {
      const newTeam = [...team1];
      if (typeof targetSlotIdx === 'number' && targetSlotIdx >= 0 && targetSlotIdx < 3) {
        newTeam[targetSlotIdx] = char;
      } else {
        const emptyIdx = newTeam.findIndex((c) => !c);
        newTeam[emptyIdx !== -1 ? emptyIdx : 0] = char;
      }
      setTeam1(newTeam);
    } else {
      const newTeam = [...team2];
      if (typeof targetSlotIdx === 'number' && targetSlotIdx >= 0 && targetSlotIdx < 3) {
        newTeam[targetSlotIdx] = char;
      } else {
        const emptyIdx = newTeam.findIndex((c) => !c);
        newTeam[emptyIdx !== -1 ? emptyIdx : 0] = char;
      }
      setTeam2(newTeam);
    }
  };

  const handleRemoveCharacter = (teamNum, slotIdx) => {
    if (teamNum === 1) {
      const newTeam = [...team1];
      newTeam[slotIdx] = null;
      setTeam1(newTeam);
    } else {
      const newTeam = [...team2];
      newTeam[slotIdx] = null;
      setTeam2(newTeam);
    }
  };

  const handleApplyPreset = (preset) => {
    const t1 = preset.team1.map((id) => CHARACTERS.find((c) => c.id === id) || null);
    const t2 = preset.team2.map((id) => CHARACTERS.find((c) => c.id === id) || null);
    setTeam1(t1);
    setTeam2(t2);
  };

  const handleRandomize = () => {
    const pickValidTeam = () => {
      const picked = [];
      const shuffled = [...CHARACTERS].sort(() => 0.5 - Math.random());
      for (const char of shuffled) {
        if (picked.length === 3) break;
        // Avoid duplicate character
        if (picked.some((c) => c.id === char.id)) continue;
        // Avoid Orochi / Normal counterpart on same team
        const counterpartId = OROCHI_COUNTERPARTS[char.id];
        if (counterpartId && picked.some((c) => c.id === counterpartId)) continue;
        picked.push(char);
      }
      return picked;
    };

    setTeam1(pickValidTeam());
    setTeam2(pickValidTeam());
  };

  const handleClearTeams = () => {
    setTeam1([null, null, null]);
    setTeam2([null, null, null]);
  };

  const handleOpenBookingWithPlan = (plan) => {
    setSelectedPlanForBooking(plan);
    setBookingModalOpen(true);
  };

  const handleScrollToSimulator = () => {
    const el = document.getElementById('simulator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-dark">
      {/* Scanline CRT overlay */}
      <div className="scanline-overlay" />

      {/* Navigation */}
      <Navbar onOpenBooking={() => setBookingModalOpen(true)} />

      {/* Hero Section */}
      <Hero
        onScrollToSimulator={handleScrollToSimulator}
        onOpenBooking={() => setBookingModalOpen(true)}
      />

      {/* Main Roster & Team Selector (Recuadros Vacíos que se llenan con imágenes de los personajes) */}
      <RosterSelect
        team1={team1}
        team2={team2}
        onSelectCharacter={handleSelectCharacter}
        onRemoveCharacter={handleRemoveCharacter}
        onApplyPreset={handleApplyPreset}
        onRandomize={handleRandomize}
        onClearTeams={handleClearTeams}
      />

      {/* Slot-by-Slot Matchup Comparison (Point, Mid, Anchor Breakdown) */}
      <MatchupComparison
        evaluation={battleEvaluation}
        team1={team1}
        team2={team2}
        onOpenBooking={() => setBookingModalOpen(true)}
      />

      {/* Final Verdict: Expected Overall Team Match Outcome & Mood System */}
      <FinalVerdict
        evaluation={battleEvaluation}
        team1={team1}
        team2={team2}
        onOpenBooking={() => setBookingModalOpen(true)}
      />

      {/* Coaching Programs / Mentorship */}
      <CoachingPrograms onSelectPlan={handleOpenBookingWithPlan} />

      {/* Frame Data & Mechanics Guide */}
      <MechanicsGuide />

      {/* Student Testimonials & FAQ */}
      <TestimonialsFAQ />

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        defaultTeam={team1.filter(Boolean)}
        selectedPlan={selectedPlanForBooking}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;

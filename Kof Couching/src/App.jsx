import React, { useState, useMemo } from 'react';
import { CHARACTERS, TEAM_PRESETS } from './data/characters';
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
  // Pre-populate with the legendary Xiaohai tournament meta team so the simulator is instantly alive
  const [team1, setTeam1] = useState([
    CHARACTERS.find((c) => c.id === 'chris'),
    CHARACTERS.find((c) => c.id === 'iori'),
    CHARACTERS.find((c) => c.id === 'daimon'),
  ]);

  const [team2, setTeam2] = useState([
    CHARACTERS.find((c) => c.id === 'ochris'),
    CHARACTERS.find((c) => c.id === 'chizuru'),
    CHARACTERS.find((c) => c.id === 'oyashiro'),
  ]);

  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedPlanForBooking, setSelectedPlanForBooking] = useState(null);

  // Compute live battle analysis whenever team compositions change
  const battleEvaluation = useMemo(() => {
    return evaluateTeamBattle(team1, team2);
  }, [team1, team2]);

  // Add / assign character to target team
  const handleSelectCharacter = (char, targetTeamNum) => {
    if (targetTeamNum === 1) {
      // Find first empty slot or replace slot 0
      const newTeam = [...team1];
      const emptyIdx = newTeam.findIndex((c) => !c);
      if (emptyIdx !== -1) {
        newTeam[emptyIdx] = char;
      } else {
        // Shift or cycle: replace slot 2
        newTeam[2] = char;
      }
      setTeam1(newTeam);
    } else {
      const newTeam = [...team2];
      const emptyIdx = newTeam.findIndex((c) => !c);
      if (emptyIdx !== -1) {
        newTeam[emptyIdx] = char;
      } else {
        newTeam[2] = char;
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
    const shuffled = [...CHARACTERS].sort(() => 0.5 - Math.random());
    setTeam1(shuffled.slice(0, 3));
    setTeam2(shuffled.slice(3, 6));
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

      {/* Main Roster & Team Selector (Hover & Pick) */}
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

// KOF '98 Matchup & Team Synergy Engine
import { MATCHUP_OVERRIDES } from '../data/characters';

// Calculate individual 1v1 matchup between two characters in a given slot
export function calculateSlotMatchup(char1, char2, slotIndex) {
  if (!char1 || !char2) return null;

  const slotRoles = ['Point (1st)', 'Mid (2nd)', 'Anchor (3rd)'];
  const slotName = slotRoles[slotIndex] || 'Duel';

  // Check explicit override
  const key1 = `${char1.id}_vs_${char2.id}`;
  const key2 = `${char2.id}_vs_${char1.id}`;

  let baseP1Win = 50;
  let customReason = '';

  if (MATCHUP_OVERRIDES[key1]) {
    baseP1Win = MATCHUP_OVERRIDES[key1].p1WinRate;
    customReason = MATCHUP_OVERRIDES[key1].reason;
  } else if (MATCHUP_OVERRIDES[key2]) {
    baseP1Win = 100 - MATCHUP_OVERRIDES[key2].p1WinRate;
    customReason = MATCHUP_OVERRIDES[key2].reason;
  } else {
    // Dynamic calculation from stats and tier
    const tierDiff = (char2.tierRank - char1.tierRank) * 2.5; // lower rank number is higher tier
    const neutralDiff = (char1.stats.neutral - char2.stats.neutral) * 0.4;
    const mixupDiff = (char1.stats.mixup - char2.stats.mixup) * 0.3;
    const defenseDiff = (char1.stats.defense - char2.stats.defense) * 0.2;
    const damageDiff = (char1.stats.damage - char2.stats.damage) * 0.3;

    baseP1Win = 50 + tierDiff + neutralDiff + mixupDiff + defenseDiff + damageDiff;
  }

  // Slot modifier
  let slotModifier = 0;
  let slotTip = '';

  if (slotIndex === 0) {
    // Point slot: 0 meter start, neutral & meterless priority
    const meterlessDiff = (char1.stats.meterless - char2.stats.meterless) * 0.5;
    slotModifier += meterlessDiff;
    if (char1.id === 'daimon' || char2.id === 'daimon') {
      // Daimon at point is suboptimal
      slotModifier += char1.id === 'daimon' ? -4 : 4;
    }
    if (char1.id === 'chris' || char2.id === 'chris') {
      // Chris at point is godlike battery
      slotModifier += char1.id === 'chris' ? 3 : -3;
    }
    slotTip = 'Duelo inicial sin medidor. Quien gane el neutral domina la creación de barras para el resto del equipo.';
  } else if (slotIndex === 1) {
    // Mid slot: 1-2 meters
    slotTip = 'Duelo intermedio clave. Momento para romper la inercia con Guard Cancel Roll o asegurar el match con 1 barra.';
  } else if (slotIndex === 2) {
    // Anchor slot: 3 meters / MAX mode potential
    const damageDiff = (char1.stats.damage - char2.stats.damage) * 0.6;
    slotModifier += damageDiff;
    if (char1.id === 'daimon') slotModifier += 6; // Daimon Anchor clutch god
    if (char2.id === 'daimon') slotModifier -= 6;
    if (char1.id === 'ochris') slotModifier += 3;
    if (char2.id === 'ochris') slotModifier -= 3;
    slotTip = 'Duelo de Anchor con hasta 3 barras. Un error de lectura o comando se traduce en muerte instantánea con supers en MAX.';
  }

  let finalP1Rate = Math.round(baseP1Win + slotModifier);
  // Clamp between 20% and 80% to keep realistic fighting game spread
  finalP1Rate = Math.max(22, Math.min(78, finalP1Rate));
  const finalP2Rate = 100 - finalP1Rate;

  // Formulate detailed tactical strengths & risks
  const p1Advantages = [];
  const p1Risks = [];

  if (char1.stats.neutral > char2.stats.neutral) {
    p1Advantages.push(`${char1.name} domina la distancia neutra con botones de mayor alcance y menor tiempo de recuperación.`);
  } else {
    p1Risks.push(`${char2.name} supera a ${char1.name} en el intercambio de pokes terrestres a media pantalla.`);
  }

  if (char1.stats.antiAir > char2.stats.antiAir) {
    p1Advantages.push(`Antiaéreo superior: ${char1.name} frena con facilidad los saltos cortos y hops de ${char2.name}.`);
  } else {
    p1Risks.push(`Cuidado al intentar antiaéreos lentos; la trayectoria aérea de ${char2.name} puede sobrepasar tu guardia.`);
  }

  if (char1.stats.mixup > char2.stats.mixup) {
    p1Advantages.push(`Mayor letalidad en wake-up: opciones de crossup, vacíos y golpes bajos difíciles de reaccionar.`);
  } else {
    p1Risks.push(`El juego de aperturas de ${char2.name} es altamente asfixiante tras derribo; no dudes en gastar barra de Guard Cancel.`);
  }

  if (char1.stats.damage >= char2.stats.damage) {
    p1Advantages.push(`Mayor ratio de daño por castigo confirmado, capitalizando errores del rival.`);
  } else {
    p1Risks.push(`Desventaja en intercambio puro de daño: no arriesgues a tradear golpes contra los botones pesados de ${char2.name}.`);
  }

  return {
    slotIndex,
    slotName,
    char1,
    char2,
    p1Rate: finalP1Rate,
    p2Rate: finalP2Rate,
    customReason: customReason || `${char1.name} (${char1.tier}) vs ${char2.name} (${char2.tier}) en posición ${slotName}.`,
    slotTip,
    p1Advantages,
    p1Risks,
    coachVerdict:
      finalP1Rate >= 55
        ? `Ventaja favorable para ${char1.name} (${finalP1Rate}%). Mantén el control con pokes y castiga las entradas forzadas de ${char2.name}.`
        : finalP1Rate <= 45
        ? `Matchup complicado para ${char1.name} (${finalP1Rate}%). Juega paciente, evita saltos telegrafiados y prioriza defensas sólidas.`
        : `Duelo 5-5 sumamente parejo (${finalP1Rate}% - ${finalP2Rate}%). Se definirá por quién controle mejor los safe hops y el timing de reversals.`,
  };
}

// Calculate team meter mood / affinity (Advance Mode rule in KOF 98)
export function calculateTeamMood(team) {
  if (!team || team.length < 2) return null;

  const links = [];
  let totalSynergyScore = 0;

  for (let i = 0; i < team.length - 1; i++) {
    const from = team[i];
    const to = team[i + 1];

    if (!from || !to) continue;

    let status = 'neutral';
    let label = 'Transferencia Normal (100% de barras acumuladas)';
    let score = 0;
    let icon = '😐';

    if (from.affinities?.likes?.includes(to.id)) {
      status = 'happy';
      label = `¡AFINIDAD MÁXIMA! ${from.name} pasa +1 BARRA EXTRA a ${to.name}`;
      score = +1;
      icon = '😄';
    } else if (from.affinities?.dislikes?.includes(to.id)) {
      status = 'angry';
      label = `¡RIVALIDAD DESTRUCTIVA! ${from.name} ODIA a ${to.name} y PIERDE TODAS LAS BARRAS acumuladas al caer`;
      score = -2;
      icon = '😡';
    }

    totalSynergyScore += score;
    links.push({
      from,
      to,
      status,
      label,
      score,
      icon,
    });
  }

  return {
    links,
    totalSynergyScore,
    isOptimal: totalSynergyScore > 0,
    hasSevereConflict: links.some((l) => l.status === 'angry'),
  };
}

// Complete evaluation of the 3v3 team matchup
export function evaluateTeamBattle(team1, team2) {
  if (!team1 || !team2 || team1.length !== 3 || team2.length !== 3) {
    return null;
  }

  // Ensure all characters are selected
  if (team1.some((c) => !c) || team2.some((c) => !c)) {
    return null;
  }

  // 1. Calculate each slot
  const slotMatchups = team1.map((c1, idx) => calculateSlotMatchup(c1, team2[idx], idx));

  // 2. Calculate moods
  const mood1 = calculateTeamMood(team1);
  const mood2 = calculateTeamMood(team2);

  // 3. Weight overall win rate:
  // Point: 30%, Mid: 30%, Anchor: 40% (anchor clutch matters more in KOF 98)
  const weightedBase =
    slotMatchups[0].p1Rate * 0.3 +
    slotMatchups[1].p1Rate * 0.3 +
    slotMatchups[2].p1Rate * 0.4;

  // Mood influence (up to +/- 5%)
  const synergyModifier = (mood1.totalSynergyScore - mood2.totalSynergyScore) * 2.5;

  let overallWinRate = Math.round(weightedBase + synergyModifier);
  overallWinRate = Math.max(20, Math.min(80, overallWinRate));
  const team2WinRate = 100 - overallWinRate;

  // Expected Series Score
  let expectedScore = '3 - 2';
  let matchPace = 'Duelo Cerrado';

  if (overallWinRate >= 65) {
    expectedScore = '3 - 0';
    matchPace = 'Dominio Táctico / Posible Ougi Sweep';
  } else if (overallWinRate >= 55) {
    expectedScore = '3 - 1';
    matchPace = 'Ventaja Sólida';
  } else if (overallWinRate <= 35) {
    expectedScore = '0 - 3';
    matchPace = 'Desventaja Crítica';
  } else if (overallWinRate <= 45) {
    expectedScore = '1 - 3';
    matchPace = 'Ventaja Rival';
  } else {
    expectedScore = '3 - 2';
    matchPace = 'Desenlace de Infarto (Último Round Anchor)';
  }

  // Team Anchor Clutch Evaluation
  const anchor1 = team1[2];
  const anchor2 = team2[2];
  const anchorComparison =
    anchor1.stats.damage + (anchor1.id === 'daimon' ? 10 : 0) >=
    anchor2.stats.damage + (anchor2.id === 'daimon' ? 10 : 0)
      ? {
          favors: 'team1',
          text: `${anchor1.name} tiene un potencial de clutch superior en la última línea gracias a su daño con 3 barras.`,
        }
      : {
          favors: 'team2',
          text: `${anchor2.name} tiene mayor capacidad de remontada en situación de Anchor rival si llega con medidor completo.`,
        };

  // Strategic Coaching Playbook
  const coachingPlaybook = [];

  if (slotMatchups[0].p1Rate >= 52) {
    coachingPlaybook.push(
      `Paso 1 (Point): Tu ${team1[0].name} tiene la ventaja inicial contra ${team2[0].name}. Juega agresivo pero sin gastar barras para entregarle a tu Mid una reserva intacta.`
    );
  } else {
    coachingPlaybook.push(
      `Paso 1 (Point): Tu ${team1[0].name} sufre ante ${team2[0].name}. No te desesperes en el neutral; juega al desgaste y prioriza cargar al menos 1-2 barras antes de caer.`
    );
  }

  if (mood1.hasSevereConflict) {
    coachingPlaybook.push(
      `¡ALERTA DE MEDIDOR! Tu equipo tiene un conflicto de afinidad (cara roja 😡). Si el primer combatiente acumula barras y cae, ¡SE PERDERÁN COMPLETAMENTE! Considera cambiar el orden del equipo para evitar este desastre táctico.`
    );
  } else if (mood1.isOptimal) {
    coachingPlaybook.push(
      `Ventaja de Sinergia: Tu composición cuenta con bonus de amistad (+1 barra extra). Esto te permite usar Guard Cancel Roll temprano sin miedo a quedarte seco.`
    );
  }

  if (anchor1.id === 'daimon') {
    coachingPlaybook.push(
      `Factor Daimon: Si tu Daimon entra con 2 o 3 barras, aprovecha el Roll Cancel Bug para meter Tenchi Gaeshi o castiga cualquier salto rival con st.D y MAX Otoshi.`
    );
  } else if (anchor1.id === 'ochris') {
    coachingPlaybook.push(
      `Factor Orochi Chris: Activa MAX Mode inmediatamente si tienes 3 barras y usa sus hyper hops con patadas bajas para derretir la barra del Anchor rival.`
    );
  } else {
    coachingPlaybook.push(
      `Gestión de Barra Final: Reserva al menos 1 barra de medidor en tu Anchor para un Guard Cancel CD que te saque de situaciones críticas en la esquina.`
    );
  }

  return {
    overallWinRate,
    team2WinRate,
    expectedScore,
    matchPace,
    slotMatchups,
    mood1,
    mood2,
    anchorComparison,
    coachingPlaybook,
  };
}

// Finds the permutation of 3 characters with the optimal mood synergy
export function findBestOrder(team) {
  if (!team || team.filter(Boolean).length < 2) return team;
  const chars = team.filter(Boolean);
  if (chars.length === 2) {
    const perm1 = [chars[0], chars[1]];
    const perm2 = [chars[1], chars[0]];
    const s1 = calculateTeamMood(perm1)?.totalSynergyScore || 0;
    const s2 = calculateTeamMood(perm2)?.totalSynergyScore || 0;
    return s2 > s1 ? [chars[1], chars[0], null] : [chars[0], chars[1], null];
  }
  if (chars.length === 3) {
    const permutations = [
      [chars[0], chars[1], chars[2]],
      [chars[0], chars[2], chars[1]],
      [chars[1], chars[0], chars[2]],
      [chars[1], chars[2], chars[0]],
      [chars[2], chars[0], chars[1]],
      [chars[2], chars[1], chars[0]],
    ];

    let bestPerm = permutations[0];
    let bestScore = -999;

    permutations.forEach((perm) => {
      const mood = calculateTeamMood(perm);
      if (mood) {
        let extraWeight = 0;
        // Anchor preference for Daimon
        if (perm[0].id === 'daimon') extraWeight -= 4;
        if (perm[2].id === 'daimon') extraWeight += 4;
        // Battery preference for Chris at point
        if (perm[0].id === 'chris') extraWeight += 3;

        const total = mood.totalSynergyScore * 10 + extraWeight;
        if (total > bestScore) {
          bestScore = total;
          bestPerm = perm;
        }
      }
    });

    return bestPerm;
  }
  return team;
}

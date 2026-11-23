// Datos de Mecánicas Universales y Glosario Competitivo de KOF '98

export const UNIVERSAL_MOVES = [
  {
    id: 'throw',
    name: 'Agarre Normal (Normal Throw)',
    category: 'Agarres & Rompimiento',
    command: '← o → + C (Puño Fuerte) / D (Patada Fuerte)',
    condition: 'Muy cerca del rival en el suelo',
    cost: 'Sin coste de barra',
    desc: 'Ataque imbloqueable a quemarropa. Lanza al oponente hacia adelante o atrás. Es la herramienta principal para castigar la defensa pasiva constante.',
    tips: 'No se puede bloquear; para evitarlo el rival debe saltar, alejarse o realizar un escape de agarre a tiempo.',
    badge: 'IMBLOQUEABLE',
    badgeType: 'arcade'
  },
  {
    id: 'throw_escape',
    name: 'Escape de Agarre (Throw Tech / Escape)',
    category: 'Agarres & Rompimiento',
    command: '← o → + C o D',
    condition: 'En el instante exacto de ser agarrado',
    cost: 'Sin coste de barra',
    desc: 'Anula el intento de agarre normal del contrincante, separando a ambos luchadores de vuelta a distancia neutral segura.',
    tips: 'Solo funciona contra agarres normales de C o D. Los agarres de comando especial (como Daimon, Clark, Shermie) NO se pueden techear.',
    badge: 'DEFENSIVO',
    badgeType: 'cyan'
  },
  {
    id: 'roll_forward',
    name: 'Rodada Hacia Adelante (Forward Emergency Evasion)',
    category: 'Evasión & Rodadas',
    command: 'A + B (o → + A + B)',
    condition: 'En el suelo en posición neutral o durante carrera',
    cost: 'Sin coste de barra',
    desc: 'El luchador rueda hacia adelante esquivando proyectiles y pasando a través del rival con invulnerabilidad total en el trayecto intermedio.',
    tips: '¡Cuidado! Los últimos frames de recuperación al terminar la rodada son completamente vulnerables a combos y agarres.',
    badge: 'ESQUIVA',
    badgeType: 'cyan'
  },
  {
    id: 'roll_backward',
    name: 'Rodada Hacia Atrás (Backward Evasion)',
    category: 'Evasión & Rodadas',
    command: '← + A + B',
    condition: 'En el suelo en posición neutral',
    cost: 'Sin coste de barra',
    desc: 'Evasión rápida hacia atrás que crea distancia inmediata y esquiva ataques frontales o proyectiles entrantes.',
    tips: 'Excelente recurso para escapar de esquinas o retroceder fuera del alcance de personajes de agarre como Daimon o Clark.',
    badge: 'RETROCESO',
    badgeType: 'cyan'
  },
  {
    id: 'blowback_ground',
    name: 'Golpe de Expulsión (Blowback Attack - CD)',
    category: 'Ataques Universales',
    command: 'C + D',
    condition: 'De pie en el suelo',
    cost: 'Sin coste de barra',
    desc: 'Golpe pesado de largo alcance que derriba al oponente (knockdown). Si impacta en Counter Hit, envía al rival flotando permitiendo combos aéreos (juggles).',
    tips: 'Se puede cancelar en ataques especiales o en rodada para engañar al rival o cubrir su recuperación.',
    badge: 'DERRIBO / COUNTER',
    badgeType: 'arcade'
  },
  {
    id: 'blowback_air',
    name: 'Golpe de Expulsión Aéreo (Jumping CD)',
    category: 'Ataques Universales',
    command: '(En el aire) C + D',
    condition: 'Durante cualquier salto',
    cost: 'Sin coste de barra',
    desc: 'Uno de los golpes más dominantes del juego aéreo en KOF. Cuenta con prioridad de hitbox superior y derriba al oponente si conecta.',
    tips: 'Excelente para presionar en saltos cortos (short hop CD) o controlar el espacio aéreo frenando saltos rivales.',
    badge: 'CONTROL AÉREO',
    badgeType: 'arcade'
  },
  {
    id: 'guard_cancel_roll',
    name: 'Guard Cancel Roll (Evasión en Guardia)',
    category: 'Defensa con Barra',
    command: 'A + B o ← + A + B (mientras bloqueas)',
    condition: 'Durante el aturdimiento de bloqueo (blockstun)',
    cost: '1 Barra de Stock',
    desc: 'Interrumpe inmediatamente el bloqueo realizando una rodada con invulnerabilidad total. Permite colocarse a la espalda del rival para castigar.',
    tips: 'Castigo asegurado contra movimientos con recuperación larga o para salir ileso de la asfixia en la esquina.',
    badge: 'CONSUME 1 BARRA',
    badgeType: 'gold'
  },
  {
    id: 'guard_cancel_cd',
    name: 'Guard Cancel CD (Contraataque en Guardia)',
    category: 'Defensa con Barra',
    command: 'C + D (mientras bloqueas)',
    condition: 'Durante el aturdimiento de bloqueo (blockstun)',
    cost: '1 Barra de Stock',
    desc: 'Interrumpe el bloqueo con un golpe de expulsión invulnerable que impacta al atacante y lo manda al otro extremo de la pantalla.',
    tips: 'El recurso definitivo cuando el rival ejecuta saltos cortos seguros (safe hops) y rodar sería demasiado arriesgado.',
    badge: 'CONSUME 1 BARRA',
    badgeType: 'gold'
  },
  {
    id: 'tech_roll',
    name: 'Recuperación de Caída (Tech Roll / Safe Fall)',
    category: 'Evasión & Rodadas',
    command: 'A + B al tocar el suelo',
    condition: 'Al impactar el piso tras ser derribado',
    cost: 'Sin coste de barra',
    desc: 'Tu personaje rueda de inmediato al tocar el piso levantándose de pie en milisegundos, evitando quedar expuesto a la trampa de okizeme rival.',
    tips: 'Solo funciona en derribos suaves (soft knockdown). Los súper ataques o agarres demoledores (hard knockdown) impiden rodar.',
    badge: 'RECUPERACIÓN',
    badgeType: 'cyan'
  },
  {
    id: 'run',
    name: 'Carrera (Run / Dash Frontal)',
    category: 'Movilidad & Saltos',
    command: '→ → (mantener presionado →)',
    condition: 'En el suelo (Advance Mode)',
    cost: 'Sin coste de barra',
    desc: 'Avance frontal a gran velocidad. Permite cancelar en cualquier momento con agacharse, golpe normal, salto con inercia o agarre rápido.',
    tips: 'Correr y presionar inmediatamente diagonal arriba genera saltos con inercia de alta velocidad (Hyper Hops).',
    badge: 'MOVILIDAD',
    badgeType: 'cyan'
  },
  {
    id: 'backdash',
    name: 'Paso Atrás (Backdash)',
    category: 'Movilidad & Saltos',
    command: '← ←',
    condition: 'En el suelo',
    cost: 'Sin coste de barra',
    desc: 'Salto hacia atrás corto y rasante. Otorga frames de invulnerabilidad baja o startup rápido para zafarse de situaciones incómodas.',
    tips: 'Muchos personajes pueden realizar ataques normales aéreos durante el retroceso para frenar persecuciones rivales.',
    badge: 'MOVILIDAD',
    badgeType: 'cyan'
  },
  {
    id: 'max_mode',
    name: 'Activación Modo MAX (Power Up)',
    category: 'Potenciadores de Sistema',
    command: 'A + B + C',
    condition: 'Tener al menos 1 barra de stock acumulada',
    cost: '1 Barra de Stock',
    desc: 'El personaje se ilumina e inicia una barra de tiempo decreciente: incrementa el daño de todos los ataques un +25% y desgasta la guardia rival mucho más rápido.',
    tips: 'Permite desatar Desperation Moves Potenciados (SDM / Súper MAX). Si ejecutas un SDM en modo MAX, gastas otra barra adicional.',
    badge: 'POTENCIADOR',
    badgeType: 'gold'
  },
  {
    id: 'taunt',
    name: 'Provocación (Taunt)',
    category: 'Potenciadores de Sistema',
    command: 'Botón Start',
    condition: 'De pie a cualquier distancia',
    cost: 'Sin coste de barra',
    desc: 'Gesto de burla característico de cada combatiente. Puede cancelarse en cualquier momento ingresando cualquier comando o movimiento.',
    tips: 'En Extra Mode reduce el medidor acumulado del oponente. En Advance sirve como presión psicológica o finta táctica.',
    badge: 'PSICOLÓGICO',
    badgeType: 'cyan'
  }
];

export const FIGHTING_GLOSSARY = [
  {
    term: 'Footsies',
    category: 'Neutral & Espacio',
    definition: 'El juego de neutral a media distancia donde ambos combatientes usan golpes normales rápidos (pokes), paso hacia adelante y retroceso para controlar el espacio, amagar y tentar al rival a cometer un error sin necesidad de saltar.',
    kofExample: 'El st.B de Benimaru, el st.D de Chris o el cr.B de Iori son los reyes del juego de footsies en KOF 98 para asfixiar al rival sin arriesgarse.'
  },
  {
    term: 'Punish (Castigo)',
    category: 'Ataque & Presión',
    definition: 'Impactar al oponente con un golpe o combo garantizado mientras este se encuentra atascado en los frames de recuperación final de un movimiento fallado o bloqueado en desventaja severa.',
    kofExample: 'Bloquear un Dragon Punch (como el Oniyaki de Kyo) en el suelo te deja tiempo de sobra para castigar con combo completo de 3 golpes + Súper.'
  },
  {
    term: 'Whiff Punish (Castigo de Golpe al Aire)',
    category: 'Neutral & Espacio',
    definition: 'Reaccionar ante un golpe normal que el rival tiró al aire sin tocarte (whiff), extendiendo tu propio golpe para impactar su extremidad extendida antes de que logre retraerla a su postura neutra.',
    kofExample: 'Si Daimon falla su patada pesada st.D a distancia, puedes conectar una barrida baja cr.D o un proyectil rápido mientras termina su animación.'
  },
  {
    term: 'Meaty (Golpe en Despertar)',
    category: 'Ataque & Presión',
    definition: 'Sincronizar un ataque para que sus frames activos impacten exactamente en el frame 1 en el que el oponente derribado se levanta del suelo (wake-up), forzándolo a bloquear o comerse el golpe si presiona cualquier botón.',
    kofExample: 'Colocar un cr.B meaty al levantarse el rival: si el oponente intenta tocar A o B para defenderse, el meaty entrará como Counter Hit automático.'
  },
  {
    term: 'Safe Jump (Salto Seguro)',
    category: 'Ataque & Presión',
    definition: 'Un salto ofensivo perfectamente cronometrado donde el atacante conecta justo cuando el rival se levanta; si el oponente bloquea o no hace nada queda bajo presión, pero si hace un reversal invulnerable (como DP), el atacante ya tocó el suelo y bloquea a tiempo.',
    kofExample: 'Tras ciertos knockdowns con Chris o Iori, un salto corto con golpe fuerte aterriza en 3-4 frames justos para bloquear un Oniyaki y castigarlo al descender.'
  },
  {
    term: 'Hit Confirm (Confirmación de Impacto)',
    category: 'Ataque & Presión',
    definition: 'La disciplina visual y refleja de conectar 1 o 2 golpes débiles rápidos en cadena y evaluar en una fracción de segundo si conectaron limpio para completar el Súper o especial, o detenerse en seguro si fueron bloqueados.',
    kofExample: 'Con Iori: iniciar con cr.B > cr.A. Si impacta confirmas en Aoihana o Ya Otome; si bloquea, te detienes o lanzas Yamibarai seguro.'
  },
  {
    term: 'Reversal',
    category: 'Defensa & Reversión',
    definition: 'Ejecutar un movimiento especial o súper ataque con frames de invulnerabilidad exactamente en el primer frame en que tu personaje recupera el control (al levantarse del piso o al salir de aturdimiento de guardia).',
    kofExample: 'Hacer el Shoryuken / Oniyaki de Kyo o el agarre Tenchi Gaeshi de Daimon justo al ponerse de pie para atravesar la ofensiva del rival.'
  },
  {
    term: 'Okizeme (Oki / Juego de Levantada)',
    category: 'Ataque & Presión',
    definition: 'La estrategia ofensiva completa y los dilemas impuestos al oponente mientras está tirado en el suelo levantándose: mezcla de golpe bajo, golpe alto (overhead), salto cruzado, agarre sorpresivo o finta (bait).',
    kofExample: 'En KOF 98 el oki depende críticamente de si el derribo fue suave (el rival rodó con Tech Roll) o duro (queda a merced de tu mejor trampa).'
  },
  {
    term: 'Cross-up (Cruce de Espalda)',
    category: 'Ataque & Presión',
    definition: 'Saltar por encima del oponente de modo que tu golpe impacte en su espalda o nuca, invirtiendo la dirección de bloqueo en el último milisegundo y quebrando su defensa.',
    kofExample: 'El icónico Yuri Ori (← + B en el aire) de Iori Yagami, o el salto con C de Mai Shiranui que cruza limpiamente la cabeza rival.'
  },
  {
    term: 'Rekka',
    category: 'Ataque & Presión',
    definition: 'Secuencia de ataques especiales que se ejecutan ingresando el mismo comando repetidamente de forma rítmica, permitiendo detener la cadena o completarla según la situación.',
    kofExample: 'El 127 Shiki: Aoihana de Iori (↓↙← + P tres veces) o las cadenas Dokugami / Aragami de Kyo Kusanagi.'
  },
  {
    term: 'Fuzzy Guard',
    category: 'Defensa & Reversión',
    definition: 'Técnica avanzada que aprovecha el breve retraso en la transición de la hurtbox al pasar de guardia agachada a guardia de pie, permitiendo conectar golpes aéreos instantáneos imbloqueables agachado.',
    kofExample: 'Forzar al rival a bloquear un golpe de pie y luego ejecutar un salto corto con ataque inmediato para abrirlo antes de que su animación baje.'
  },
  {
    term: 'Tick Throw (Agarre con Finta)',
    category: 'Ataque & Presión',
    definition: 'Conectar un golpe ligero en bloqueo (como cr.A o cr.B) para fijar al rival en defensa y, exactamente cuando expira su aturdimiento de guardia, encajar un comando de agarre antes de que reaccione.',
    kofExample: 'Daimon conectando cr.B en guardia seguido de inmediato por Tenchi Gaeshi (→↘↓↙←→ + C) de 1-frame: el rival no puede escapar en el piso.'
  },
  {
    term: 'Frame Trap (Trampa de Frames)',
    category: 'Ataque & Presión',
    definition: 'Dejar un espacio intencional minúsculo (1 a 3 frames) entre ataques consecutivos en guardia para tentar al oponente a presionar botones, haciendo que su arranque sea aplastado en Counter Hit.',
    kofExample: 'Con Kyo: st.C en guardia seguido de un leve retraso antes de 212 Shiki Kototsuki o Aragami para cazar desesperaciones rivales.'
  },
  {
    term: 'Vortex',
    category: 'Ataque & Presión',
    definition: 'Bucle ofensivo asfixiante donde cada derribo exitoso posiciona al atacante en una situación de 50/50 indescifrable donde, si el rival adivina mal, sufre otro combo que termina en idéntico derribo y reinicia el ciclo.',
    kofExample: 'La presión en esquina de Chris o los resets de agarre continuo de Clark tras conectar un Super Argentine Backbreaker.'
  },
  {
    term: 'Anti-Air (Antiaéreo)',
    category: 'Neutral & Espacio',
    definition: 'Cualquier golpe normal con excelente hitbox ascendente, ataque especial invulnerable o salto reactivo utilizado para derribar a un oponente que intenta atacar desde el aire.',
    kofExample: 'Zujou Barai (↘ + C) de Daimon, cr.C de Terry Bogard, st.A de Chris o el clásico Dragon Punch (→↓↘ + P).'
  },
  {
    term: 'Guard Crash (Rotura de Guardia)',
    category: 'Jerga KOF',
    definition: 'Cuando un combatiente bloquea demasiados golpes pesados en poco tiempo, su barra invisible de resistencia se agota: se produce un estallido rojo con sonido metálico y queda indefenso y aturdido por varios segundos.',
    kofExample: 'Personajes de asfixia pesada como Yashiro o Ralf pueden romper la guardia rival rápidamente si los encierran en la esquina.'
  },
  {
    term: 'Short Hop & Hyper Hop',
    category: 'Jerga KOF',
    definition: 'Variantes de saltos cortos y veloces exclusivas de la saga KOF que permiten alcanzar al rival en menos de 20 frames sin quedar flotando en el aire expuesto a antiaéreos lentos.',
    kofExample: 'El Short Hop (toque leve de salto) y el Hyper Hop (↓ luego ↗ rápido) son los motores del neutral moderno de KOF 98.'
  },
  {
    term: 'Roll Punish (Castigo de Rodada)',
    category: 'Defensa & Reversión',
    definition: 'Mantener la calma frente a un rival que abusa de rodar hacia ti (A+B), esperando pacientemente a que termine su animación para meterle un combo completo en su recuperación desprotegida.',
    kofExample: 'No tires golpes cuando rueda; gira tu personaje, espera a que termine su giro y castiga con C > combo completo.'
  },
  {
    term: 'Super Armor (Armadura)',
    category: 'Jerga KOF',
    definition: 'Propiedad especial que permite a un personaje absorber impactos de golpes enemigos sin interrumpir la ejecución ni la trayectoria de su propio movimiento.',
    kofExample: 'Ralf Jones cargando su Galactica Phantom o Maxima en sus agarres pesados pueden absorber golpes y conectar de lleno.'
  },
  {
    term: 'Corner Carry (Transporte a la Esquina)',
    category: 'Neutral & Espacio',
    definition: 'La capacidad de un personaje o combo de arrastrar al adversario a lo largo de toda la pantalla hasta estamparlo contra la esquina, donde sus opciones de movilidad se reducen a cero.',
    kofExample: 'El combo de Robert con Ryuugaku o la serie de patadas de Kim que empujan al rival desde el centro del escenario directo al rincón.'
  },
  {
    term: 'Soft Knockdown vs Hard Knockdown',
    category: 'Jerga KOF',
    definition: 'El Soft Knockdown permite al jugador derribado presionar A+B al tocar el suelo para rodar de inmediato. El Hard Knockdown no permite rodar, forzando a comerse la levantada lenta y el okizeme completo del atacante.',
    kofExample: 'Un golpe CD o barrida suele provocar Soft Knockdown; los agarres de Daimon o ciertos súper ataques provocan Hard Knockdown obligatorio.'
  },
  {
    term: 'Counter Hit (Contraataque)',
    category: 'Ataque & Presión',
    definition: 'Golpear al oponente durante los frames de inicio o frames activos de su propio ataque. Genera un efecto visual con sonido amplificado, mayor daño, mayor aturdimiento y permite hacer juggles con ataques CD.',
    kofExample: 'Conectar un st.CD en Counter Hit eleva al rival flotando muy alto, permitiéndote conectar un súper ataque antes de que toque el suelo.'
  }
];


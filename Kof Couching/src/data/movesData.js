// KOF '98 Command List & Special / Desperation Moves Database
// Official command lists for all 41 fighters

export const MOVES_DATA = {
  iori: {
    commandNormals: [
      { name: 'Ge Shiki: Yuri Ori', command: '(En el aire) ← + B', desc: 'Crossup insuperable de KOF 98; conecta por detrás de espaldas.' },
      { name: 'Ge Shiki: Gofu In "Shin"', command: '→ + B', desc: 'Golpe de pierna hacia abajo. Overhead en ejecución directa.' },
      { name: 'Ge Shiki: Yumebiki', command: '→ + A, A', desc: 'Doble golpe de garras. Confirm esencial para combos con Yamibarai o Ya Otome.' }
    ],
    specialMoves: [
      { name: '108 Shiki: Yamibarai', command: '↓↘→ + A o C', desc: 'Proyectil de llamas púrpuras que corre a ras del suelo.' },
      { name: '100 Shiki: Oniyaki', command: '→↓↘ + A o C', desc: 'Dragon Punch antiaéreo envuelto en llamas púrpuras con startup invencible.' },
      { name: '127 Shiki: Aoihana', command: '↓↙← + A o C (hasta 3 veces)', desc: 'Rekka triple fundamental de Iori. Derriba al oponente y acorrala.' },
      { name: '212 Shiki: Kototsuki In', command: '→↘↓↙← + B o D', desc: 'Carrera con golpe de codo seguido de agarre con explosión en el piso.' },
      { name: 'Kuzukaze (Scum Gale)', command: '(Cerca) →↘↓↙←→ + A o C', desc: 'Command grab que cambia de lado al rival y lo deja congelado para combo completo.' }
    ],
    desperationMoves: [
      { name: 'Kin 1211 Shiki: Ya Otome', command: '↓↘→↘↓↙← + A o C', desc: 'Súper Maiden. Pasa por debajo de proyectiles altos y confirma combos.' },
      { name: 'Ura 108 Shiki: Ya Sakazuki', command: '↓↙←↙↓↘→ + A o C', desc: 'Genera columnas de fuego que paralizan al rival por varios segundos.' },
      { name: 'Kin 1211 Shiki: Ya Otome (MAX)', command: '↓↘→↘↓↙← + AC', desc: 'SDM con explosión final en llamas púrpuras de daño colosal.', isMax: true }
    ]
  },

  ochris: {
    commandNormals: [
      { name: 'Muyou no Ono', command: '→ + A', desc: 'Giro de puño con avance.' },
      { name: 'Jukei no Oni', command: '→ + B', desc: 'Patada alta rápida.' },
      { name: 'Setsudan no Koto', command: '↘ + B', desc: 'Barrida baja con slide; esquiva proyectiles altos y confirma combos.' }
    ],
    specialMoves: [
      { name: 'Taiyou o Iru Honoo', command: '↓↘→ + A o C', desc: 'Esfera gigante de fuego oscuro que viaja lentamente para safe hops.' },
      { name: 'Tsuki o Tsumu Honoo', command: '→↓↘ + A o C', desc: 'Antiaéreo en torbellino de llamas negras con excelente hitbox.' },
      { name: 'Kagami o Hofuru Honoo', command: '↓↙← + A o C', desc: 'Salto parabólico envuelto en fuego; supera guardia baja.' },
      { name: 'Shishi o Kamu Honoo', command: '(Cerca) ←↙↓↘→ + B o D', desc: 'Ráfaga de golpes cuerpo a cuerpo que finaliza en llamas.' }
    ],
    desperationMoves: [
      { name: 'Ankoku Orochinagi', command: '↓↙←↙↓↘→ + A o C', desc: 'Ola gigante de fuego Orochi. Se puede mantener presionado para retrasar.' },
      { name: 'Daichi o Harau Gouka', command: '↓↘→↓↘→ + A o C', desc: 'Carga frontal en proyectil humano en llamas.' },
      { name: 'Ankoku Orochinagi (MAX)', command: '↓↙←↙↓↘→ + AC', desc: 'SDM con múltiples llamaradas masivas continuas.', isMax: true }
    ]
  },

  daimon: {
    commandNormals: [
      { name: 'Zujou Barai', command: '↘ + C', desc: 'Antiaéreo normal demoledor. Cancela en Tenchi Gaeshi o Súper.' }
    ],
    specialMoves: [
      { name: 'Jiranshin', command: '→↓↘ + A o C', desc: 'Pisotón telúrico imbloqueable de pie (evitable agachándose o saltando).' },
      { name: 'Kumo Tsukami Nage', command: '←↙↓↘→ + A', desc: 'Agarre antiaéreo que intercepta y azota a cualquiera que salte.' },
      { name: 'Kirikabu Gaeshi', command: '←↙↓↘→ + C', desc: 'Agarre de suelo OTG tras derribo; fundamental para combos.' },
      { name: 'Tenchi Gaeshi', command: '(Cerca) →↘↓↙←→ + A o C', desc: 'Command grab instantáneo de 1 frame con enorme daño.' },
      { name: 'Chou Oosotogari', command: '(Cerca) →↓↘ + B o D', desc: 'Zancadilla de judo con derribo pesado.' },
      { name: 'Nekko Gaeshi', command: '↓↘→ + B o D', desc: 'Contraataque / Parada de golpes físicos.' }
    ],
    desperationMoves: [
      { name: 'Jigoku Gokuraku Otoshi', command: '(Cerca) →↘↓↙←→↘↓↙← + A o C', desc: 'Súper agarre de azotes repetidos contra el suelo.' },
      { name: 'Arashi no Yama: Nekko Nuki', command: '(Cerca) ←↙↓↘→←↙↓↘→ + B o D', desc: 'Cadena de proyecciones con timing de botones adicionales.' },
      { name: 'Jigoku Gokuraku Otoshi (MAX)', command: '(Cerca) →↘↓↙←→↘↓↙← + AC', desc: 'Versión SDM que casi vacía la barra de salud rival.', isMax: true }
    ]
  },

  chizuru: {
    commandNormals: [
      { name: 'Joka', command: '→ + A', desc: 'Golpe con palma en avance.' },
      { name: 'Tengai', command: '→ + B', desc: 'Patada con salto frontal.' }
    ],
    specialMoves: [
      { name: '100 Katsu: Tenjin no Kotowari', command: '→↓↘ + A o C', desc: 'Antiaéreo con sombras reflectoras y gigantesca hitbox.' },
      { name: '212 Katsu: Otsu Shiki Choumon', command: '↓↙← + A o C', desc: 'Envía un clon de sombra que ataca a distancia.' },
      { name: '212 Katsu: Shinsoku no Shukukou', command: '↓↙← + B o D', desc: 'Desplazamiento con clon que confunde la posición real.' },
      { name: '94 Katsu: Rakuhou no Shitsumon', command: '↓↘→ + A o C', desc: 'Danza de clones que anulan y reflejan proyectiles.' }
    ],
    desperationMoves: [
      { name: 'San Shinki no Ichi', command: '↓↙←↙↓↘→ + A o C', desc: 'Sello de los Tres Tesoros: anula los movimientos especiales del rival.' },
      { name: 'San Shinki no Ni', command: '↓↘→↓↘→ + B o D', desc: 'Danza de clones sincronizados que barren la pantalla.' },
      { name: 'San Shinki no Ichi (MAX)', command: '↓↙←↙↓↘→ + AC', desc: 'SDM que silencia y desactiva poderes rivales por tiempo prolongado.', isMax: true }
    ]
  },

  chris: {
    commandNormals: [
      { name: 'Spinning Array', command: '→ + A', desc: 'Golpe con giro que enlaza normals.' },
      { name: 'Reverse Anchor Kick', command: '→ + B', desc: 'Overhead rápido de talón.' },
      { name: 'Carry Off Kick', command: '↘ + B', desc: 'Slide bajo veloz que pasa por debajo de proyectiles.' }
    ],
    specialMoves: [
      { name: 'Slide Touch', command: '↓↘→ + A o C', desc: 'Embestida de puños rápidos con deslizamiento.' },
      { name: 'Hunting Air', command: '→↓↘ + B o D', desc: 'Salto acrobático vertical antiaéreo.' },
      { name: 'Shooting Dancer Thrust', command: '→↘↓↙← + A o C', desc: 'Cadena de patadas y golpes con cambio de altura.' },
      { name: 'Shooting Dancer Step', command: '→↘↓↙← + B o D', desc: 'Entrada aérea que confunde el bloqueo rival.' },
      { name: 'Scramble Dash', command: '↓↘→ + B o D', desc: 'Teletransportación a ras de suelo a gran velocidad.' }
    ],
    desperationMoves: [
      { name: 'Chain Slide Touch', command: '↓↘→↓↘→ + A o C', desc: 'Ráfaga de puñetazos ultrarrápidos.' },
      { name: 'Twister Drive', command: '↓↙←↓↙← + B o D', desc: 'Remolino ascendente de patadas continuas.' },
      { name: 'Chain Slide Touch (MAX)', command: '↓↘→↓↘→ + AC', desc: 'SDM con remate devastador de alta velocidad.', isMax: true }
    ]
  },

  oyashiro: {
    commandNormals: [
      { name: 'Baku', command: '→ + A', desc: 'Puñetazo pesado overhead.' },
      { name: 'Buki', command: '→ + B', desc: 'Patada frontal de gran alcance.' }
    ],
    specialMoves: [
      { name: 'Kujiku Daichi', command: '↓↙← + A o C', desc: 'Salto con agarre aéreo imbloqueable que sorprende rivales.' },
      { name: 'Odoru Daichi', command: '←↙↓↘→ + B o D', desc: 'Carrera con agarre al cuello y estrangulamiento telúrico.' },
      { name: 'Niragu Daichi', command: '(Cerca) ←↙↓↘→ + A o C', desc: 'Command grab de 1 frame que estampa al rival.' },
      { name: 'Musebu Daichi', command: '(Cerca) →↘↓↙←→ + A o C', desc: 'Agarre demoledor que clava la cabeza del enemigo en la tierra.' }
    ],
    desperationMoves: [
      { name: 'Ankoku Jigoku Gokuraku Otoshi', command: '(Cerca) →↘↓↙←→↘↓↙← + A o C', desc: 'Súper agarre de azotes brutales contra el suelo.' },
      { name: 'Araburu Daichi', command: '↓↘→↓↘→ + B o D', desc: 'Salto en parábola que captura al rival en el aire o suelo.' },
      { name: 'Armageddon Buster (MAX)', command: '(Cerca) →↘↓↙←→↘↓↙← + AC', desc: 'SDM que provoca fisuras gigantescas en la tierra.', isMax: true }
    ]
  },

  kyo: {
    commandNormals: [
      { name: 'Ge Shiki: Gofu In', command: '→ + B', desc: 'Patada de talón overhead.' },
      { name: '88 Shiki', command: '↘ + D', desc: 'Doble patada baja confirmable.' },
      { name: 'Ge Shiki: Naraku Otoshi', command: '(En el aire) ↓ + C', desc: 'Golpe descendente con ambas manos; derriba y resetea saltos.' }
    ],
    specialMoves: [
      { name: '108 Shiki: Yamibarai', command: '↓↘→ + A o C', desc: 'Proyectil de fuego por el piso.' },
      { name: '100 Shiki: Oniyaki', command: '→↓↘ + A o C', desc: 'Dragon Punch clásico con fuego Kusanagi.' },
      { name: '114 Shiki: Aragami', command: '↓↘→ + A', desc: 'Rekka de puño flameante. Ramifica en Konokizu o Yanosabi.' },
      { name: '115 Shiki: Dokugami', command: '↓↘→ + C', desc: 'Rekka pesado con armadura en startup. Ramifica en Tsumiyomi.' },
      { name: '75 Shiki: Kai', command: '↓↘→ + B, B o D, D', desc: 'Doble patada ascendente que levanta al rival para combos.' },
      { name: '212 Shiki: Kototsuki You', command: '→↘↓↙← + B o D', desc: 'Carrera y sujeción con explosión de fuego.' },
      { name: 'R.E.D. Kick', command: '←↓↙ + B o D', desc: 'Patada voladora en arco que castiga agachados.' }
    ],
    desperationMoves: [
      { name: 'Ura 108 Shiki: Orochinagi', command: '↓↙←↙↓↘→ + A o C', desc: 'Ola gigante de fuego Kusanagi. Mantén presionado para cargar.' },
      { name: 'Saishuu Kessen Ougi: Mu Shiki', command: '↓↘→↓↘→ + A o C', desc: 'Pilar divino que atrapa al rival en una columna ardiente.' },
      { name: 'Ura 108 Shiki: Orochinagi (MAX)', command: '↓↙←↙↓↘→ + AC', desc: 'SDM con manto de fuego protector continuo.', isMax: true }
    ]
  },

  yashiro: {
    commandNormals: [
      { name: 'Regret Bash', command: '→ + A', desc: 'Puñetazo descendente overhead.' },
      { name: 'Step Kick', command: '→ + B', desc: 'Patada en avance.' }
    ],
    specialMoves: [
      { name: 'Missile Might Bash', command: '↓↙← + A o C', desc: 'Serie de puños en avance arrollador.' },
      { name: 'Upper Duel', command: '→↓↘ + A o C', desc: 'Gancho vertical antiaéreo de gran poder.' },
      { name: 'Jet Counter', command: '←↙↓↘→ + A o C', desc: 'Dash con golpe recto directo a la mandíbula.' },
      { name: 'Sledgehammer', command: '↓↙← + B o D', desc: 'Salto con puño martillo que derriba.' }
    ],
    desperationMoves: [
      { name: 'Final Impact', command: '↓↘→↓↘→ + A o C', desc: 'Impacto atómico de puño. Cargable al 100% para noquear.' },
      { name: 'Million Bash Stream', command: '↓↙←↙↓↘→ + A o C', desc: 'Lluvia imparable de puñetazos a máxima cadencia.' },
      { name: 'Final Impact (MAX)', command: '↓↘→↓↘→ + AC', desc: 'SDM capaz de quitar hasta un 80% de vida.', isMax: true }
    ]
  },

  mai: {
    commandNormals: [
      { name: 'Benitsuru no Mai', command: '↘ + B', desc: 'Barrida baja con abanico.' },
      { name: 'Tsubakuro no Mai', command: '(En el aire) ↓ + A', desc: 'Golpe aéreo con abanico descendente.' },
      { name: 'Ukihane', command: '(En el aire) ↓ + B', desc: 'Pisotón aéreo con ambas rodillas.' }
    ],
    specialMoves: [
      { name: 'Kachousen', command: '↓↘→ + A o C', desc: 'Lanzamiento de abanico proyectil.' },
      { name: 'Ryuuenbu', command: '↓↙← + A o C', desc: 'Giro con cola de kimono en llamas; excelente antiaéreo y poke.' },
      { name: 'Musasabi no Mai', command: '(En el aire o pared) ↓↙← + A o C', desc: 'Planeo veloz en picada con abanicos.' },
      { name: 'Hishou Ryuenjin', command: '→↓↘ + B o D', desc: 'Salto vertical con patada de fuego.' }
    ],
    desperationMoves: [
      { name: 'Chou Hissatsu Shinobi Bachi', command: '↓↙←↙↓↘→ + B o D', desc: 'Embestida frontal envuelta en fuego Ninja.' },
      { name: 'Hana Arashi', command: '↓↘→↓↘→ + A o C', desc: 'Danza de cortes continuos con abanicos.' },
      { name: 'Chou Hissatsu Shinobi Bachi (MAX)', command: '↓↙←↙↓↘→ + BD', desc: 'SDM con llamaradas gigantescas de alto daño.', isMax: true }
    ]
  },

  chang: {
    commandNormals: [
      { name: 'Hiki Nige', command: '↘ + A', desc: 'Slide bajo que golpea con la bola de hierro.' }
    ],
    specialMoves: [
      { name: 'Tekkyuu Dai Kaiten', command: 'A o C repetidamente', desc: 'Giro continuo de bola de hierro. Cancela presionando ABCD.' },
      { name: 'Tekkyuu Funsai Geki', command: '(Carga) ← [2s] → + A o C', desc: 'Embestida frontal con armadura contra proyectiles.' },
      { name: 'Tekkyuu Dai Bokusatsu', command: '↓↘→ + B o D', desc: 'Salto aplastante con la bola de demolición.' },
      { name: 'Dai Hakai Nage', command: '(Cerca) →↘↓↙←→ + A o C', desc: 'Command grab de 1 frame con azotes sucesivos.' }
    ],
    desperationMoves: [
      { name: 'Tekkyuu Dai Bousou', command: '↓↘→↘↓↙← + A o C', desc: 'Carrera descontrolada arrolladora.' },
      { name: 'Tekkyuu Dai Assatsu', command: '↓↘→↓↘→ + A o C', desc: 'Salto gigante y panzazo aplastante.' },
      { name: 'Tekkyuu Dai Bousou (MAX)', command: '↓↘→↘↓↙← + AC', desc: 'SDM con final aleatorio de daño masivo.', isMax: true }
    ]
  },

  ralf: {
    commandNormals: [],
    specialMoves: [
      { name: 'Vulcan Punch', command: 'A o C repetidamente', desc: 'Ametralladora de puños con avance.' },
      { name: 'Gatling Attack', command: '(Carga) ← [2s] → + A o C', desc: 'Combo de ganchos en avance veloz.' },
      { name: 'Super Argentine Backbreaker', command: '(Cerca) ←↙↓↘→ + B o D', desc: 'Command grab de quebradora en el aire.' },
      { name: 'Ralf Kick', command: '(Carga) ← [2s] → + B o D', desc: 'Patada voladora de largo alcance.' },
      { name: 'Ralf Tackle', command: '→↘↓↙← + B o D', desc: 'Embestida con hombro acorazada.' }
    ],
    desperationMoves: [
      { name: 'Baribari Vulcan Punch', command: '↓↘→↘↓↙← + A o C', desc: 'Lluvia de puños explosivos con remate de uppercut.' },
      { name: 'Galactica Phantom', command: '↓↘→↓↘→ + A o C', desc: 'Puño nuclear con invencibilidad y noqueo instantáneo.' },
      { name: 'Galactica Phantom (MAX)', command: '↓↘→↓↘→ + AC', desc: 'SDM con daño del 100% si conecta completamente.', isMax: true }
    ]
  },

  yamazaki: {
    commandNormals: [
      { name: 'Bussashi', command: '→ + A', desc: 'Golpe overhead con puñal oculto.' }
    ],
    specialMoves: [
      { name: 'Hebitsukai (Alto/Medio/Bajo)', command: '↓↙← + A / B / C', desc: 'Brazo látigo de gran alcance. Mantén botón para acumular y D para cancelar.' },
      { name: 'Sabaki no Me', command: '→↓↘ + A o C', desc: 'Cuchilladas rápidas a corta distancia.' },
      { name: 'Bai Gaeshi', command: '↓↘→ + A o C', desc: 'Absorbe o devuelve proyectiles rivales multiplicados.' },
      { name: 'Bakudan Pachiki', command: '(Cerca) →↘↓↙←→ + A o C', desc: 'Cabezazo violento command grab de 1 frame.' }
    ],
    desperationMoves: [
      { name: 'Guillotine', command: '↓↘→↓↘→ + A o C', desc: 'Gancho ascendente que arrastra y pisotea la cara del rival.' },
      { name: 'Drill', command: '(Cerca) →↘↓↙←→↘↓↙← + A o C', desc: 'Súper agarre de taladro; machaca botones para subir a Nivel 4.' },
      { name: 'Drill (MAX)', command: '(Cerca) →↘↓↙←→↘↓↙← + AC', desc: 'SDM con acceso al devastador Nivel 5.', isMax: true }
    ]
  },

  robert: {
    commandNormals: [
      { name: 'Kouryuu Koukyaku Geri', command: '→ + A', desc: 'Patada aérea descendente.' },
      { name: 'Ryuu Hanshuu', command: '→ + B', desc: 'Patada de talón overhead.' }
    ],
    specialMoves: [
      { name: 'Ryuugekiken', command: '↓↘→ + A o C', desc: 'Fireball proyectil Kyokugen.' },
      { name: 'Ryuuga', command: '→↓↘ + A o C', desc: 'Dragon Punch antiaéreo invencible.' },
      { name: 'Gen\'ei Kyaku', command: '→↘↓↙← + B o D', desc: 'Ráfaga de patadas en avance.' },
      { name: 'Kyokugenryuu Renken', command: '(Cerca) →↘↓↙← + A o C', desc: 'Cadena de puños a corta distancia.' }
    ],
    desperationMoves: [
      { name: 'Haoh Shoukou Ken', command: '→←↙↓↘→ + A o C', desc: 'Proyectil gigante de energía concentrada.' },
      { name: 'Ryuuko Ranbu', command: '↓↘→↘↓↙← + A o C', desc: 'Ranbu clásico Kyokugen con remate de fuego.' },
      { name: 'Ryuuko Ranbu (MAX)', command: '↓↘→↘↓↙← + AC', desc: 'SDM con impactos demoledores.', isMax: true }
    ]
  },

  benimaru: {
    commandNormals: [
      { name: 'Jackknife Heel', command: '→ + B', desc: 'Patada alta de control de espacio.' },
      { name: 'Flying Drill', command: '(En el aire) ↓ + D', desc: 'Taladro descendente en picada.' }
    ],
    specialMoves: [
      { name: 'Raijinken', command: '↓↘→ + A o C (también aire)', desc: 'Esfera eléctrica estática de gran cobertura.' },
      { name: 'Shinkuu Katategoma', command: '↓↙← + A o C', desc: 'Helicóptero giratorio de patadas.' },
      { name: 'Benimaru Colle', command: '(Cerca) →↘↓↙←→ + A o C', desc: 'Command grab con electrocución instantánea.' },
      { name: 'Iaido Geri', command: '↓↘→ + B o D', desc: 'Patada relámpago con remate Handou Sandan Geri.' }
    ],
    desperationMoves: [
      { name: 'Raikouken', command: '↓↘→↓↘→ + A o C', desc: 'Domo eléctrico gigante antiaéreo supremo.' },
      { name: 'Elec-Trigger', command: '(Cerca) →↘↓↙←→↘↓↙← + A o C', desc: 'Súper agarre de choque de alta tensión.' },
      { name: 'Raikouken (MAX)', command: '↓↘→↓↘→ + AC', desc: 'SDM con domo electrificado ampliado en pantalla.', isMax: true }
    ]
  },

  clark: {
    commandNormals: [
      { name: 'Stomping', command: '→ + B', desc: 'Pisotón de largo alcance.' }
    ],
    specialMoves: [
      { name: 'Super Argentine Backbreaker', command: '(Cerca) ←↙↓↘→ + B o D', desc: 'Quebradora aérea de 1 frame. Remata con Flashing Elbow (↓↘→ + P).' },
      { name: 'Frankensteiner', command: '→↓↘ + B o D', desc: 'Agarre de piernas acrobático que pasa guardias.' },
      { name: 'Napalm Stretch', command: '→↓↘ + A o C', desc: 'Agarre antiaéreo que captura rivales en el aire.' },
      { name: 'Rolling Cradle', command: '←↙↓↘→ + A o C', desc: 'Tackle rodante con sumisión.' }
    ],
    desperationMoves: [
      { name: 'Ultra Argentine Backbreaker', command: '(Cerca) →↘↓↙←→↘↓↙← + A o C', desc: 'Triple quebradora consecutiva demoledora.' },
      { name: 'Running Three', command: '←↙↓↘→←↙↓↘→ + B o D', desc: 'Carrera a pantalla completa con azotón de lucha libre.' },
      { name: 'Ultra Argentine Backbreaker (MAX)', command: '(Cerca) →↘↓↙←→↘↓↙← + AC', desc: 'SDM de quebradoras triples de altísimo daño.', isMax: true }
    ]
  },

  terry: {
    commandNormals: [
      { name: 'Back Knuckle', command: '→ + A', desc: 'Puñetazo de revés con gran alcance.' },
      { name: 'Rising Upper', command: '↘ + C', desc: 'Antiaéreo normal de puño ascendente.' }
    ],
    specialMoves: [
      { name: 'Power Wave', command: '↓↘→ + A', desc: 'Onda expansiva rasante por el suelo.' },
      { name: 'Round Wave', command: '↓↘→ + C', desc: 'Explosión de energía estática; da ventaja en bloqueo.' },
      { name: 'Burn Knuckle', command: '↓↙← + A o C', desc: 'Embestida de puño envuelto en energía.' },
      { name: 'Rising Tackle', command: '(Carga) ↓ [2s] ↑ + A o C', desc: 'Giro antiaéreo de patadas invertidas.' },
      { name: 'Crack Shoot', command: '↓↙← + B o D', desc: 'Patada de hacha aérea.' },
      { name: 'Power Dunk', command: '→↓↘ + B o D', desc: 'Salto con remate descendente de básquetbol.' }
    ],
    desperationMoves: [
      { name: 'Power Geyser', command: '↓↙←↙↓↘→ + A o C', desc: 'Géiser de energía volcánica de enorme hitbox.' },
      { name: 'High Angle Geyser', command: '↓↘→↓↘→ + B o D', desc: 'Cadena de embestidas con remate en géiser.' },
      { name: 'Triple Geyser (MAX)', command: '↓↙←↙↓↘→ + AC', desc: 'SDM que desata tres géiseres consecutivos.', isMax: true }
    ]
  },

  rugal: {
    commandNormals: [],
    specialMoves: [
      { name: 'Reppuken', command: '↓↘→ + A o C', desc: 'Onda cortante de viento por el suelo.' },
      { name: 'Kaiser Wave', command: '→←↙↓↘→ + A o C', desc: 'Esfera colosal cargable.' },
      { name: 'Genocide Cutter', command: '→↓↘ + B o D', desc: 'Patada vertical devastadora; reversal supremo.' },
      { name: 'God Press', command: '→↘↓↙← + A o C', desc: 'Carrera que estampa al rival contra la esquina.' },
      { name: 'Dark Barrier', command: '↓↘→ + B o D', desc: 'Escudo reflector de proyectiles.' }
    ],
    desperationMoves: [
      { name: 'Gigantic Pressure', command: '↓↘→↘↓↙← + A o C', desc: 'Embestida que aplasta al rival contra la pared con la calavera de energía.' },
      { name: 'Dead-End Screamer', command: '↓↘→↓↘→ + B o D', desc: 'Salto que cae pisando y quebrando el cuello del oponente.' },
      { name: 'Gigantic Pressure (MAX)', command: '↓↘→↘↓↙← + AC', desc: 'SDM con doble impacto contra la esquina.', isMax: true }
    ]
  },

  mary: {
    commandNormals: [
      { name: 'Hammer Arch', command: '→ + A', desc: 'Puño overhead de largo alcance.' },
      { name: 'Double Rolling', command: '→ + B', desc: 'Doble patada de control.' }
    ],
    specialMoves: [
      { name: 'Spin Fall', command: '↓↘→ + A o C', desc: 'Salto con giro descendente; encadena M. Spider (↓↘→ + P).' },
      { name: 'Straight Slicer', command: '(Carga) ← [2s] → + B o D', desc: 'Barrida baja veloz; encadena Crab Clutch (↓↘→ + K).' },
      { name: 'Vertical Arrow', command: '→↓↘ + B o D', desc: 'Antiaéreo ascendente; encadena M. Snatcher (→↓↘ + K).' },
      { name: 'Mary Spider', command: '(Cerca) →↘↓↙←→ + A o C', desc: 'Command grab de fractura articular.' }
    ],
    desperationMoves: [
      { name: 'Mary Typhoon', command: '(Cerca) →↘↓↙←→↘↓↙← + B o D', desc: 'Torbellino acrobático de sumisiones.' },
      { name: 'M. Splash Rose', command: '↓↘→↘↓↙← + A o C', desc: 'Dash con cadena de golpes y luxación.' },
      { name: 'Mary Typhoon (MAX)', command: '(Cerca) →↘↓↙←→↘↓↙← + BD', desc: 'SDM de luxaciones aéreas múltiples.', isMax: true }
    ]
  },

  leona: {
    commandNormals: [
      { name: 'Strike Arch', command: '→ + B', desc: 'Patada overhead en voltereta.' }
    ],
    specialMoves: [
      { name: 'Moon Slasher', command: '(Carga) ↓ [2s] ↑ + A o C', desc: 'Corte de luna antiaéreo supremo con enorme prioridad.' },
      { name: 'Baltic Launcher', command: '(Carga) ← [2s] → + A o C', desc: 'Esfera de cuchillas giratorias estática.' },
      { name: 'Ground Saber', command: '(Carga) ← [2s] → + B o D', desc: 'Dash bajo con corte; remata con Gliding Buster (→ + D).' },
      { name: 'X-Calibur', command: '(En el aire) ↓↙← + A o C', desc: 'Corte en cruz descendente desde el aire.' },
      { name: 'Earring Bomb', command: '↓↙← + B o D', desc: 'Granada rodante que explota por contacto o tiempo.' }
    ],
    desperationMoves: [
      { name: 'V-Slasher', command: '(En el aire) ↓↘→↘↓↙← + A o C', desc: 'Corte aéreo en V fulminante; se conecta desde cualquier normal cancelable.' },
      { name: 'Rebel Spark', command: '↓↙←↙↓↘→ + B o D', desc: 'Implante explosivo en el pecho del oponente.' },
      { name: 'V-Slasher (MAX)', command: '(En el aire) ↓↘→↘↓↙← + AC', desc: 'SDM en V con velocidad y daño descomunales.', isMax: true }
    ]
  },

  mature: {
    commandNormals: [
      { name: 'Crematory', command: '→ + B', desc: 'Patada media de control.' }
    ],
    specialMoves: [
      { name: 'Death Row', command: '↓↙← + A o C (hasta 3 veces)', desc: 'Rekka triple de zarpazos cortantes demoledor.' },
      { name: 'Despair', command: '↓↘→ + A o C', desc: 'Salto rasante con corte en picada.' },
      { name: 'Metal Massacre', command: '↓↙← + B o D', desc: 'Dash cortante de largo alcance.' },
      { name: 'Deicide', command: '←↙↓↘→ + B o D', desc: 'Agarre que arrastra y azota al rival.' }
    ],
    desperationMoves: [
      { name: 'Heaven\'s Gate', command: '↓↙←↙↓↘→ + B o D', desc: 'Carrera que estampa al rival contra la pared con la calavera de energía.' },
      { name: 'Nocturnal Rites', command: '↓↘→↓↘→ + A o C', desc: 'Ráfaga de cortes feroces continuos.' },
      { name: 'Heaven\'s Gate (MAX)', command: '↓↙←↙↓↘→ + BD', desc: 'SDM con doble impacto demoledor contra el muro.', isMax: true }
    ]
  },

  vice: {
    commandNormals: [
      { name: 'Dokusou', command: '→ + A', desc: 'Golpe de puño de aproximación.' }
    ],
    specialMoves: [
      { name: 'Outrage', command: '↓↙← + B o D', desc: 'Ráfaga de patadas cortantes veloces.' },
      { name: 'Ravenous', command: '(En el aire) ↓↙← + B o D', desc: 'Salto hacia adelante con zarpazos aéreos.' },
      { name: 'Gore Fest', command: '(Cerca) →↘↓↙←→ + A o C', desc: 'Command grab de azotes repetidos contra el suelo.' },
      { name: 'Mayhem', command: '↓↙← + A o C', desc: 'Salto con golpe de hombro y derribo.' },
      { name: 'Deicide', command: '←↙↓↘→ + B o D', desc: 'Agarre que arrastra al oponente por el suelo.' }
    ],
    desperationMoves: [
      { name: 'Negative Gain', command: '(Cerca) →↘↓↙←→↘↓↙← + B o D', desc: 'Súper agarre de giros aéreos y quebradura de cuello.' },
      { name: 'Withering Force', command: '↓↘→↓↘→ + A o C', desc: 'Salto con agarre y azotón masivo.' },
      { name: 'Negative Gain (MAX)', command: '(Cerca) →↘↓↙←→↘↓↙← + BD', desc: 'SDM con suplex giratorios continuos.', isMax: true }
    ]
  },

  king: {
    commandNormals: [
      { name: 'Sliding Kick', command: '↘ + D', desc: 'Barrida baja con patada extendida.' }
    ],
    specialMoves: [
      { name: 'Venom Strike', command: '↓↘→ + B o D', desc: 'Proyectil cortante de patada.' },
      { name: 'Double Strike', command: '↓↘→↓↘→ + B o D', desc: 'Doble proyectil consecutivo que castiga zoneo.' },
      { name: 'Tornado Kick', command: '→↘↓↙← + B o D', desc: 'Ataque giratorio de patadas con avance.' },
      { name: 'Trap Shot', command: '→↓↘ + B o D', desc: 'Salto vertical con lluvia de patadas descendentes.' },
      { name: 'Mirage Kick', command: '↓↙← + A o C', desc: 'Dash con patadas ilusorias continuas.' }
    ],
    desperationMoves: [
      { name: 'Illusion Dance', command: '↓↘→↘↓↙← + B o D', desc: 'Salto hacia atrás con arremetida de patadas aéreas.' },
      { name: 'Silent Flash', command: '↓↙←↓↙← + B o D', desc: 'Somersault vertical gigante de alto daño antiaéreo.' },
      { name: 'Illusion Dance (MAX)', command: '↓↘→↘↓↙← + BD', desc: 'SDM con ráfaga completa de patadas letales.', isMax: true }
    ]
  },

  kim: {
    commandNormals: [
      { name: 'Neryo Chagi', command: '→ + B', desc: 'Patada descendente overhead que abre guardias.' }
    ],
    specialMoves: [
      { name: 'Hangetsu Zan', command: '↓↙← + B o D', desc: 'Patada acrobática en media luna; segura en bloqueo.' },
      { name: 'Hien Zan', command: '(Carga) ↓ [2s] ↑ + B o D', desc: 'Somersault antiaéreo; remata en caída con ↓ + D.' },
      { name: 'Ryuusei Raku', command: '(Carga) ← [2s] → + B o D', desc: 'Barrida baja seguida de pisotón aplastante.' },
      { name: 'Hishou Kyaku', command: '(En el aire) ↓ + B o D', desc: 'Pisotones continuos en picada sobre la cabeza rival.' },
      { name: 'Kuusa Kyaku', command: '←↙↓↘→ + B o D', desc: 'Salto volador con patadas de taekwondo.' }
    ],
    desperationMoves: [
      { name: 'Hou\'ou Kyaku', command: '↓↙←↙↓↘→ + B o D', desc: 'Ranbu de patadas de justicia clásico.' },
      { name: 'Hou\'ou Hiten Kyaku', command: '↓↘→↓↘→ + B o D', desc: 'Patada vertical que deja al rival suspendido para combo aéreo.' },
      { name: 'Hou\'ou Kyaku (MAX)', command: '↓↙←↙↓↘→ + BD', desc: 'SDM con fénix de fuego y remate explosivo.', isMax: true }
    ]
  },

  athena: {
    commandNormals: [
      { name: 'Renkantai', command: '→ + B', desc: 'Patada media frontal.' },
      { name: 'Phoenix Bomb', command: '(En el aire) ↓ + B', desc: 'Golpe aéreo con cadera de excelente prioridad.' }
    ],
    specialMoves: [
      { name: 'Psycho Ball Attack', command: '↓↙← + A o C', desc: 'Fireball psíquica rápida para zoneo constante.' },
      { name: 'Psycho Sword', command: '→↓↘ + A o C (también aire)', desc: 'Espada psíquica antiaérea invencible.' },
      { name: 'Psycho Reflector', command: '→↘↓↙← + B o D', desc: 'Escudo que absorbe y devuelve proyectiles.' },
      { name: 'Phoenix Arrow', command: '(En el aire) ↓↙← + B o D', desc: 'Caída rodante en flecha psíquica.' },
      { name: 'Psycho Teleport', command: '↓↘→ + B o D', desc: 'Teletransportación rápida a espaldas o frente al rival.' }
    ],
    desperationMoves: [
      { name: 'Shining Crystal Bit', command: '→↘↓↙←→↘↓↙← + A o C (aire)', desc: 'Esferas psíquicas protectoras; remata con Crystal Shoot (↓↙← + P).' },
      { name: 'Phoenix Fang Arrow', command: '(En el aire) ↓↘→↓↘→ + B o D', desc: 'Ataque aéreo en picada con múltiples impactos.' },
      { name: 'Shining Crystal Bit (MAX)', command: '→↘↓↙←→↘↓↙← + AC (aire)', desc: 'SDM con lluvia de estrellas psíquicas.', isMax: true }
    ]
  },

  shingo: {
    commandNormals: [
      { name: 'Gofu Kakkou', command: '→ + B', desc: 'Patada de talón overhead.' }
    ],
    specialMoves: [
      { name: 'Aragami Mikansei', command: '↓↘→ + A', desc: 'Puñetazo de fuego incompleto; alta chance de Golpe Crítico.' },
      { name: 'Dokugami Mikansei', command: '↓↘→ + C', desc: 'Puño pesado que interrumpe ataques rivales con Crítico.' },
      { name: 'Oniyaki Mikansei', command: '→↓↘ + A o C', desc: 'Antiaéreo con caída torpe que puede conectar doble impacto.' },
      { name: 'Shingo Kick', command: '←↙↓↘→ + B o D', desc: 'Patada voladora en carrera de gran alcance.' },
      { name: 'Nie Togi', command: '(Cerca) →↓↘ + B o D', desc: 'Agarre de codazos y rodillazos sucesivos.' }
    ],
    desperationMoves: [
      { name: 'Kake Hourin', command: '↓↘→↓↘→ + A o C', desc: 'Embestida con hombro brutal con probabilidad de Crítico masivo.' },
      { name: 'Burning Shingo', command: '↓↙←↙↓↘→ + A o C', desc: 'Ranbu desordenado de golpes con gran daño.' },
      { name: 'Kake Hourin (MAX)', command: '↓↘→↓↘→ + AC', desc: 'SDM con Golpe Crítico y mareo garantizado.', isMax: true }
    ]
  },

  heidern: {
    commandNormals: [],
    specialMoves: [
      { name: 'Cross Cutter', command: '(Carga) ← [2s] → + A o C', desc: 'Proyectil cortante en cruz.' },
      { name: 'Moon Slasher', command: '(Carga) ↓ [2s] ↑ + A o C', desc: 'Corte de media luna antiaéreo supremo con inicio invencible.' },
      { name: 'Storm Bringer', command: '(Cerca) →↘↓↙← + A o C', desc: 'Command grab que succiona y drena la salud del oponente.' },
      { name: 'Neck Roller', command: '(Carga) ↓ [2s] ↑ + B o D', desc: 'Salto aéreo que atrapa y fractura el cuello del rival.' }
    ],
    desperationMoves: [
      { name: 'Final Brigadier', command: '↓↘→↘↓↙← + A o C', desc: 'Carrera con ráfaga de cortes militares.' },
      { name: 'Heidern End', command: '↓↙←↙↓↘→ + B o D', desc: 'Corte al pecho con ignición energética interna.' },
      { name: 'Final Brigadier (MAX)', command: '↓↘→↘↓↙← + AC', desc: 'SDM que absorbe vida y destruye la barra rival.', isMax: true }
    ]
  },

  oshermie: {
    commandNormals: [
      { name: 'Shermie Stand', command: '→ + B', desc: 'Patada media con avance.' }
    ],
    specialMoves: [
      { name: 'Yata no Nagi', command: '↓↘→ + A o C', desc: 'Beso que lanza un orbe eléctrico estático.' },
      { name: 'Raijin no Tsue', command: '(En el aire) ↓↘→ + B o D', desc: 'Patada de rayo en caída con excelente control aéreo.' },
      { name: 'Mugetsu no Raiun', command: '←↙↓↘→ + A / B / C / D', desc: 'Invoca un relámpago a corta, media, larga o extrema distancia.' },
      { name: 'Shajitsu no Odori', command: '↓↙← + A o C', desc: 'Giro evasivo electrificado de alta invulnerabilidad.' }
    ],
    desperationMoves: [
      { name: 'Ankoku Raikouken', command: '↓↘→↓↘→ + A o C', desc: 'Domo de rayos negros que electrocuta en 360 grados.' },
      { name: 'Shukumei, Maboroshi, Shinshi', command: '↓↙←↙↓↘→ + B o D', desc: 'Salto veloz con beso de alto voltaje fulminante.' },
      { name: 'Ankoku Raikouken (MAX)', command: '↓↘→↓↘→ + AC', desc: 'SDM de tormenta eléctrica negra masiva.', isMax: true }
    ]
  },

  shermie: {
    commandNormals: [
      { name: 'Shermie Stand', command: '→ + B', desc: 'Patada de control frontal.' }
    ],
    specialMoves: [
      { name: 'Shermie Spiral', command: '(Cerca) →↘↓↙←→ + A o C', desc: 'Command grab de 1 frame con giro de suplex gigante.' },
      { name: 'Shermie Whip', command: '↓↙← + A o C', desc: 'Salto con enganche de piernas y voltereta.' },
      { name: 'Shermie Clutch', command: '→↓↘ + B o D', desc: 'Antiaéreo de agarre que baja a los rivales del aire.' },
      { name: 'Shermie Shoot', command: '←↙↓↘→ + B o D', desc: 'Carrera con derribo y rodamiento acrobático.' }
    ],
    desperationMoves: [
      { name: 'Shermie Carnival', command: '(Cerca) →↘↓↙←→↘↓↙← + A o C', desc: 'Cadena de múltiples suplex de lucha libre.' },
      { name: 'Shermie Flash', command: '(Cerca) →↘↓↙←→↘↓↙← + B o D', desc: 'Súper agarre de sumisión y conteo de tres.' },
      { name: 'Shermie Carnival (MAX)', command: '(Cerca) →↘↓↙←→↘↓↙← + AC', desc: 'SDM con azotes gimnásticos devastadores.', isMax: true }
    ]
  },

  choi: {
    commandNormals: [
      { name: 'Toorian Geri', command: '→ + B', desc: 'Patada acrobática baja.' }
    ],
    specialMoves: [
      { name: 'Tatsumaki Shippuu Zan', command: '(Carga) ↓ [2s] ↑ + A o C', desc: 'Torbellino ascendente con garras antiaéreo.' },
      { name: 'Hishou Kuuretsu Zan', command: '(Carga) ↓ [2s] ↑ + B o D', desc: 'Rebote en la pared seguido de vuelo en picada con cuchillas.' },
      { name: 'Senpuu Hien Sashi', command: '(Carga) ← [2s] → + A o C', desc: 'Vuelo horizontal con garras a ras de suelo.' },
      { name: 'Hishou Shoukyaku', command: '(En el aire) ↓↘→ + B o D', desc: 'Pisotones sucesivos con garras en caída.' }
    ],
    desperationMoves: [
      { name: 'Shin! Chouzetsu Tatsumaki Shippuu Zan', command: '→↘↓↙←→↘↓↙← + A o C', desc: 'Tornado gigante que Choi puede desplazar libremente.' },
      { name: 'Hou\'ou Kyaku', command: '↓↘→↘↓↙← + B o D', desc: 'Ranbu de cuchilladas rápidas con remate aéreo.' },
      { name: 'Hou\'ou Kyaku (MAX)', command: '↓↘→↘↓↙← + BD', desc: 'SDM con lluvia final de estocadas.', isMax: true }
    ]
  },

  billy: {
    commandNormals: [
      { name: 'Dai Kaiten Geri', command: '→ + A', desc: 'Giro de bastón de medio alcance.' },
      { name: 'Boutaka Tobigeri', command: '→ + B', desc: 'Salto con garrocha y patada voladora.' }
    ],
    specialMoves: [
      { name: 'Sansetsu Kon Chuudan Uchi', command: '←↙↓↘→ + A o C', desc: 'Estocada de bastón extensible; remata con Kaen Sansetsu Kon (↓↘→ + P).' },
      { name: 'Senpuu Kon', command: 'A repetidamente', desc: 'Giro de bastón tipo escudo que frena proyectiles y saltos.' },
      { name: 'Suzume Otoshi', command: '↓↙← + A o C', desc: 'Estocada diagonal antiaérea precisa.' },
      { name: 'Kyoushuu Hishou Kon', command: '→↓↘ + B o D', desc: 'Salto acrobático que cae en llamas con el bastón.' }
    ],
    desperationMoves: [
      { name: 'Chou Kaen Senpuu Kon', command: '↓↘→↘↓↙← + A o C', desc: 'Giro flamígero que dispara un aro de fuego gigante.' },
      { name: 'Dai Senpuu', command: '↓↘→↓↘→ + A o C', desc: 'Giro arrollador con el bastón a corta distancia.' },
      { name: 'Chou Kaen Senpuu Kon (MAX)', command: '↓↘→↘↓↙← + AC', desc: 'SDM con aro de fuego impenetrable de alto daño.', isMax: true }
    ]
  },

  takuma: {
    commandNormals: [
      { name: 'Kawarigeri', command: '→ + B', desc: 'Patada media de kárate.' }
    ],
    specialMoves: [
      { name: 'Ko\'ou Ken', command: '↓↘→ + A o C', desc: 'Fireball proyectil directo Kyokugen.' },
      { name: 'Mouko Burai Gan', command: '↓↙← + A o C', desc: 'Ataque con parada de guardia invulnerable.' },
      { name: 'Hien Shippuukyaku', command: '←↙↓↘→ + B o D', desc: 'Doble patada voladora con avance.' },
      { name: 'Shouran Kyaku', command: '(Cerca) →↘↓↙← + B o D', desc: 'Carrera con sujeción y rodillazos continuos.' }
    ],
    desperationMoves: [
      { name: 'Haoh Shikou Ken', command: '→←↙↓↘→ + A o C', desc: 'Proyectil supremo cargado Kyokugen.' },
      { name: 'Ryuuko Ranbu', command: '↓↘→↘↓↙← + A o C', desc: 'Ranbu tradicional de kárate Kyokugen.' },
      { name: 'Shin Kishin Geki', command: '(Cerca) ↓↘→↓↘→ + A o C', desc: 'Combinación demoledora de golpes de karate a quemarropa.' }
    ]
  },

  ryo: {
    commandNormals: [
      { name: 'Hyouchuu Wari', command: '→ + A', desc: 'Golpe overhead de canto de mano de kárate.' }
    ],
    specialMoves: [
      { name: 'Ko\'ou Ken', command: '↓↘→ + A o C', desc: 'Fireball clásica de energía.' },
      { name: 'Kohou', command: '→↓↘ + A o C', desc: 'Dragon Punch antiaéreo supremo con inicio invencible.' },
      { name: 'Hien Shippuukyaku', command: '→↘↓↙← + B o D', desc: 'Patadas voladoras dobles.' },
      { name: 'Kyokugenryuu Renken', command: '(Cerca) →↘↓↙← + A o C', desc: 'Ráfaga de puñetazos continuos.' }
    ],
    desperationMoves: [
      { name: 'Haoh Shoukou Ken', command: '→←↙↓↘→ + A o C', desc: 'Onda colosal de energía Kyokugen.' },
      { name: 'Ryuuko Ranbu', command: '↓↘→↘↓↙← + A o C', desc: 'Ranbu arrollador con remate de fuego.' },
      { name: 'Tenchi Haoh Ken', command: '↓↘→↓↘→ + A o C', desc: 'Un solo puñetazo devastador que marea o noquea de inmediato.' }
    ]
  },

  yuri: {
    commandNormals: [
      { name: 'En Yoku', command: '→ + A', desc: 'Golpe de puño con avance.' }
    ],
    specialMoves: [
      { name: 'Ko\'ou Ken', command: '↓↘→ + A o C', desc: 'Fireball proyectil cargable.' },
      { name: 'Saiha', command: '↓↙← + A o C', desc: 'Escudo reflector y antiaéreo de energía.' },
      { name: 'Yuri Chou Upper (Kuuga)', command: '→↓↘ + A o C', desc: 'Gancho ascendente antiaéreo.' },
      { name: 'Hyakuretsu Binta', command: '→↘↓↙← + B o D', desc: 'Carrera con bofetadas cómicas pero letales.' },
      { name: 'Raou Ken', command: '(En el aire) ↓↘→ + A o C', desc: 'Esfera de energía en diagonal hacia abajo.' }
    ],
    desperationMoves: [
      { name: 'Hien Hou\'ou Kyaku', command: '↓↘→↘↓↙← + B o D', desc: 'Ranbu acrobático veloz.' },
      { name: 'Haoh Shoukou Ken', command: '→←↙↓↘→ + A o C', desc: 'Proyectil gigante Kyokugen.' },
      { name: 'Shin! Chou Upper', command: '↓↘→↓↘→ + A o C', desc: 'Cadena de ganchos ascendentes triples.' }
    ]
  },

  andy: {
    commandNormals: [
      { name: 'Uwaba Geri', command: '→ + B', desc: 'Patada alta frontal.' }
    ],
    specialMoves: [
      { name: 'Hishou Ken', command: '↓↙← + A o C', desc: 'Proyectil de energía veloz.' },
      { name: 'Shouryuu Dan', command: '→↓↘ + A o C', desc: 'Antiaéreo giratorio envuelto en fuego invencible.' },
      { name: 'Zaneiken', command: '↙→ + A o C', desc: 'Dash penetrante con codazo; remata con Gadan Kou (↓↘→ + P).' },
      { name: 'Kuuhadan', command: '←↙↓↘→ + B o D', desc: 'Salto parabólico con patadas en taladro.' },
      { name: 'Gekiheki Haisui Shou', command: '(Cerca) ←↙↓↘→ + A o C', desc: 'Command grab de cuatro impactos seguidos.' }
    ],
    desperationMoves: [
      { name: 'Chou Reppa Dan', command: '↓↙←↙↓↘→ + B o D', desc: 'Salto acrobático envuelto en fuego ninja.' },
      { name: 'Hishou Ryuusei Ken', command: '↓↘→↓↘→ + A o C', desc: 'Lluvia de puños a máxima velocidad.' },
      { name: 'Chou Reppa Dan (MAX)', command: '↓↙←↙↓↘→ + BD', desc: 'SDM con llamaradas ninja de gran tamaño.', isMax: true }
    ]
  },

  joe: {
    commandNormals: [
      { name: 'Low Kick', command: '→ + B', desc: 'Patada baja de Muay Thai.' },
      { name: 'Sliding', command: '↘ + B', desc: 'Barrida baja con deslizamiento.' }
    ],
    specialMoves: [
      { name: 'Hurricane Upper', command: '←↙↓↘→ + A o C', desc: 'Torbellinos proyectiles (uno con A, dos con C).' },
      { name: 'Tiger Kick', command: '→↓↘ + B o D', desc: 'Rodillazo antiaéreo de Muay Thai devastador.' },
      { name: 'Slash Kick', command: '←↙↓↘→ + B o D', desc: 'Patada voladora horizontal con gran empuje.' },
      { name: 'Ougon no Kakato', command: '↓↙← + B o D', desc: 'Patada de talón en hacha descendente.' },
      { name: 'Bakuretsuken', command: 'A o C repetidamente', desc: 'Ametralladora de puños; remata con Bakuretsu Hook (↓↘→ + P).' }
    ],
    desperationMoves: [
      { name: 'Screw Upper', command: '↓↘→↓↘→ + A o C', desc: 'Tornado colosal que domina la pantalla.' },
      { name: 'Bakuretsu Hurricane Tiger Heel', command: '↓↘→↘↓↙← + A o C', desc: 'Ranbu completo de técnicas de Muay Thai.' },
      { name: 'Screw Upper (MAX)', command: '↓↘→↓↘→ + AC', desc: 'SDM con doble tornado demoledor.', isMax: true }
    ]
  },

  kensou: {
    commandNormals: [
      { name: 'Kobokushu', command: '→ + A', desc: 'Palma overhead.' },
      { name: 'Kousentai', command: '→ + B', desc: 'Patada alta con giro.' }
    ],
    specialMoves: [
      { name: 'Choukyuu Dan', command: '↓↙← + A o C', desc: 'Fireball esférica de rápido recorrido para zoneo.' },
      { name: 'Ryuusou Geki', command: '(En el aire) ↓↙← + A o C', desc: 'Caída en picada con zarpazos de dragón.' },
      { name: 'Ryuu Gakusai', command: '←↓↙ + B o D', desc: 'Patada giratoria antiaérea.' },
      { name: 'Ryuurin Geki', command: '←↙↓↘→ + A o C', desc: 'Cadena de golpes a corta distancia.' }
    ],
    desperationMoves: [
      { name: 'Shinryuu Seikou Tenkyaku', command: '↓↘→↓↘→ + B', desc: 'Patadas verticales ascendentes de dragón.' },
      { name: 'Shinryuu Tenbu Kyaku', command: '↓↘→↘↓↙← + D', desc: 'Ranbu aéreo con patadas giratorias.' },
      { name: 'Nikuman o Kuu', command: '↓↙←↓↙← + A o C', desc: 'Come un bollo de carne al vapor y recupera salud.' }
    ]
  },

  chin: {
    commandNormals: [
      { name: 'Zakei', command: '→ + B', desc: 'Patada baja con pose de borracho.' }
    ],
    specialMoves: [
      { name: 'Hyoutan Geki', command: '↓↙← + A o C', desc: 'Ataque frontal con calabaza de licor.' },
      { name: 'Ryuu Kou Sai', command: '→↓↘ + A o C', desc: 'Antiaéreo con giro y escupitajo de fuego.' },
      { name: 'Kaiten Teki Kuutotsu Ken', command: '←↙↓↘→ + B o D', desc: 'Voltereta rodante por el suelo con sorpresa.' },
      { name: 'Suihai Kou', command: '↓↘→ + A o C', desc: 'Trago de licor que potencia el daño de sus técnicas.' }
    ],
    desperationMoves: [
      { name: 'Gouen Shourai', command: '↓↘→↓↘→ + A o C', desc: 'Danza giratoria de llamaradas continuas.' },
      { name: 'Gouran Enbou', command: '↓↘→↘↓↙← + A o C', desc: 'Llamarada a pantalla completa de enorme duración.' }
    ]
  },

  saisyu: {
    commandNormals: [
      { name: 'Gedan Gofu', command: '→ + B', desc: 'Patada de talón overhead.' }
    ],
    specialMoves: [
      { name: '108 Shiki: Yamibarai', command: '↓↘→ + A o C', desc: 'Proyectil de fuego por el suelo.' },
      { name: '100 Shiki: Oniyaki', command: '→↓↘ + A o C', desc: 'Dragon Punch con fuego Kusanagi ancestral.' },
      { name: '427 Shiki: Sakazuki', command: '→↘↓↙← + B o D', desc: 'Salto con explosión ígnea en el suelo.' },
      { name: '75 Shiki: Kai', command: '↓↘→ + B, B o D, D', desc: 'Doble patada ascendente que levanta al oponente.' },
      { name: '110 Shiki: Nata Guruma', command: '←↓↙ + B o D', desc: 'Patada de hacha aérea en giro.' }
    ],
    desperationMoves: [
      { name: 'Ura 108 Shiki: Orochinagi', command: '↓↙←↙↓↘→ + A o C', desc: 'Ola gigante de fuego ancestral Kusanagi.' },
      { name: 'Chi no Shukumei', command: '↓↘→↓↘→ + A o C', desc: 'Pilar volcánico que detona el suelo.' },
      { name: 'Ura 108 Shiki: Orochinagi (MAX)', command: '↓↙←↙↓↘→ + AC', desc: 'SDM con llamaradas triples devastadoras.', isMax: true }
    ]
  },

  heavyd: {
    commandNormals: [
      { name: 'Lock On', command: '→ + A', desc: 'Jab directo de largo alcance.' }
    ],
    specialMoves: [
      { name: 'D-Train', command: '↓↘→ + A o C', desc: 'Gancho directo veloz en carrera.' },
      { name: 'R.J.', command: '→↓↘ + A o C', desc: 'Uppercut antiaéreo demoledor de boxeo.' },
      { name: 'Blast', command: '↓↙← + A o C', desc: 'Proyectil de puño concentrado.' },
      { name: 'Shadow', command: '↓↙← + B o D', desc: 'Carga muscular que duplica el daño del siguiente golpe especial.' }
    ],
    desperationMoves: [
      { name: 'D-Crazy', command: '↓↘→↘↓↙← + A o C', desc: 'Ranbu completo de ganchos y jabs de boxeo.' },
      { name: 'D-Magnum', command: '↓↘→↓↘→ + A o C', desc: 'Puño recto explosivo con daño colosal.' }
    ]
  },

  lucky: {
    commandNormals: [
      { name: 'Dunk Drop', command: '(En el aire) ↓ + C', desc: 'Golpe aéreo con balón hacia abajo.' }
    ],
    specialMoves: [
      { name: 'Death Bound', command: '↓↘→ + A o C', desc: 'Lanza balón de básquetbol con rebote por el suelo.' },
      { name: 'Death Dunk', command: '↓↙← + A o C', desc: 'Lanza el balón desde las alturas sobre el rival.' },
      { name: 'Death Upper', command: '→↓↘ + A o C', desc: 'Gancho vertical antiaéreo de gran alcance.' },
      { name: 'Cyclone Break', command: '↓↙← + B o D', desc: 'Patadas en molino giratorio.' }
    ],
    desperationMoves: [
      { name: 'Hell Bound', command: '↓↘→↓↘→ + A o C', desc: 'Lanza una ráfaga de balones explosivos.' },
      { name: 'Lucky Driver', command: '↓↘→↘↓↙← + A o C', desc: 'Cadena de clavadas de básquetbol letales.' }
    ]
  },

  brian: {
    commandNormals: [],
    specialMoves: [
      { name: 'Brian Tackle', command: '←↙↓↘→ + B o D', desc: 'Tackle demoledor de fútbol americano.' },
      { name: 'Hyper Tackle', command: '↓↘→ + A o C', desc: 'Carga frontal con el hombro acorazada.' },
      { name: 'Screw Body Press', command: '(En el aire) ↓ + C', desc: 'Plancha en picada con el cuerpo.' },
      { name: 'Rocket Tackle', command: '→↓↘ + B o D', desc: 'Tackle ascendente antiaéreo.' }
    ],
    desperationMoves: [
      { name: 'Big Bomb Bomber', command: '↓↘→↓↘→ + A o C', desc: 'Tackle masivo que estampa y provoca un sismo.' },
      { name: 'American Supernova', command: '↓↘→↘↓↙← + A o C', desc: 'Salto con azotón aéreo supremo.' }
    ]
  }
};


// Dados falsos (mock) usados apenas no frontend, enquanto o backend
// (Node.js + Express + PostgreSQL) não está ligado.
// Cada item pertence a uma de 3 categorias: "jogos", "media", "literatura".
// As imagens são geradas dinamicamente (placehold.co) já com as cores do tema,
// só para servir de exemplo — substituir por imagens reais mais tarde.

const cover = (text) =>
  `https://placehold.co/500x700/1a1e1e/d50d14?font=roboto&text=${encodeURIComponent(
    text
  )}`;

export const products = [
  // ---------- JOGOS ----------
  {
    id: 1,
    category: "jogos",
    name: "Elden Ring",
    author: "FromSoftware",
    year: 2022,
    score: 9.6,
    image: cover("Elden Ring"),
    description:
      "Um RPG de ação em mundo aberto criado por FromSoftware em colaboração com George R. R. Martin. Combina exploração livre com o combate exigente característico do estúdio.",
  },
  {
    id: 2,
    category: "jogos",
    name: "The Witcher 3: Wild Hunt",
    author: "CD Projekt Red",
    year: 2015,
    score: 9.5,
    image: cover("The Witcher 3"),
    description:
      "Geralt de Rívia parte à procura da sua filha adotiva num mundo aberto repleto de escolhas morais complexas e missões secundárias memoráveis.",
  },
  {
    id: 3,
    category: "jogos",
    name: "Hollow Knight",
    author: "Team Cherry",
    year: 2017,
    score: 9.1,
    image: cover("Hollow Knight"),
    description:
      "Metroidvania desenhado à mão que se passa no reino subterrâneo de Hallownest, conhecido pela sua atmosfera sombria e nível de desafio elevado.",
  },
  {
    id: 4,
    category: "jogos",
    name: "God of War Ragnarök",
    author: "Santa Monica Studio",
    year: 2022,
    score: 9.4,
    image: cover("GoW Ragnarok"),
    description:
      "Kratos e Atreus enfrentam o Ragnarök na mitologia nórdica, num jogo que equilibra ação intensa com uma narrativa focada na relação entre pai e filho.",
  },
  {
    id: 5,
    category: "jogos",
    name: "Baldur's Gate 3",
    author: "Larian Studios",
    year: 2023,
    score: 9.7,
    image: cover("Baldur's Gate 3"),
    description:
      "RPG baseado em Dungeons & Dragons com liberdade quase total nas escolhas, combate por turnos e um nível de reatividade raramente visto no género.",
  },
  {
    id: 6,
    category: "jogos",
    name: "Hades",
    author: "Supergiant Games",
    year: 2020,
    score: 9.2,
    image: cover("Hades"),
    description:
      "Roguelike de ação em que Zagreus tenta fugir do Submundo, com uma narrativa que evolui a cada tentativa e diálogos escritos com enorme cuidado.",
  },

  // ---------- MÉDIA (filmes e séries relacionados com jogos) ----------
  {
    id: 7,
    category: "media",
    name: "The Last of Us",
    author: "HBO",
    year: 2023,
    score: 9.0,
    image: cover("The Last of Us"),
    description:
      "Adaptação televisiva do jogo da Naughty Dog, elogiada por manter a força emocional da história original de Joel e Ellie.",
  },
  {
    id: 8,
    category: "media",
    name: "Arcane",
    author: "Netflix / Riot Games",
    year: 2021,
    score: 9.3,
    image: cover("Arcane"),
    description:
      "Série de animação passada no universo de League of Legends, reconhecida pela direção de arte e pelo desenvolvimento das personagens de Piltover e Zaun.",
  },
  {
    id: 9,
    category: "media",
    name: "Castlevania",
    author: "Netflix",
    year: 2017,
    score: 8.7,
    image: cover("Castlevania"),
    description:
      "Série de animação inspirada na saga de jogos da Konami, centrada em Trevor Belmont e na luta contra Drácula.",
  },
  {
    id: 10,
    category: "media",
    name: "Cyberpunk: Edgerunners",
    author: "Netflix / CD Projekt Red",
    year: 2022,
    score: 8.9,
    image: cover("Edgerunners"),
    description:
      "Anime passado em Night City que acompanha David Martinez, expandindo o universo do jogo Cyberpunk 2077.",
  },
  {
    id: 11,
    category: "media",
    name: "Sonic 2: O Filme",
    author: "Paramount Pictures",
    year: 2022,
    score: 7.4,
    image: cover("Sonic 2"),
    description:
      "Sequela da adaptação cinematográfica da mascote da Sega, com foco na relação entre Sonic, Tails e Knuckles.",
  },
  {
    id: 12,
    category: "media",
    name: "Halo",
    author: "Paramount+",
    year: 2022,
    score: 6.8,
    image: cover("Halo"),
    description:
      "Série live-action baseada na franquia da 343 Industries, acompanhando o Master Chief numa guerra contra o Covenant.",
  },

  // ---------- LITERATURA (livros relacionados com jogos) ----------
  {
    id: 13,
    category: "literatura",
    name: "Blood, Sweat, and Pixels",
    author: "Jason Schreier",
    year: 2017,
    score: 9.0,
    image: cover("Blood Sweat Pixels"),
    description:
      "Reportagem sobre os bastidores conturbados do desenvolvimento de jogos como Diablo III, Destiny e The Witcher 3.",
  },
  {
    id: 14,
    category: "literatura",
    name: "Ready Player One",
    author: "Ernest Cline",
    year: 2011,
    score: 8.3,
    image: cover("Ready Player One"),
    description:
      "Romance de ficção científica passado num futuro dominado por um universo virtual repleto de referências à cultura gamer dos anos 80.",
  },
  {
    id: 15,
    category: "literatura",
    name: "A Saga de Geralt de Rívia",
    author: "Andrzej Sapkowski",
    year: 1993,
    score: 9.1,
    image: cover("Geralt de Rivia"),
    description:
      "Coletânea de romances que deu origem à franquia The Witcher, seguindo o bruxo Geralt de Rívia num mundo de fantasia moralmente ambíguo.",
  },
  {
    id: 16,
    category: "literatura",
    name: "Console Wars",
    author: "Blake J. Harris",
    year: 2014,
    score: 8.5,
    image: cover("Console Wars"),
    description:
      "Relato da rivalidade entre Sega e Nintendo nos anos 90, contado a partir dos bastidores da Sega of America.",
  },
  {
    id: 17,
    category: "literatura",
    name: "Press Reset",
    author: "Jason Schreier",
    year: 2021,
    score: 8.6,
    image: cover("Press Reset"),
    description:
      "Investigação sobre o fecho de estúdios de jogos e o impacto humano das crises na indústria, com testemunhos de várias equipas.",
  },
  {
    id: 18,
    category: "literatura",
    name: "Assassin's Creed: Renaissance",
    author: "Oliver Bowden",
    year: 2009,
    score: 7.8,
    image: cover("AC Renaissance"),
    description:
      "Adaptação literária do primeiro Assassin's Creed II, acompanhando Ezio Auditore em Itália durante o Renascimento.",
  },
];

// Reviews de exemplo, indexadas por id do produto.
export const reviewsByProduct = {
  1: [
    { id: 1, author: "Marta S.", score: 10, comment: "O melhor mundo aberto que já explorei. Cada canto tem algo por descobrir." },
    { id: 2, author: "Tiago R.", score: 9, comment: "Exigente mas justo. Os chefes são memoráveis." },
  ],
  2: [
    { id: 3, author: "Ines F.", score: 10, comment: "As missões secundárias contam histórias melhores que muitos jogos inteiros." },
  ],
  5: [
    { id: 4, author: "Pedro A.", score: 10, comment: "A liberdade de escolha é impressionante, quase tudo tem consequências." },
    { id: 5, author: "Sofia M.", score: 9, comment: "Longo, mas nunca cansativo. Companheiros muito bem escritos." },
  ],
  7: [
    { id: 6, author: "Rui C.", score: 9, comment: "Fiel ao jogo e ao mesmo tempo capaz de surpreender quem já o conhece." },
  ],
  14: [
    { id: 7, author: "Beatriz L.", score: 8, comment: "Nostálgico para quem cresceu com cultura gamer dos anos 80 e 90." },
  ],
};

export const categories = [
  { slug: "jogos", label: "Jogos" },
  { slug: "media", label: "Média" },
  { slug: "literatura", label: "Literatura" },
];

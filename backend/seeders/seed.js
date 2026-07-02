const sequelize = require("../config/database");
const { User, Publisher, Jogo, Midia, Literatura } = require("../models");

async function seedUsers() {
  const [admin, adminCreated] = await User.findOrCreate({
    where: { email: "admin@admin.pt" },
    defaults: {
      username: "admin",
      email: "admin@admin.pt",
      password: "123",
      admin: true,
    },
  });
  console.log(adminCreated ? "Admin criado." : "Admin já existia.");

  const [user, userCreated] = await User.findOrCreate({
    where: { email: "user@user.pt" },
    defaults: {
      username: "user",
      email: "user@user.pt",
      password: "123",
      admin: false,
    },
  });
  console.log(userCreated ? "Utilizador criado." : "Utilizador já existia.");

  return { admin, user };
}

async function seedPublishers() {
  const nomes = [
    "FromSoftware",
    "CD Projekt Red",
    "Team Cherry",
    "Santa Monica Studio",
    "Larian Studios",
    "HBO",
    "Netflix",
    "Paramount Pictures",
  ];

  const publishers = {};
  for (const nome of nomes) {
    const [publisher] = await Publisher.findOrCreate({
      where: { nome },
      defaults: { nome },
    });
    publishers[nome] = publisher;
  }
  console.log("Publishers prontos.");
  return publishers;
}

async function seedJogos(publishers) {
  const jogos = [
    {
      nome: "Elden Ring",
      descricao:
        "Um RPG de ação em mundo aberto criado pela FromSoftware em colaboração com George R. R. Martin.",
      ano_lancamento: 2022,
      publisherId: publishers["FromSoftware"].id,
    },
    {
      nome: "The Witcher 3: Wild Hunt",
      descricao:
        "Geralt de Rívia parte à procura da sua filha adotiva num mundo aberto repleto de escolhas morais complexas.",
      ano_lancamento: 2015,
      publisherId: publishers["CD Projekt Red"].id,
    },
    {
      nome: "Hollow Knight",
      descricao:
        "Metroidvania desenhado à mão que se passa no reino subterrâneo de Hallownest.",
      ano_lancamento: 2017,
      publisherId: publishers["Team Cherry"].id,
    },
    {
      nome: "God of War Ragnarök",
      descricao:
        "Kratos e Atreus enfrentam o Ragnarök na mitologia nórdica.",
      ano_lancamento: 2022,
      publisherId: publishers["Santa Monica Studio"].id,
    },
    {
      nome: "Baldur's Gate 3",
      descricao:
        "RPG baseado em Dungeons & Dragons com liberdade quase total nas escolhas e combate por turnos.",
      ano_lancamento: 2023,
      publisherId: publishers["Larian Studios"].id,
    },
  ];

  for (const jogo of jogos) {
    await Jogo.findOrCreate({ where: { nome: jogo.nome }, defaults: jogo });
  }
  console.log("Jogos prontos.");
}

async function seedMidia(publishers) {
  const midias = [
    {
      nome: "The Last of Us",
      tipo: "Serie",
      descricao:
        "Adaptação televisiva do jogo da Naughty Dog, com Joel e Ellie.",
      ano_lancamento: 2023,
      publisherId: publishers["HBO"].id,
    },
    {
      nome: "Arcane",
      tipo: "Serie",
      descricao:
        "Série de animação passada no universo de League of Legends.",
      ano_lancamento: 2021,
      publisherId: publishers["Netflix"].id,
    },
    {
      nome: "Castlevania",
      tipo: "Serie",
      descricao:
        "Série de animação inspirada na saga de jogos da Konami, com Trevor Belmont.",
      ano_lancamento: 2017,
      publisherId: publishers["Netflix"].id,
    },
    {
      nome: "Cyberpunk: Edgerunners",
      tipo: "Anime",
      descricao:
        "Anime passado em Night City que acompanha David Martinez.",
      ano_lancamento: 2022,
      publisherId: publishers["Netflix"].id,
    },
    {
      nome: "Sonic 2: O Filme",
      tipo: "Filme",
      descricao:
        "Sequela da adaptação cinematográfica da mascote da Sega.",
      ano_lancamento: 2022,
      publisherId: publishers["Paramount Pictures"].id,
    },
  ];

  for (const midia of midias) {
    await Midia.findOrCreate({ where: { nome: midia.nome }, defaults: midia });
  }
  console.log("Média pronta.");
}

async function seedLiteratura() {
  const livros = [
    {
      nome: "Blood, Sweat, and Pixels",
      autor: "Jason Schreier",
      descricao:
        "Reportagem sobre os bastidores conturbados do desenvolvimento de jogos.",
      ano_publicacao: 2017,
    },
    {
      nome: "Ready Player One",
      autor: "Ernest Cline",
      descricao:
        "Romance de ficção científica passado num futuro dominado por um universo virtual.",
      ano_publicacao: 2011,
    },
    {
      nome: "A Saga de Geralt de Rívia",
      autor: "Andrzej Sapkowski",
      descricao:
        "Coletânea de romances que deu origem à franquia The Witcher.",
      ano_publicacao: 1993,
    },
    {
      nome: "Console Wars",
      autor: "Blake J. Harris",
      descricao:
        "Relato da rivalidade entre Sega e Nintendo nos anos 90.",
      ano_publicacao: 2014,
    },
    {
      nome: "Press Reset",
      autor: "Jason Schreier",
      descricao:
        "Investigação sobre o fecho de estúdios de jogos e o impacto humano das crises na indústria.",
      ano_publicacao: 2021,
    },
  ];

  for (const livro of livros) {
    await Literatura.findOrCreate({ where: { nome: livro.nome }, defaults: livro });
  }
  console.log("Literatura pronta.");
}

async function seed() {
  try {
    await sequelize.sync();
    await seedUsers();
    const publishers = await seedPublishers();
    await seedJogos(publishers);
    await seedMidia(publishers);
    await seedLiteratura();
    console.log("Seed concluído com sucesso.");
  } catch (error) {
    console.error("Erro ao popular a base de dados:", error);
  } finally {
    await sequelize.close();
  }
}

seed();

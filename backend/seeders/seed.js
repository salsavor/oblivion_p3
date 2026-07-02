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
  const entradas = [
    { nome: "FromSoftware", tipo: "publisher" },
    { nome: "CD Projekt Red", tipo: "publisher" },
    { nome: "Team Cherry", tipo: "publisher" },
    { nome: "Santa Monica Studio", tipo: "publisher" },
    { nome: "Larian Studios", tipo: "publisher" },
    { nome: "HBO", tipo: "produtora" },
    { nome: "Netflix", tipo: "produtora" },
    { nome: "Paramount Pictures", tipo: "produtora" },
  ];

  const publishers = {};
  for (const { nome, tipo } of entradas) {
    const [publisher] = await Publisher.findOrCreate({
      where: { nome },
      defaults: { nome, tipo },
    });
    // Corrige o tipo se o publisher já existia de um seed anterior (antes do campo existir).
    if (publisher.tipo !== tipo) await publisher.update({ tipo });
    publishers[nome] = publisher;
  }
  console.log("Publishers e produtoras prontos.");
  return publishers;
}

async function seedJogos(publishers) {
  const jogos = [
    {
      nome: "Elden Ring",
      descricao:
        "Um RPG de ação em mundo aberto criado pela FromSoftware em colaboração com George R. R. Martin.",
      ano_lancamento: 2022,
      imagem_url: "https://cdng.europosters.eu/pod_public/1300/274373.jpg",
      publisherId: publishers["FromSoftware"].id,
    },
    {
      nome: "The Witcher 3: Wild Hunt",
      descricao:
        "Geralt de Rívia parte à procura da sua filha adotiva num mundo aberto repleto de escolhas morais complexas.",
      ano_lancamento: 2015,
      imagem_url:
        "https://image.api.playstation.com/vulcan/ap/rnd/202211/0711/kh4MUIuMmHlktOHar3lVl6rY.png",
      publisherId: publishers["CD Projekt Red"].id,
    },
    {
      nome: "Hollow Knight",
      descricao:
        "Metroidvania desenhado à mão que se passa no reino subterrâneo de Hallownest.",
      ano_lancamento: 2017,
      imagem_url:
        "https://m.media-amazon.com/images/M/MV5BMGIyYmJmZDgtOWQ1Ny00NDFiLTk2OTgtM2Q2ZWQ4OWIxZjg3XkEyXkFqcGc@._V1_.jpg",
      publisherId: publishers["Team Cherry"].id,
    },
    {
      nome: "God of War Ragnarök",
      descricao: "Kratos e Atreus enfrentam o Ragnarök na mitologia nórdica.",
      ano_lancamento: 2022,
      imagem_url:
        "https://assets-prd.ignimgs.com/2022/07/25/9781506733494-1658716557072.jpg",
      publisherId: publishers["Santa Monica Studio"].id,
    },
    {
      nome: "Baldur's Gate 3",
      descricao:
        "RPG baseado em Dungeons & Dragons com liberdade quase total nas escolhas e combate por turnos.",
      ano_lancamento: 2023,
      imagem_url:
        "https://cdn.selectgame.net/wp-content/uploads/2023/10/Baldurs-Gate-3-capa-24-10.webp",
      publisherId: publishers["Larian Studios"].id,
    },
  ];

  for (const jogo of jogos) {
    const [dados, created] = await Jogo.findOrCreate({
      where: { nome: jogo.nome },
      defaults: jogo,
    });
    if (!created && !dados.imagem_url)
      await dados.update({ imagem_url: jogo.imagem_url });
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
      imagem_url:
        "https://br.web.img3.acsta.net/pictures/22/11/30/19/53/5856320.jpg",
      publisherId: publishers["HBO"].id,
    },
    {
      nome: "Arcane",
      tipo: "Serie",
      descricao: "Série de animação passada no universo de League of Legends.",
      ano_lancamento: 2021,
      imagem_url:
        "https://m.media-amazon.com/images/M/MV5BYjA2NzhlMDItNWRmZC00MzRjLWE3ZjAtZjBlZDAwOWY2ODdjXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
      publisherId: publishers["Netflix"].id,
    },
    {
      nome: "Castlevania",
      tipo: "Serie",
      descricao:
        "Série de animação inspirada na saga de jogos da Konami, com Trevor Belmont.",
      ano_lancamento: 2017,
      imagem_url:
        "https://static.wikia.nocookie.net/castlevania/images/e/e0/Castlevania_-_Netflix_-_02.jpg/revision/latest?cb=20170630190429",
      publisherId: publishers["Netflix"].id,
    },
    {
      nome: "Cyberpunk: Edgerunners",
      tipo: "Anime",
      descricao: "Anime passado em Night City que acompanha David Martinez.",
      ano_lancamento: 2022,
      imagem_url:
        "https://static.wikia.nocookie.net/cyberpunk/images/c/c1/Cyberpunk_Edgerunners_Trigger_2.jpg/revision/latest/scale-to-width-down/1000?cb=20220801170122",
      publisherId: publishers["Netflix"].id,
    },
    {
      nome: "Sonic 2: O Filme",
      tipo: "Filme",
      descricao: "Sequela da adaptação cinematográfica da mascote da Sega.",
      ano_lancamento: 2022,
      imagem_url:
        "https://www.cm-pvarzim.pt/content/uploads/2022/03/filme-sonic-2-3-scaled.jpg",
      publisherId: publishers["Paramount Pictures"].id,
    },
  ];

  for (const midia of midias) {
    const [dados, created] = await Midia.findOrCreate({
      where: { nome: midia.nome },
      defaults: midia,
    });
    if (!created && !dados.imagem_url)
      await dados.update({ imagem_url: midia.imagem_url });
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
      imagem_url: "https://m.media-amazon.com/images/I/81KFnMWdq7L.jpg",
    },
    {
      nome: "Ready Player One",
      autor: "Ernest Cline",
      descricao:
        "Romance de ficção científica passado num futuro dominado por um universo virtual.",
      ano_publicacao: 2011,
      imagem_url:
        "https://upload.wikimedia.org/wikipedia/pt/c/c2/Ready_Player_One_%28livro%29.jpg",
    },
    {
      nome: "A Saga de Geralt de Rívia",
      autor: "Andrzej Sapkowski",
      descricao: "Coletânea de romances que deu origem à franquia The Witcher.",
      ano_publicacao: 1993,
      imagem_url:
        "https://m.media-amazon.com/images/I/81tPk-uLv7L._UF1000,1000_QL80_.jpg",
    },
    {
      nome: "Console Wars",
      autor: "Blake J. Harris",
      descricao: "Relato da rivalidade entre Sega e Nintendo nos anos 90.",
      ano_publicacao: 2014,
      imagem_url: "https://m.media-amazon.com/images/I/71tCIRPfQPL._SY466_.jpg",
    },
    {
      nome: "Press Reset",
      autor: "Jason Schreier",
      descricao:
        "Investigação sobre o fecho de estúdios de jogos e o impacto humano das crises na indústria.",
      ano_publicacao: 2021,
      imagem_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcuOhxLuKngAJx8c_y_gP26jZyBTEeClOHqQ1Xc0gyTyta7jBN",
    },
  ];

  for (const livro of livros) {
    const [dados, created] = await Literatura.findOrCreate({
      where: { nome: livro.nome },
      defaults: livro,
    });
    if (!created && !dados.imagem_url)
      await dados.update({ imagem_url: livro.imagem_url });
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

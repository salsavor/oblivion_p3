const sequelize = require("../config/database");
const User = require("../models/user.model");

async function seedUser() {
  try {
    await sequelize.sync();

    const [user, created] = await User.findOrCreate({
      where: { email: "admin@admin.pt" },
      defaults: {
        username: "admin",
        email: "admin@admin.pt",
        password: "123",
        admin: true,
      },
    });

    console.log(created ? "Admin criado!" : "Admin já existe.");
  } catch (error) {
    console.error("Erro ao criar utilizador:", error);
  } finally {
    await sequelize.close();
  }
}

seedUser();

const fs = require("fs");
const path = require("path");

function setupHandlers(bot) {
  bot.command("start", async (ctx) => {
    const socialNetworks = loadSocialNetworks();
    const buttons = generateAdsButtons(socialNetworks);

    await ctx.reply(
      `Привет!👋 Добро пожаловать! У нас также есть другие соцсети. Подпишись!`,
      {
        reply_markup: {
          inline_keyboard: [buttons],
        },
      }
    );

    // Добавляем задержку в 3 секунды перед отправкой сообщения о каталоге
    setTimeout(async () => {
      await ctx.reply("Вот наши товары:", {
        reply_markup: {
          inline_keyboard: [[{ text: "Каталог", callback_data: "catalog" }]],
        },
      });
    }, 3000);
  });

  bot.command("socials", async (ctx) => {
    const socialNetworks = loadSocialNetworks();
    const buttons = generateAdsButtons(socialNetworks);

    return await ctx.reply("Наши соцсети", {
      reply_markup: {
        inline_keyboard: [buttons],
      },
    });
  });
  bot.command("catalog", async (ctx) => {
    const goods = loadGoods();
    for (let i = 0; i < goods.length; i++) {
      setTimeout(async () => {
        await sendProduct(ctx, goods[i]);
      }, i * 2500);
    }
  });

  bot.action("catalog", async (ctx) => {
    const goods = loadGoods();
    for (let i = 0; i < goods.length; i++) {
      setTimeout(async () => {
        await sendProduct(ctx, goods[i]);
      }, i * 2500);
    }
  });
}

async function sendProduct(ctx, product) {
  const message = `*${product.name}*\nЦiна: ${product.price} грн\n${product.description}`;
  await ctx.reply(message, { parse_mode: "Markdown" });
}

function loadGoods() {
  const filePath = path.join(__dirname, "../data/goods/goods.json");
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

function loadSocialNetworks() {
  const filePath = path.join(__dirname, "../data/social_networks.json");
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

function generateAdsButtons(socialNetworks) {
  return socialNetworks.map((network) => ({
    text: network.name,
    url: network.url,
  }));
}

module.exports = { setupHandlers };

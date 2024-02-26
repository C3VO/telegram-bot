const fs = require("fs");
const path = require("path");

function loadGoods() {
  const filePath = path.join("../data/goods/goods.json");
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

function generateGoodsButtons(goods, page, pageSize) {
  const startIdx = (page - 1) * pageSize;
  const endIdx = startIdx + pageSize;
  const pageGoods = goods.slice(startIdx, endIdx);

  return pageGoods.map((good) => ({
    text: good.name,
    callback_data: `show_good_${good.name}`,
  }));
}

function Goods(bot) {
  bot.command("goods", async (ctx) => {
    const goods = loadGoods();
    const pageSize = 3;
    let page = 1;

    const buttons = generateGoodsButtons(goods, page, pageSize);

    return await ctx.reply("Выберите товар:", {
      reply_markup: {
        inline_keyboard: [buttons],
      },
    });
  });

  // Обработка нажатия на кнопку с товаром
  bot.on("callback_query", async (ctx) => {
    const goods = loadGoods();
    const pageSize = 3; // Установите размер страницы по вашему усмотрению
    let page = 1;

    const data = ctx.callbackQuery.data;

    if (data.startsWith("show_good_")) {
      const goodName = data.replace("show_good_", "");
      const selectedGood = goods.find((good) => good.name === goodName);

      if (selectedGood) {
        // Отправляем информацию о выбранном товаре
        await ctx.reply(`${selectedGood.name}\n${selectedGood.description}`);
      } else {
        await ctx.reply("Товар не найден.");
      }
    }
  });
}

module.exports = { Goods };

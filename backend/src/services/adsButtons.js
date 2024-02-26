const { Markup } = require("telegraf");

function adsButtons(bot) {
  bot.command("start", (ctx) => {
    const instagramLink = "https://www.instagram.com/mobiart.com.ua/";
    const caption = "Привет! Добро пожаловать!\nПодпишитесь на наш Instagram:";

    // Создаем кнопку для перехода на Instagram
    const button = Markup.inlineKeyboard([
      Markup.urlButton("Instagram", instagramLink),
    ]);

    // Отправляем приветственное сообщение с кнопкой
    ctx
      .reply(caption, button.extra())
      .catch((error) => console.log("Error sending message:", error));
  });

  bot.on("text", (ctx) => {
    // Обработка текстовых сообщений, если необходимо
  });
}

module.exports = { adsButtons };

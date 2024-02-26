const { Telegraf } = require("telegraf");
const { setupHandlers } = require("./src/services/handlers");
const { dataHandler } = require("./src/services/dataHandler");

const token = "6787056028:AAHrokq8OaZO10EeODjsEa0Zbb5n2QaatbU";
const bot = new Telegraf(token);

setupHandlers(bot);
dataHandler(bot);

bot.launch();
console.log("Server started!");

const fs = require("fs");

function dataHandler(bot) {
  bot.on("text", (ctx) => {
    const { message } = ctx;
    const text = message.text;
    const userId = message.from.id;
    const userFirstName = message.from.first_name;
    const userName = message.from.username;
    const messageObject = {
      userId: userId,
      userName: userName,
      userFirstName: userFirstName,
      text: text,
      timestamp: new Date().toISOString(),
    };

    const userObject = {
      userId: userId,
      userName: userName,
    };

    const messagesFilePath = "./src/data/users/messages.json";
    const usersFilePath = "./src/data/users/users.json";

    const messages = JSON.parse(
      fs.readFileSync(messagesFilePath, "utf8") || "[]"
    );
    messages.push(messageObject);
    fs.writeFileSync(messagesFilePath, JSON.stringify(messages, null, 2));

    const users = JSON.parse(fs.readFileSync(usersFilePath, "utf8") || "[]");

    const existingUser = users.find((user) => user.userId === userId);

    if (!existingUser) {
      users.push(userObject);
      fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
      console.log(`User ${userName} added to users.json`);
    } else {
      console.log("User already exists in users.json");
    }
    console.log("Saved!");
    console.log(message);
  });
}

module.exports = { dataHandler };

const TickTickAPI = require("ticktick-node-api");
require("dotenv").config();

async function execute() {
  const api = new TickTickAPI();

  await api.login({
    username: process.env.TICKTICK_USERNAME,
    password: process.env.TICKTICK_PASSWORD,
  });

  const tasks = await api.getTasks({ name: "Ligue", status: 0 });
  console.log(tasks);
}

execute();

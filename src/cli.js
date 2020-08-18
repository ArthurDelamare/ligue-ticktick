require("dotenv").config();
const program = require("commander");
const TickTickAPI = require("ticktick-node-api");

async function execute() {
  const api = new TickTickAPI();

  await api.login({
    username: process.env.TICKTICK_USERNAME,
    password: process.env.TICKTICK_PASSWORD,
  });

  const tasks = await api.getTasks({ name: "Ligue", status: 0 });

  console.log("Objectifs du jour :");
  for (const task of tasks) {
    console.log(`:construction: ${task.title}`);
  }
}

program.command("test").action(() => execute());

program.parse(process.argv);

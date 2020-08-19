require("dotenv").config();
const program = require("commander");
const TickTickAPI = require("ticktick-node-api");
const ora = require("ora");

program.version("0.0.1");

async function execute() {
  const api = new TickTickAPI();

  const connectSpinner = ora("Connexion à TickTick").start();
  await api.login({
    username: process.env.TICKTICK_USERNAME,
    password: process.env.TICKTICK_PASSWORD,
  });
  connectSpinner.succeed();

  const goalsSpinner = ora("Récupération des objectifs").start();
  const tasks = await api.getTasks({ name: "Ligue", status: 0 });
  goalsSpinner.succeed();

  console.log();
  console.log("Objectifs du jour :");
  for (const task of tasks) {
    console.log(`:construction: ${task.title}`);
  }
}

program.command("get-goals").action(() => execute());

program.parse(process.argv);

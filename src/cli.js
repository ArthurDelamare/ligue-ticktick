#!/usr/bin/env node

require("dotenv").config();
const program = require("commander");
const TickTickAPI = require("ticktick-node-api");
const ora = require("ora");

program.version("0.0.1");

/**
 * @description function to connect to TickTick,
 * grab the tasks from a specific project then, display the goals
 * @param {*} todoEmoji the discord emoji to show before a goal
 * @param {*} projectName the name of the project containing the tasks
 */
async function generateGoals(
  todoEmoji = ":construction:",
  projectName = "Ligue"
) {
  const api = new TickTickAPI();

  const connectSpinner = ora("Connexion à TickTick").start();
  await api.login({
    username: process.env.TICKTICK_USERNAME,
    password: process.env.TICKTICK_PASSWORD,
  });
  connectSpinner.succeed();

  const goalsSpinner = ora("Récupération des objectifs").start();
  const tasks = await api.getTasks({ name: projectName, status: 0 });
  goalsSpinner.succeed();

  console.log();
  console.log("Objectifs du jour :");
  for (const task of tasks) {
    console.log(`${todoEmoji} ${task.title}`);
  }
}

program
  .command("get-goals")
  .option(
    "-t, --todo <emoji>",
    "détermine l'emoji à utiliser pour une tâche à faire",
    ":construction:"
  )
  .option(
    "-p, --project <name>",
    "nom du projet TickTick contenant les tâches à récupérer",
    "Ligue"
  )
  .action((options) => generateGoals(options.todo, options.project));

program.parse(process.argv);

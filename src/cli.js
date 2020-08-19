#!/usr/bin/env node

const program = require("commander");
const TickTickAPI = require("ticktick-node-api");
const ora = require("ora");
const path = require("path");

const envFileArray = __dirname.split(path.sep);
envFileArray.pop();
const envFile = envFileArray.join(path.sep) + path.sep + ".env";
require("dotenv").config({ path: envFile });

/**
 * @description function to connect to TickTick,
 * grab the tasks from a specific project then, display the goals
 * @param {*} todoEmoji the discord emoji to show before a goal
 * @param {*} listName the name of the project containing the tasks
 */
async function generateGoals(todoEmoji = ":construction:", listName = "Ligue") {
  const api = new TickTickAPI();

  const connectSpinner = ora("Connexion à TickTick").start();
  try {
    await api.login({
      username: process.env.TICKTICK_USERNAME,
      password: process.env.TICKTICK_PASSWORD,
    });
    connectSpinner.succeed();
  } catch (e) {
    connectSpinner.fail();
    console.error(
      "Echec, vérifiez votre nom d'utilisateur et mot de passe à l'adresse suivante :"
    );
    console.log(envFile);
    return;
  }

  const goalsSpinner = ora("Récupération des objectifs").start();
  let tasks = [];
  try {
    tasks = await api.getTasks({ name: listName, status: 0 });
    goalsSpinner.succeed();
  } catch (e) {
    goalsSpinner.fail();
    console.error(`Liste ${listName} introuvable sur TickTick`);
    return;
  }

  console.log();
  console.log("Objectifs du jour :");
  for (const task of tasks) {
    console.log(`${todoEmoji} ${task.title}`);
  }
}

program.version("0.0.1");

program
  .command("get-goals")
  .option(
    "-t, --todo <emoji>",
    "détermine l'emoji à utiliser pour une tâche à faire",
    ":construction:"
  )
  .option(
    "-l, --list <name>",
    "nom du projet TickTick contenant les tâches à récupérer",
    "Ligue"
  )
  .action((options) => generateGoals(options.todo, options.list));

program.parse(process.argv);

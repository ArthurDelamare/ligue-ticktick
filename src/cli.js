#!/usr/bin/env node
const program = require("commander");
const TickTickAPI = require("ticktick-node-api");
const ora = require("ora");
const path = require("path");

const DiscordAPI = require('./utils/DiscordAPI');

const envFileArray = __dirname.split(path.sep);
envFileArray.pop();
const envFile = envFileArray.join(path.sep) + path.sep + ".env";
require("dotenv").config({ path: envFile });
const discordAPI = new DiscordAPI(process.env.DISCORD_TOKEN)
const OBJECTIFS_UPDATES_CHANNEL_ID = '672078358699573249'

/**
 * @description function to connect to TickTick,
 * grab the tasks from a specific project then, display the goals
 * @param {*} todoEmoji the discord emoji to show before a goal
 * @param {*} listName the name of the project containing the tasks
 */
async function generateGoals(todoEmoji = ":construction:", listName = "Ligue", doSendDiscordMessage = false) {
  const ticktickAPI = new TickTickAPI();
  const connectSpinner = ora("Connexion à TickTick").start();
  try {
    await ticktickAPI.login({
      username: process.env.TICKTICK_USERNAME,
      password: process.env.TICKTICK_PASSWORD,
    });
    connectSpinner.succeed();
  } catch {
    connectSpinner.fail();
    console.error(
      "Echec, vérifiez votre nom d'utilisateur et mot de passe à l'adresse suivante :"
    );
    console.log(envFile);
    process.exit(0);
  }
  const goalsSpinner = ora("Récupération des objectifs").start();
  let tasks = [];
  try {
    tasks = await ticktickAPI.getTasks({ name: listName, status: 0 });
    goalsSpinner.succeed();
  } catch (e) {
    goalsSpinner.fail();
    console.error(`Liste ${listName} introuvable sur TickTick`);
    process.exit(0);
  }
  let tasksFormatted = "";
  for (const task of tasks) {
    tasksFormatted += `${todoEmoji} ${task.title}\n`;
  }
  
  if (doSendDiscordMessage) {
    const discordSpinner = ora("Envoie un message sur Discord dans #objectifs-updates").start();
    try {
      await discordAPI.sendDiscordMessage(tasksFormatted, OBJECTIFS_UPDATES_CHANNEL_ID)
      discordSpinner.succeed();
    } catch {
      discordSpinner.fail();
      console.error(
        "Echec, vérifiez votre token Discord à l'adresse suivante :"
      );
      console.log(envFile);
      process.exit(0);
    }
  }

  console.log();
  console.log("Objectifs du jour :");
  console.log(tasksFormatted);
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
  .option(
    "-d, --discord",
    "envoie un message sur Discord dans #objectifs-updates"
  )
  .action((options) => generateGoals(options.todo, options.list, options.discord));

program.parse(process.argv);

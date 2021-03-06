const inquirer = require("inquirer");
const { emojify } = require("node-emoji");
const { getConfigPlugins } = require("./files");
const { getPlugNameFromConfig } = require("./helpers");

const askForVimInfo = () => {
  const questions = [
    {
      name: "vimpath",
      type: "input",
      message:
        "Path to your vim config file using vim-plug relative to user directory. Example: .config/nvim/init.vim)?\nIf your vim-plug block including your plugins is in a separate file, please use the path to that file instead.",
      validate: (val) => {
        if (val.length) {
          return true;
        } else {
          return "Please enter a path to your vim config file or the file that holds your vim-plug Plug declarations.";
        }
      },
    },
    {
      name: "vimtype",
      type: "list",
      message: "Are you using neovim (nvim) or vim?",
      choices: ["nvim", "vim"],
      default: "vim",
    },
  ];

  return inquirer.prompt(questions);
};

const askForQuery = () =>
  inquirer.prompt([
    {
      name: "query",
      type: "input",
      message: "query",
      validate: (val) => {
        if (val.length === 0) {
          return "Must supply a name";
        } else {
          return true;
        }
      },
    },
  ]);

const askPluginSelection = (plugins) =>
  inquirer.prompt([
    {
      name: "selection",
      type: "list",
      choices: plugins.map((p) => ({
        name: `${p.name} - ${emojify(p.short_desc)}`,
        value: p,
        short: `${p.name} - ${emojify(p.short_desc)}`,
      })),
    },
    {
      name: "action",
      type: "list",
      choices: ["info", "install", "back", "exit"],
      default: "info",
    },
  ]);

const installedPluginsList = async () => {
  const installed = await getConfigPlugins();

  return inquirer.prompt([
    {
      name: "plugin",
      type: "list",
      choices: installed.map((p) => {
        return {
          name: getPlugNameFromConfig(p),
          value: p,
        };
      }),
    },
    {
      name: "action",
      type: "list",
      choices: ["info", "uninstall", "back", "exit"],
    },
  ]);
};

const menuSelection = () =>
  inquirer.prompt([
    {
      name: "command",
      type: "list",
      choices: ["query", "list", "update", "exit"],
      default: "query",
    },
  ]);

module.exports = {
  askForVimInfo,
  askForQuery,
  askPluginSelection,
  installedPluginsList,
  menuSelection,
};

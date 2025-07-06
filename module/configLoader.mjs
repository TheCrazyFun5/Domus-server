import { accessSync, constants, readFileSync, writeFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import logger from "./logger.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __dirHome = path.join(__dirname, "../");

let mainConfig;

function getMainConfig() {
  if (mainConfig) return mainConfig;
  let pathMainConfig = path.join(__dirHome, "config.json");
  if (exists(pathMainConfig)) {
    mainConfig = getConfig(pathMainConfig);
    return mainConfig;
  }
}

function exists(configPath) {
  try {
    accessSync(configPath, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}
function getConfig(configPath) {
  try {
    return JSON.parse(readFileSync(configPath, "utf-8"));
  } catch (err) {
    logger(`Ошибка при чтении: ${configPath}-> ${err}`, "ConfigLoader");
  }
}
function getConfigName(configPath, name) {
  try {
    const temp = JSON.parse(readFileSync(configPath, "utf-8"));
    return temp[name];
  } catch (err) {
    logger(`Ошибка при чтении: ${configPath}-> ${err}`, "ConfigLoader");
  }
}
function createConfog(configPath, config) {
  logger(`🛠 Создаю ${configPath}`, "ConfigLoader");
  try {
    writeFileSync(configPath, JSON.stringify(config, null, 2), "utf-8");
    logger("✅ файл создан", "ConfigLoader");
  } catch (err) {
    logger(`❌ при создании файла произошла ошибка: ${err}`, "ConfigLoader");
  }
}
export { exists, createConfog, getConfig, getConfigName, getMainConfig };

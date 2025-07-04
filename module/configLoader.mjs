import { accessSync, constants, readFileSync, writeFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __dirHome = path.join(__dirname, "../");

function exists(configPath) {
  try {
    accessSync(configPath, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}
function getConfig(configPath) {
  return JSON.parse(readFileSync(configPath, "utf-8"));
}
function createConfog(configPath, config) {
  console.log(`🛠 Создаю ${configPath}`);
  try {
    writeFileSync(configPath, JSON.stringify(config, null, 2), "utf-8");
    console.log("✅ файл создан");
  } catch (err) {
    console.log(`❌ при создании файла произошла ошибка: ${err}`);
  }
}
export { exists, createConfog };

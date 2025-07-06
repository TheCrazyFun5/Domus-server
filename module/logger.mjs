import fs from "fs";
import path from "path";

const logsDir = path.join("logs");
const logFilePath = path.join(logsDir, "app.log");

let logFile = null;

function initLogger() {
  try {
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }
    logFile = fs.createWriteStream(logFilePath, { flags: "a" });
  } catch (err) {
    console.error("❌ Ошибка инициализации логгера:", err);
    logFile = null;
  }
}

function log(message, name = "express") {
  const date = new Date();
  const timestamp = `${date.getDate() <= 9 ? "0" + date.getDate() : date.getDate()}.${
    date.getMonth() + 1 <= 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1
  }.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
  const fullMessage = `[${timestamp}] [${name}] ${message}\n`;
  process.stdout.write(fullMessage);
  if (logFile) logFile.write(fullMessage);
  else {
    initLogger();
    logFile.write(fullMessage);
  }
}

export default log;

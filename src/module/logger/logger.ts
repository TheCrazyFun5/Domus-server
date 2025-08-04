import fs from "fs";
import path from "path";
const rootDir = path.join("logs");
class Logger {
  private logsDir: string;
  private name: string;
  private logFileName: string;
  private logger: fs.WriteStream | null = null;

  constructor(name: string) {
    this.logsDir = path.join(rootDir, name);
    this.logFileName = path.join(this.logsDir, `${this.date()}.log`);
    console.log(this.logFileName);
    this.name = name;
    this.init();
  }
  private date(time?: boolean): string {
    const date = new Date();
    const timestamp = `${date.getDate() <= 9 ? "0" + date.getDate() : date.getDate()}.${
      date.getMonth() + 1 <= 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1
    }.${date.getFullYear()}${time ? ` ${date.getHours()}-${date.getMinutes()}` : ``}`;
    return timestamp;
  }
  private init() {
    try {
      if (!fs.existsSync(this.logsDir)) {
        fs.mkdirSync(this.logsDir, { recursive: true });
      }
      this.logger = fs.createWriteStream(this.logFileName, { flags: "a" });
    } catch (err) {
      console.error("❌ Ошибка инициализации логгера:", err);
      this.logger = null;
    }
  }
  public log(msg: any, name?: string) {
    this.sendLogger(`[INFO] [${name ? name : this.name}] ${msg}`);
  }
  public error(msg: any, name?: string) {
    this.sendLogger(`[ERROR] [${name ? name : this.name}] ${msg}`);
  }
  public warn(msg: any, name?: string) {
    this.sendLogger(`[WARN] [${name ? name : this.name}] ${msg}`);
  }

  private sendLogger(str: string) {
    const fullMessage = `[${this.date(true)}] ${str}\n`;
    process.stdout.write(fullMessage);
    if (this.logger) this.logger.write(fullMessage);
  }
}
export default Logger;

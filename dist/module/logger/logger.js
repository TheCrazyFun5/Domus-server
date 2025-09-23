import fs from "fs";
import path from "path";
const rootDir = path.join("logs");
class Logger {
    logsDir;
    name;
    logFileName;
    logger = null;
    constructor(name) {
        this.logsDir = path.join(rootDir, name);
        this.logFileName = path.join(this.logsDir, `${this.date()}.log`);
        this.name = name;
        this.init();
    }
    date(time) {
        const date = new Date();
        const timestamp = `${date.getDate() <= 9 ? "0" + date.getDate() : date.getDate()}.${date.getMonth() + 1 <= 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1}.${date.getFullYear()}${time ? ` ${date.getHours()}-${date.getMinutes()}` : ``}`;
        return timestamp;
    }
    init() {
        try {
            if (!fs.existsSync(this.logsDir)) {
                fs.mkdirSync(this.logsDir, { recursive: true });
            }
            this.logger = fs.createWriteStream(this.logFileName, { flags: "a" });
        }
        catch (err) {
            console.error("❌ Ошибка инициализации логгера:", err);
            this.logger = null;
        }
    }
    log(msg, name) {
        this.sendLogger(`[INFO] [${name ? name : this.name}] ${msg}`);
    }
    error(msg, name) {
        this.sendLogger(`[ERROR] [${name ? name : this.name}] ${msg}`);
    }
    warn(msg, name) {
        this.sendLogger(`[WARN] [${name ? name : this.name}] ${msg}`);
    }
    sendLogger(str) {
        const fullMessage = `[${this.date(true)}] ${str}\n`;
        process.stdout.write(fullMessage);
        if (this.logger)
            this.logger.write(fullMessage);
    }
}
export default Logger;
//# sourceMappingURL=logger.js.map
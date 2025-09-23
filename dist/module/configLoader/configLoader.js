import { accessSync, constants, readFileSync, writeFileSync } from "fs";
import path from "path";
import logger from "../logger/index.js";
class configLoader {
    pathConfig;
    config;
    constructor(pathConfig, nameConfig) {
        this.pathConfig = path.join(pathConfig, nameConfig);
        this.getConfig();
    }
    exists() {
        try {
            accessSync(this.pathConfig, constants.F_OK);
            return true;
        }
        catch {
            return false;
        }
    }
    getConfig() {
        try {
            if (this.exists()) {
                this.config = JSON.parse(readFileSync(this.pathConfig, "utf-8"));
            }
        }
        catch (err) {
            logger.app.error(`Ошибка при чтении: ${this.pathConfig} -> ${err}`, "ConfigLoader");
        }
    }
    async UpConfig(config) {
        logger.app.log(`🛠 Создаю ${this.pathConfig}`, "ConfigLoader");
        try {
            writeFileSync(this.pathConfig, JSON.stringify(config, null, 2), "utf-8");
            logger.app.log("✅ файл создан", "ConfigLoader");
            this.getConfig();
            return true;
        }
        catch (err) {
            logger.app.error(`❌ при создании файла произошла ошибка: ${err}`, "ConfigLoader");
            return false;
        }
    }
}
export { configLoader };
//# sourceMappingURL=configLoader.js.map
import { accessSync, constants, readFileSync } from "fs";
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
}
export { configLoader };

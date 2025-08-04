import { configLoader } from "./configLoader.js";
import { AppConfig } from "./modelConfig.js";

export default {
  main: new configLoader<AppConfig>("", "config.json"),
};

import { configLoader } from "./configLoader.js";
import { AppConfig } from "../../model/modelConfig.js";

export default {
  main: new configLoader<AppConfig>("", "config.json"),
};

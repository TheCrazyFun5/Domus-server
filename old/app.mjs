import express from "express";
import path from "path";
import mqtt from "mqtt";
import logger from "./module/logger.mjs";
import { getMainConfig } from "./module/configLoader.mjs";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express.Router();
let mainConfig;
let mqttClient = null;
async function MQTTconnect() {
  mainConfig = await getMainConfig();
  mqttClient = mqtt.connect(
    `mqtt://${mainConfig.MQTT.builtIn ? "0.0.0.0" : mainConfig.MQTT.ip}:${mainConfig.MQTT.port}`,
    {
      username: mainConfig.MQTT.login,
      password: mainConfig.MQTT.pass,
      reconnectPeriod: 0,
    }
  );
  mqttClient.on("connect", () => {
    logger.log("Привет MQTT");
  });
}

app.use("/", (req, res) => {
  try {
    mqttClient.publish("home/led", "d");
    res.sendFile(path.join(__dirname, "public", "index.html"));
  } catch (err) {
    logger.error(err);
  }
});

export { MQTTconnect, app };

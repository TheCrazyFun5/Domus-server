import aedesLib from "aedes";
import net from "net";
import logger from "./logger.mjs";

let aedesInstance;

export async function startMQTTServer(MQTTConfig) {
  if (aedesInstance) return aedesInstance;
  const aedes = aedesLib({
    authenticate: (client, username, password, callback) => {
      const valid = username === MQTTConfig.login && password.toString() === MQTTConfig.pass;
      if (valid) {
        callback(null, true);
      } else {
        logger.log(`❌ Попытка подключения была отклонена для ${client.id}`, "MQTT");
        callback(new Error("Authentication failed"), false);
      }
    },
  });
  const mqttServer = net.createServer(aedes.handle);

  mqttServer.listen(MQTTConfig.port, () => {
    logger.log(`🚀 MQTT брокер запущен на порту ${MQTTConfig.port}`, "MQTT");
  });

  aedes.on("clientReady", (client) => {
    logger.log(`🔌 Клиент подключился: ${client.id}`, "MQTT");
  });

  aedes.on("publish", (packet, client) => {
    if (client) {
      logger.log(`📨 Сообщение от ${client.id}: ${packet.topic} = ${packet.payload}`, "MQTT");
    }
  });
  aedesInstance = aedes;
}

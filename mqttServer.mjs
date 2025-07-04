import aedesLib from "aedes";
import net from "net";

const aedes = aedesLib({
  authenticate: (client, username, password, callback) => {
    const valid = username === "f" && password.toString() === "f";
    if (valid) {
      console.log(`✅ ${client.id} connected`);
      callback(null, true);
    } else {
      console.log(`❌ Auth failed for ${client.id}`);
      callback(new Error("Authentication failed"), false);
    }
  },
});

const mqttServer = net.createServer(aedes.handle);

mqttServer.listen(1883, () => {
  console.log("🚀 MQTT брокер запущен на порту 1883");
});

aedes.on("clientReady", (client) => {
  console.log(`🔌 Клиент подключился: ${client.id}`);
});

aedes.on("publish", (packet, client) => {
  if (client) {
    console.log(`📨 Сообщение от ${client.id}: ${packet.topic} = ${packet.payload}`);
    console.log(client);
    console.log(packet);
  }
});

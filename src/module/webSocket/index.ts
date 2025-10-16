import { randomInt } from "crypto";
import { Server } from "socket.io";
import weatherService from "../../app/service/weatherService.js";
let io: Server | null = null;

function webSocketInit(server: any) {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });
  io.on("connection", (socket) => {
    console.log(`🟢 Подключение клиента: ${socket.id}`);
    // socket.emit("weatherCurrent", weatherService.CurrentWeather);
    setInterval(async () => {
      const date = new Date();
      console.log(date.getTime());
      if (
        weatherService.last_updated_epoch_Current == null ||
        weatherService.last_updated_epoch_Current * 1000 + 900000 < date.getTime()
      ) {
        const CurrentWeather = await weatherService.getCurrentWeather();
        if (CurrentWeather) return socket.emit("weatherCurrent", CurrentWeather.data);
      }
      console.log(
        weatherService.last_updated_epoch_Current ? weatherService.last_updated_epoch_Current * 1000 + 900000 : null
      );
      socket.emit("weatherCurrent", weatherService.CurrentWeather.data);
    }, 5000);

    socket.on("join_room", async (roomId: string) => {
      socket.join(roomId);
      console.log(`📦 ${socket.id} вошёл в комнату ${roomId}`);
      socket.emit("room_state", "dddd");
    });
  });
}
function getIO(): Server {
  if (!io) throw new Error("Socket.io не инициализирован");
  return io;
}
export default getIO;
export { webSocketInit };

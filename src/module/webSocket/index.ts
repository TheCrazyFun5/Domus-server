import { randomInt } from "crypto";
import { Server } from "socket.io";
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

    setInterval(() => {
      socket.emit("weather", randomInt(300));
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

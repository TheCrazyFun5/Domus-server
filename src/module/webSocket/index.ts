import { Server, Socket } from "socket.io";
import weatherService from "../../app/service/weatherService.js";
let io: Server | null = null;

let socketClient = new Set<Socket>();

function webSocketInit(server: any) {
  weatherService.updateAndSendToClient();
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });
  io.on("connection", (socket) => {
    console.log(`🟢 Подключение клиента: ${socket.id}`);
    socketClient.add(socket);

    socket.on("disconnect", () => {
      socketClient.delete(socket);
    });

    socket.on("join_room", async (roomId: string) => {
      socket.join(roomId);
      console.log(`📦 ${socket.id} вошёл в комнату ${roomId}`);
      socket.emit("room_state", "dddd");
    });
  });
}
function broadcastToAll(to: string, msg: any) {
  if (socketClient.size == 0) return;
  for (const item of socketClient) {
    item.emit(to, msg);
  }
}

function getIO(): Server {
  if (!io) throw new Error("Socket.io не инициализирован");
  return io;
}
export default getIO;
export { webSocketInit, broadcastToAll };

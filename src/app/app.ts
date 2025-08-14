import express from "express";
import path from "path";
const __dirname = import.meta.dirname;
import router from "./router/index.js";
import { User } from "../module/BD/model//user.model.js";
import UserDTO from "./dto/userDto.js";
const app = express.Router();
setTimeout(async () => {
  //   await User.create({ firstName: "d", lastName: "test" });
  let user = await User.findOne({ where: { id: 1 } });
  let userDto = new UserDTO(user?.dataValues);
  console.log("No UserDto:", user?.dataValues);
  console.log("UserDto:", { ...userDto });
}, 3000);

app.use(express.static(path.join(__dirname, "public")));
app.use(router);
export { app };

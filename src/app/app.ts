import express from "express";
import path from "path";
const __dirname = import.meta.dirname;
import router from "./router/index.js";
import { User } from "../module/BD/model//user.model.js";
import UserDTO from "./dto/userDto.js";
import userService from "./service/userService.js";
import errorApi from "./service/errorService.js";
const app = express.Router();
// setTimeout(async () => {
//   //   await User.create({ firstName: "d", lastName: "test" });
//   //   let user = await User.findOne({ where: { id: 1 } });
//   //   let userDto = new UserDTO(user?.dataValues);
//   //   console.log("No UserDto:", user?.dataValues);
//   //   console.log("UserDto:", { ...userDto });
//   //   try {
//   //     let test = await userService.registration("test", "pass");
//   //     console.log(test);
//   //   } catch (e: any) {
//   //     if (e instanceof errorApi) {
//   //       console.log(e.message);
//   //       console.log(e.status);
//   //     } else {
//   //       console.log(e);
//   //     }
//   //   }
// }, 1000);

app.use(express.static(path.join(__dirname, "public")));
app.use(router);
export { app };

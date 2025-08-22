import { User } from "../../module/BD/model/user.model.js";
import logger from "../../module/logger/index.js";
import errorApi from "./errorService.js";
import bcrypt from "bcryptjs";

const saltbcrypt = await bcrypt.genSalt(10);
class userService {
  async registration(login: string, pass: string, role = "user") {
    const check = await User.findOne({ where: { login: login } });
    if (check) throw errorApi.badRequest(`Пользователь с логином ${login} существует`);
    const hashPass = await bcrypt.hash(pass, saltbcrypt);
    const user = User.create({ login: login, pass: hashPass, role: role });
    return user;
  }

  async login() {}
}
export default new userService();

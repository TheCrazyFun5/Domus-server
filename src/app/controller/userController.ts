import { Request, Response } from "express";
import userService from "../service/userService.js";
import errorApi from "../service/errorService.js";
import logger from "../../module/logger/index.js";
class userController {
  registration(req: Request, res: Response) {
    // console.log(tokenService.createdToken());
    res.status(200).json("некст");
  }

  async login(req: Request, res: Response) {
    try {
      const user = req.body;
      if (!user || !user.login || !user.pass) throw errorApi.badRequest("Нет нужных данных");
      const token = await userService.login(user.login, user.pass);
      if (token) {
        res.cookie("refreshToken", token.refreshToken, {
          maxAge: 2 * 24 * 60 * 60 * 1000,
          // httpOnly: true,
          sameSite: "lax",
          secure: true,
        });
        return res.status(200).json(token);
      }
    } catch (err) {
      err instanceof errorApi
        ? res.status(err.status).json(err.message)
        : res.status(500).json("Мой код решил, что сегодня выходной.");
      logger.express.error(err);
    }
  }
  async updatAaccessToken(req: Request, res: Response) {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) throw errorApi.unauthorized("нет refreshToken");
      const token = await userService.updatAaccessToken(refreshToken);
      res.cookie("refreshToken", token.refreshToken, { maxAge: 2 * 24 * 60 * 60 * 1000, httpOnly: true });
      res.status(200).json(token);
    } catch (err) {
      err instanceof errorApi
        ? res.status(err.status).json(err.message)
        : res.status(500).json("Мой код решил, что сегодня выходной.");
      logger.express.error(err);
    }
  }
}

export default new userController();

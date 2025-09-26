import { NextFunction, Request, Response } from "express";
import errorApi from "../../service/errorService.js";
import logger from "../../../module/logger/index.js";
import { JWTPayload } from "./../../../model/jwtModel.js";
import tokenService from "../../service/tokenService.js";

class guard {
  async jwtMiddleware(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const token = req.headers.auth;
      if (!token || typeof token != "string") throw errorApi.unauthorized("Нет токена");
      const Payload: JWTPayload = await tokenService.validaccessToken(token);
      if (Payload) {
        req.headers.login = Payload.login;
        req.headers.userId = `${Payload.userId}`;
      }
      next();
    } catch (err) {
      err instanceof errorApi
        ? res.status(err.status).json(err.message)
        : res.status(500).json("Мой код решил, что сегодня выходной.");
      logger.express.error(err);
    }
  }
}

export default new guard();

import configLoader from "../module/configLoader/index.js";
import logger from "../module/logger/index.js";
import { Request, Response } from "express";
import crypto from "crypto";
import dbDto from "./dto/dbDto.js";
import errorApi from "../app/service/errorService.js";
import { connection } from "../module/BD/index.js";
import userService from "../app/service/userService.js";

class InstallController {
  callBack: () => void;
  constructor(callBack: () => void) {
    this.callBack = callBack;
  }
  async Setup(req: Request, res: Response) {
    try {
      let data = req.body;
      if (!data) return res.status(200).json({ success: false, text: "нет данных" });
      await configLoader.main.UpConfig(req.body);
      res.status(200).json({ success: true });
      this.callBack();
    } catch (err) {
      logger.app.error(err);
      res.json({ success: false });
    }
  }
  async Save(req: Request, res: Response) {
    try {
      let data = req.body;
      if (!data) return res.status(400).json({ success: false, text: "нет данных" });
      userService.registration(data.admin.login, data.admin.pass, "admin", data.admin.mail);
      const token = {
        accessSecretKey: crypto.randomBytes(64).toString("hex"),
        refreshSecretKey: crypto.randomBytes(64).toString("hex"),
      };
      data.JWT = token;
      if (data.MQTT.builtIn) data.MQTT = { builtIn: true, ip: "0.0.0.0", port: 3350, login: "App", pass: "159159" };
      await configLoader.main.UpConfig({ Server: data.Server, BD: data.BD, MQTT: data.MQTT, JWT: data.JWT });
      res.status(200).json("");
      this.callBack();
    } catch (err) {
      err instanceof errorApi
        ? res.status(err.status).json(err.message)
        : res.status(500).json("Мой код решил, что сегодня выходной.");
      logger.app.error(err, "Installer");
    }
  }
  async generatorJWT(req: Request, res: Response) {
    try {
      const token = {
        accessSecretKey: crypto.randomBytes(64).toString("hex"),
        refreshSecretKey: crypto.randomBytes(64).toString("hex"),
      };
      res.status(200).json(token);
    } catch (err) {
      logger.app.error(err);
    }
  }

  async dbConnect(req: Request, res: Response) {
    try {
      const data = req.body;
      let dbData = dbDto(data);
      const connect = await connection(dbData);
      if (connect) return res.status(400).json(connect);
      res.status(200).json("");
    } catch (err) {
      err instanceof errorApi
        ? res.status(err.status).json(err.message)
        : res.status(500).json("Мой код решил, что сегодня выходной.");
      logger.app.error(err, "Installer");
    }
  }
}

export default InstallController;

import configLoader from "../module/configLoader/index.js";
import logger from "../module/logger/index.js";
import { Request, Response } from "express";
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
}

export default InstallController;

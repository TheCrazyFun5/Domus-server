import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import configLoader from "../module/configLoader/index.js";
import logger from "../module/logger/index.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export default (callBack: () => void) => {
  const installer = express.Router();
  installer.use(express.static(path.join(__dirname, "dist")));
  installer.post("/setup", async (req, res) => {
    try {
      let date = req.body;
      if (!date) return res.status(200).json({ success: false, text: "нет данных" });
      configLoader.main.UpConfig(req.body);
      res.status(200).json({ success: true });
      callBack();
    } catch (err) {
      logger.app.error(err);
      res.json({ success: false });
    }
  });
  installer.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
  });
  return installer;
};

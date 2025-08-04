import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createConfog } from "./../module/configLoader.mjs";
import logger from "../module/logger.mjs";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default function installer(callBack) {
  const installerRouter = express.Router();
  installerRouter.use(express.static(path.join(__dirname, "dist")));
  installerRouter.post("/setup", async (req, res) => {
    try {
      let date = req.body;
      if (!date) return res.status(200).json({ success: false, text: "нет данных" });

      createConfog(path.join(__dirname, "..", "config.json"), req.body);
      res.status(200).json({ success: true });
      callBack();
    } catch (err) {
      logger.error(err);
      res.json({ success: false });
    }
  });
  installerRouter.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
  });

  return installerRouter;
}

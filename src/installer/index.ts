import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import InstallController from "./installController.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default (callBack: () => void) => {
  const insstallController = new InstallController(callBack);
  const installer = express.Router();
  installer.use(express.static(path.join(__dirname, "dist")));
  installer.post("/setup", insstallController.Setup.bind(insstallController));
  installer.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
  });
  return installer;
};

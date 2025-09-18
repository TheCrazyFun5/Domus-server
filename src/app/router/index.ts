import express from "express";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import api from "./api.js";
import { User } from "../../module/BD/model/user.model.js";
import { Request, Response } from "express";

const router = express.Router();

router.use("/api", api);
router.use("/loger", async (req: Request, res: Response) => {
  console.log(await User.findAll());
  res.status(200).json("ff");
});
router.use("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../", "public", "index.html"));
});
export default router;

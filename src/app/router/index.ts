import express from "express";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import api from "./api.js";
const router = express.Router();

router.use("/api", api);
router.use("/", async (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "../", "public", "index.html"));
  } catch (err) {
    console.log(err);
  }
});
export default router;

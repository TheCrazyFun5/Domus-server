import express from "express";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import BD from "../module/BD/index.js";
const app = express.Router();

app.use("/", async (req, res) => {
  try {
    console.log(await BD.user.findAll());
    res.sendFile(path.join(__dirname, "public", "index.html"));
  } catch (err) {
    console.log(err);
  }
});

export { app };

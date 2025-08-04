import express from "express";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express.Router();

app.use("/", (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  } catch (err) {
    console.log(err);
  }
});

export { app };

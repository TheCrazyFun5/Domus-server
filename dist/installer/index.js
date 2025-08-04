import express from "express";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export default (callBack) => {
    const installer = express.Router();
    installer.use(express.static(path.join(__dirname, "dist")));
    installer.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
    return installer;
};

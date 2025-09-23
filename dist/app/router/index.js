import express from "express";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import api from "./api.js";
import { User } from "../../module/BD/model/user.model.js";
const router = express.Router();
router.use("/api", api);
router.use("/loger", async (req, res) => {
    console.log(await User.findAll());
    res.status(200).json("ff");
});
router.use("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../", "public", "index.html"));
});
export default router;
//# sourceMappingURL=index.js.map
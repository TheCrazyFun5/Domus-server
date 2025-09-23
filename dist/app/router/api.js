import express from "express";
import auth from "./auth.js";
const api = express.Router();
api.use("/auth", auth);
export default api;
//# sourceMappingURL=api.js.map
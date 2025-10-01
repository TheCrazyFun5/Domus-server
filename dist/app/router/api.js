import express from "express";
import auth from "./auth.js";
import guard from "./guard/guard.js";
const api = express.Router();
api.use("/auth", auth);
api.use("/domus", guard.jwtMiddleware, (request, response) => {
    response.status(200).json("1");
});
export default api;
//# sourceMappingURL=api.js.map
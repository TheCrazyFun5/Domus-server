import express from "express";
import userController from "../controller/userController.js";
const api = express.Router();

api.post("/registration", userController.registration);
api.post("/login", userController.login);

export default api;

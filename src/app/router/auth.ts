import express from "express";
import userController from "../controller/userController.js";
const auth = express.Router();
auth.post("/registration", userController.registration);
auth.post("/login", userController.login);
auth.get("/updatAccessToken", userController.updatAaccessToken);
export default auth;

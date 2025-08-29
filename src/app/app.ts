import express from "express";
import path from "path";
const __dirname = import.meta.dirname;
import router from "./router/index.js";

const app = express.Router();

app.use(express.static(path.join(__dirname, "public")));
app.use(router);

export { app };

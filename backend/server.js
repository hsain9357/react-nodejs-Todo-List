import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import login_handler_route from "./routes/Login.js";
import task_handler_route from "./routes/taskHandler.js";
import handleUser from "./routes/User.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

dotenv.config();
const app = express();
const server = http.Server(app);

app.use(cookieParser());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  cors({
    origin: ["http://localhost:8080"],
    credentials: true,
    preflightContinue: true,
    optionsSuccessStatus: 204,
  })
);
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use("/user", login_handler_route,handleUser);
app.use("/task", task_handler_route);
const port = process.env.PORT || 4000;
server.listen(port, () => console.log(`server listen at port ${port}`));

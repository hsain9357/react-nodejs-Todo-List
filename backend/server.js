import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import login_handler_route from "./routes/Login.js";
dotenv.config();
const app = express();
const server = http.Server(app);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use("/user", login_handler_route);
const port = process.env.PORT || 4000;
server.listen(port, () => console.log(`server listen at port ${port}`));

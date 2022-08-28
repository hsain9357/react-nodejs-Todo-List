import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import { user_schema } from "../models/db.js";
const secretkey = process.env.ACCESS_JWT_TOKEN;

const authenticateUser = async (req, res, next) => {
  let idToken = req.cookies["login"];
  try {
    const decodedMessage = jwt.verify(idToken, secretkey);
    await user_schema.findOne({
      email: decodedMessage,
    });
    next();
  } catch (e) {
    console.log(e);
    res.status(401).send({
      error: e,
    });
  }
};
export { authenticateUser };

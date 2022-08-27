import jwt from "jsonwebtoken";

import { user_schema } from "../models/db.js";
const secretkey = process.env.SECRETID;

const authenticateUser = async (req, res, next) => {
  let idToken = req.cookies["login"];

  try {
    const decodedMessage = jwt.verify(idToken, secretkey);
    await user_schema.findOne({
      email: decodedMessage,
    });
    next();
  } catch (e) {
    res.status(401).send({
      error: e,
    });
  }
};
export { authenticateUser };

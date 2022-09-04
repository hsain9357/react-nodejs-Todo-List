import { user_schema } from "../models/db.js";
import { validateNewUser, validateLogin } from "../models/validate.js";
import { OAuth2Client } from "google-auth-library";
import { authenticateUser } from "../controller/auth.js";
import express from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

dotenv.config();
const router = express.Router();
router.post("/loginGoogle", loginGoogle);
router.post("/loginEmail", loginEmail);
router.post("/signupEmail", signupEmail);
router.post("/logout", logout);
router.get("/checkLoginStatus", authenticateUser, (_req, res) => {
  res.status(200).send({ success: true });
});

//this function check if the user logedin it'll
//return just token if not it'll create an account  and return token
async function loginGoogle(req, res) {
  const client = new OAuth2Client(process.env.CLIENT_ID, process.env.SECRETID);
  const token = req.body.authId;
  try {
    const loginTicket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,
    });
    const payload = loginTicket.payload;
    if (!payload.email_verified) return res.send("invalid Login");
    const user = await user_schema.findOne({ email: payload.email });
    // if not = user create new user and send the jwt
    if (user) {
      const Email = user.email;
      const tokenjwt = jwt.sign(Email, process.env.ACCESS_JWT_TOKEN);
      //30 days
      res
        .status(200)
        .cookie("login", tokenjwt, { maxAge: 30 * 86400000 })
        .send({
          success: true,
        });
    } else {
      // create new user
      const user_object = {
        firstName: payload.given_name,
        lastName: payload.family_name,
        email: payload.email,
        img: payload.picture,
        loginMethod: "google",
      };
      const new_user = await user_schema.create(user_object);
      const tokenjwt = jwt.sign(new_user.email, process.env.ACCESS_JWT_TOKEN);

      res
        .status(200)
        .cookie("login", tokenjwt, { maxAge: 30 * 86400000 })
        .send({
          success: true,
        });
    }
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
    console.log(error);
  }
}

//clear the cookies
function logout(_req, res) {
  try {
    res.clearCookie("login").send({
      success: true,
    });
  } catch (e) {
    res.status(500).send({
      error: e,
    });
  }
}
//sign up an email and send jwt as a  cookie
async function signupEmail(req, res) {
  try {
    const { error } = validateNewUser(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await user_schema.findOne({
      email: req.body.email,
      loginMethod: "email",
    });
    if (user)
      return res
        .status(409)
        .send({ message: "User with given email already Exist!" });

    const salt = await bcryptjs.genSalt(Number(process.env.SALT));
    const hashPassword = await bcryptjs.hash(req.body.password, salt);

    const userToSave = new user_schema({
      ...req.body,
      password: hashPassword,
      loginMethod: "email",
    });

    const tokenjwt = jwt.sign(userToSave.email, process.env.ACCESS_JWT_TOKEN);
    await userToSave.save();
    return res
      .status(201)
      .cookie("login", tokenjwt, { maxAge: 30 * 86400000 })
      .send({
        success: true,
      });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
    console.log(error);
  }
}

//login and send jwt as a cookie
async function loginEmail(req, res) {
  try {
    const { error } = validateLogin(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await user_schema.findOne({
      email: req.body.email,
      loginMethod: "email",
    });
    if (!user)
      return res.status(401).send({ message: "Invalid Email or Password" });
    const validPassword = await bcryptjs.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(401).send({ message: "Invalid Password" });
    const tokenjwt = jwt.sign(user.email, process.env.ACCESS_JWT_TOKEN);
    return res
      .status(201)
      .cookie("login", tokenjwt, { maxAge: 30 * 86400000 })
      .send({
        success: true,
      });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
}

export default router;

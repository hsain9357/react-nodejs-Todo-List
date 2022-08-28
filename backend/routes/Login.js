import { user_schema } from "../models/db.js";
import { OAuth2Client } from "google-auth-library";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import { authenticateUser } from "../controller/auth.js";
const client = new OAuth2Client(process.env.CLIENT_ID, process.env.SECRETID);
const router = express.Router();

router.post("/login", genrateAuthToken);
router.post("/logout", logout);
router.get("/checkLoginStatus", authenticateUser, (_req, res) => {
  res.status(200).send({ success: true });
});

async function genrateAuthToken(req, res) {
  const token = req.body.authId;
  //this function verifyGoogleUser check if the user exists
  //in the database then return jwt if not create user and return jwt
  await verifyGoogleUser(token, res);
}

async function verifyGoogleUser(token, res) {
  try {
    const loginTicket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,
    });
    const payload = loginTicket.payload;

    //.verifyIdToken({
    // idToken: token,
    //audience: process.env.CLIENT_ID,
    //})
    //.getPayload();

    if (!payload.email_verified) return res.send("invalid Login");
    const user = await user_schema.findOne({ email: payload.email });
    // if not = user create new user and send the jwt
    if (user) {
      const Email = user.email;
      const tokenjwt = jwt.sign(Email, process.env.ACCESS_JWT_TOKEN);
      res
        .status(200)
        .cookie("login", tokenjwt, { expire: 360000 + Date.now() })
        .send({
          success: true,
        });
    } else {
      // create new user
      const user_object = {
        first_name: payload.given_name,
        last_name: payload.family_name,
        email: payload.email,
        img: payload.picture,
        login_method: "google",
      };
      const new_user = await user_schema.create(user_object);
      const tokenjwt = jwt.sign(new_user.email, process.env.ACCESS_JWT_TOKEN);

      res
        .status(200)
        .cookie("login", tokenjwt, { expire: 360000 + Date.now() })
        .send({
          success: true,
        });
    }
  } catch (error) {
    res.status(400).send("we ran into some issues");
    console.log(error);
  }
}
function logout(_req, res) {
  //logout function
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
export default router;

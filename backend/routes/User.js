import { user_schema } from "../models/db.js";
import express from "express";
import { authenticateUser } from "../controller/auth.js";

const router = express.Router();

router.get("/", authenticateUser, getUserInfo);
router.post("/img", authenticateUser, UserAddImg);
async function getUserInfo(req, res) {
  try {
    const { firstName, lastName, img } = req.user;
    const data = {
      firstName,
      lastName,
      img,
    };
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
    console.log(error);
  }
}
async function UserAddImg(req, res) {
  try {
    const id = req.user._id;
    const user = await user_schema.findOne({ _id: id });

    if (!req.body.img && !user) return res.status(404).send("invalid");
    user.img = req.body.img;

    await user.save();

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
    console.log(error);
  }
}
export default router;

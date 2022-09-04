import { task_schema } from "../models/db.js";
import {
  validateAddTask,
  validateUpdateTask,
  validateDeleteTask,
} from "../models/validate.js";
import { authenticateUser } from "../controller/auth.js";
import express from "express";
const router = express.Router();
router.get("/", authenticateUser, getTasks);
router.post("/", authenticateUser, addTask);
router.patch("/", authenticateUser, updateTask);
router.delete("/delete", authenticateUser, deleteTask);
async function addTask(req, res) {
  try {
    const { error } = validateAddTask(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = req.user;
    const task = await task_schema.findOne({ user: user._id });
    const taskData = Object.assign(req.body, { taskCase: "active" });
    if (task) {
      task.tasks = [...task.tasks, taskData];
      await task.save();
      res.status(201).json({ task: task, success: true });
    } else {
      const newUserWithTask = new task_schema({
        user: user._id,
        tasks: taskData,
      });
      await newUserWithTask.save();
      res.status(201).json({ task: newUserWithTask, success: true });
    }
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
    console.log(error);
  }
}
async function deleteTask(req, res) {
  try {
    const { error } = validateDeleteTask(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });
    const user = req.user;

    const task = await task_schema.findOne({
      user: user._id,
    });
    task.tasks = [...task.tasks].filter((task) => task._id != req.body.id);
    await task.save();
    res.status(200).json(task);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: "Internal Server Error" });
  }
}
async function updateTask(req, res) {
  try {
    const { error } = validateUpdateTask(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });
    const user = req.user;

    const task = await task_schema.findOne({
      user: user._id,
    });
    task.tasks.forEach((item, index) => {
      if (item._id == req.body.id) {
        task.tasks[index] = Object.assign(task.tasks[index], req.body);
      }
    });
    await task.save();

    res.status(200).json({success:true});
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: "Internal Server Error" });
  }
}

async function getTasks(req, res) {
  try {
    const user = req.user;
    const task = await task_schema.findOne({
      user: user._id,
    });
    res.status(200).json(task);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: "Internal Server Error" });
  }
}
export default router;

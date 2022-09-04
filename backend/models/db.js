// databases
import mongoose from "mongoose";
import { config } from "dotenv";
config();

const connection = mongoose.connection;
const Schema = mongoose.Schema;

mongoose.connect(process.env.URL_MONGOOSE);
connection.once("open", () => console.log("connected"));
connection.on("err", (err) => console.log({ mongoose_err_connection: err }));

const User = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      maxlength: 20,
      minlength: 1,
    },
    lastName: {
      type: String,
      maxlength: 20,
      minlength: 1,
    },
    img: {
      type: String,
      require: true,
    },

    email: {
      type: String,
      maxlength: 40,
      minlength: 6,
    },
    facebookID: String,
    password: { type: String, maxlength: 70 },
    loginMethod: String,
  },
  { timestamps: true }
);
const Tasks = new Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
    tasks: [
      {
        taskTitle: String,
        taskDetails: String,
        taskCase: String,
        taskTime: Number,
      },
    ],
  },
  { timestamps: true }
);
const user_schema = mongoose.model("users", User);
const task_schema = mongoose.model("tasks", Tasks);
export { user_schema, task_schema };
